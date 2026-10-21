// Genera el MP4 de una promo, cuadro por cuadro, con Chrome sin ventana.
// Uso: node promos/video.mjs <carpeta-de-la-promo> [fps] [fondo]
// Ej.:  node promos/video.mjs institucional              → promos/institucional/institucional.mp4
//       node promos/video.mjs institucional 25 lineas    → promos/institucional/institucional-lineas.mp4
//
// Cada cuadro se dibuja llamando a promo.render(t) con el tiempo exacto, así el video
// sale fluido aunque la compu sea lenta.
import { spawn, execFileSync } from 'node:child_process'
import { createServer } from 'node:http'
import { mkdtempSync, readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join, dirname, extname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const promo = process.argv[2]
const fps = Number(process.argv[3] || 25)
const fondo = process.argv[4]
if (!promo || !existsSync(join(ROOT, 'promos', promo, 'index.html'))) {
  console.error('Uso: node promos/video.mjs <carpeta-de-la-promo> [fps]')
  process.exit(1)
}
const out = join(ROOT, 'promos', promo, `${promo}${fondo ? `-${fondo}` : ''}.mp4`)
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const W = 1152, H = 384

// ---------- Servidor local de archivos ----------
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' }
const server = createServer((req, res) => {
  let path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  if (path.endsWith('/')) path += 'index.html'
  const file = join(ROOT, path)
  if (!file.startsWith(ROOT) || !existsSync(file)) { res.writeHead(404); res.end(); return }
  res.writeHead(200, { 'content-type': TYPES[extname(file)] || 'application/octet-stream' })
  res.end(readFileSync(file))
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const port = server.address().port

// ---------- Chrome con protocolo de depuración ----------
const work = mkdtempSync(join(tmpdir(), 'promo-'))
const debugPort = 9300 + Math.floor(Math.random() * 500)
const chrome = spawn(CHROME, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
  `--window-size=${W},${H}`, `--remote-debugging-port=${debugPort}`, `--user-data-dir=${join(work, 'profile')}`,
  'about:blank',
], { stdio: 'ignore' })

const cleanup = () => { chrome.kill(); server.close(); rmSync(work, { recursive: true, force: true }) }
process.on('exit', cleanup)

let target
for (let i = 0; i < 50 && !target; i++) {
  await new Promise(r => setTimeout(r, 200))
  try {
    const list = await (await fetch(`http://127.0.0.1:${debugPort}/json/list`)).json()
    target = list.find(t => t.type === 'page')
  } catch {}
}
if (!target) throw new Error('No se pudo abrir Chrome')

const ws = new WebSocket(target.webSocketDebuggerUrl)
await new Promise(r => ws.addEventListener('open', r, { once: true }))
let seq = 0
const pending = new Map()
ws.addEventListener('message', e => {
  const msg = JSON.parse(e.data)
  if (msg.id && pending.has(msg.id)) {
    const { resolve: ok, reject } = pending.get(msg.id)
    pending.delete(msg.id)
    msg.error ? reject(new Error(msg.error.message)) : ok(msg.result)
  }
})
const send = (method, params = {}) => new Promise((ok, reject) => {
  const id = ++seq
  pending.set(id, { resolve: ok, reject })
  ws.send(JSON.stringify({ id, method, params }))
})
const evaluate = async expression => {
  const r = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
  if (r.exceptionDetails) throw new Error(r.exceptionDetails.exception?.description || 'Error en la página')
  return r.result.value
}

await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: false })
await send('Page.navigate', { url: `http://127.0.0.1:${port}/promos/${promo}/?t=0${fondo ? `&fondo=${fondo}` : ''}` })
for (let i = 0; i < 100; i++) {
  await new Promise(r => setTimeout(r, 100))
  if (await evaluate('!!window.promo').catch(() => false)) break
}
const duration = await evaluate('promo.ready.then(() => promo.duration)')
const total = Math.round(duration * fps)

// ---------- Cuadros ----------
const frames = join(work, 'frames')
execFileSync('mkdir', ['-p', frames])
for (let i = 0; i < total; i++) {
  const t = i / fps
  await evaluate(`promo.render(${t}); new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))`)
  const { data } = await send('Page.captureScreenshot', { format: 'png', clip: { x: 0, y: 0, width: W, height: H, scale: 1 } })
  writeFileSync(join(frames, `f${String(i).padStart(4, '0')}.png`), Buffer.from(data, 'base64'))
  if (i % fps === 0) process.stdout.write(`\rCuadros: ${i}/${total}`)
}
process.stdout.write(`\rCuadros: ${total}/${total}\n`)
ws.close()

// ---------- MP4 (H.264, compatible con cualquier reproductor) ----------
execFileSync('ffmpeg', [
  '-v', 'error', '-y', '-framerate', String(fps), '-i', join(frames, 'f%04d.png'),
  // Colores: se convierte con la matriz BT.709 y se deja marcada en el archivo. Sin la marca,
  // cada reproductor adivina, y si asume otra matriz el magenta y el amarillo del logo se corren.
  '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p',
  '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
  '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-movflags', '+faststart',
  '-x264-params', 'colorprim=bt709:transfer=bt709:colormatrix=bt709',
  out,
], { stdio: 'inherit' })
console.log(`Listo: ${out}`)
process.exit(0)
