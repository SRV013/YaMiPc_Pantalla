import { buildBackground } from './fondos.js'

// Motor compartido de las promos. Todo se calcula a partir del tiempo t (segundos),
// así una misma página sirve para verla en vivo, exportar imágenes y generar el video cuadro por cuadro.
//
// Parámetros de la URL:
//   ?t=4.2   congela la promo en ese segundo
//
// Elementos animados (atributos HTML):
//   data-in="2.5"     segundo en que entra
//   data-out="5.3"    segundo en que sale (opcional: si falta, se queda)
//   data-fx="type"    entrada: type (letra por letra, deslizando) | typefade (letra por letra, solo aparece, como Samsung) | rise | fade | pop
//   data-exit="whip"  salida: whip (latigazo con desenfoque de movimiento) | fade
//   data-speed="0.04" segundos entre letra y letra (para type)
//   data-din / data-dout   duración de la entrada / salida

const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v))
const easeOut = p => 1 - Math.pow(1 - p, 3)
const easeIn = p => p * p * p
const easeInOut = p => (p < 0.5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2)
const easeOutBack = p => 1 + 2.2 * Math.pow(p - 1, 3) + 1.2 * Math.pow(p - 1, 2)
const lerp = (a, b, p) => a + (b - a) * p
const NS = 'http://www.w3.org/2000/svg'

// ---------- Desenfoque de movimiento horizontal (un filtro SVG por elemento) ----------
let filterHost
let filterCount = 0
function motionBlur(el) {
  if (!filterHost) {
    filterHost = document.createElementNS(NS, 'svg')
    filterHost.setAttribute('width', '0')
    filterHost.setAttribute('height', '0')
    filterHost.style.position = 'absolute'
    document.body.appendChild(filterHost)
  }
  const id = `mb${filterCount++}`
  const f = document.createElementNS(NS, 'filter')
  f.setAttribute('id', id)
  f.setAttribute('x', '-50%'); f.setAttribute('width', '200%')
  f.setAttribute('y', '-20%'); f.setAttribute('height', '140%')
  const g = document.createElementNS(NS, 'feGaussianBlur')
  f.appendChild(g)
  filterHost.appendChild(f)
  return amount => {
    if (amount < 0.3) { el.style.filter = ''; return }
    g.setAttribute('stdDeviation', `${amount} ${amount * 0.08}`)
    el.style.filter = `url(#${id})`
  }
}

// ---------- Texto letra por letra ----------
function splitChars(el) {
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
  const nodes = []
  while (walker.nextNode()) nodes.push(walker.currentNode)
  nodes.forEach(node => {
    const text = node.textContent.trim()
    if (!text) { node.remove(); return }
    const frag = document.createDocumentFragment()
    for (const c of text) {
      const s = document.createElement('span')
      s.className = 'ch'
      s.textContent = c
      frag.appendChild(s)
    }
    node.replaceWith(frag)
  })
  return [...el.querySelectorAll('.ch')]
}

function setupFx(el) {
  const fx = el.dataset.fx || 'rise'
  const state = {
    tin: parseFloat(el.dataset.in),
    tout: el.dataset.out ? parseFloat(el.dataset.out) : Infinity,
    din: parseFloat(el.dataset.din || (fx.startsWith('type') ? 0.14 : 0.5)),
    dout: parseFloat(el.dataset.dout || 0.28),
    speed: parseFloat(el.dataset.speed || 0.04),
    fx,
    exit: el.dataset.exit || (fx === 'type' ? 'whip' : 'fade'),
    chars: fx.startsWith('type') ? splitChars(el) : null,
    icons: fx.startsWith('type') ? [...el.querySelectorAll(':scope > svg')] : [],
    blur: motionBlur(el),
  }
  state.chars?.forEach(c => (c._blur = null))
  return state
}

function applyFx(el, s, t) {
  const p = clamp((t - s.tin) / s.din)
  const q = clamp((t - s.tout) / s.dout)
  const started = t >= s.tin
  let opacity = started ? 1 : 0
  let tf = ''

  if (s.fx.startsWith('type')) {
    // type: cada letra entra desde la derecha, rápida y desenfocada. typefade: solo aparece (Samsung).
    const slide = s.fx === 'type'
    s.chars.forEach((c, i) => {
      const cp = clamp((t - s.tin - i * s.speed) / s.din)
      c.style.opacity = cp
      if (slide) {
        c.style.transform = `translateX(${(1 - easeOut(cp)) * 40}px)`
        c.style.filter = cp < 1 ? `blur(${(1 - cp) * 6}px)` : ''
      }
    })
    // Íconos dentro de la frase: aparecen con un pequeño rebote mientras se escribe el texto.
    s.icons.forEach(ic => {
      const ip = clamp((t - s.tin) / 0.35)
      ic.style.opacity = ip
      ic.style.transform = `scale(${0.5 + 0.5 * easeOutBack(ip)})`
    })
  } else if (s.fx === 'rise') {
    opacity *= easeOut(p)
    tf += `translateY(${(1 - easeOut(p)) * 36}px) `
  } else if (s.fx === 'pop') {
    opacity *= easeOut(p)
    tf += `scale(${0.55 + 0.45 * easeOutBack(p)}) `
  } else {
    opacity *= easeOut(p)
  }

  if (q > 0) {
    if (s.exit === 'whip') {
      // Latigazo: se va de golpe hacia la izquierda con desenfoque de movimiento.
      tf += `translateX(${-easeIn(q) * 900}px) `
      opacity *= 1 - easeIn(q)
      s.blur(q * 45)
    } else {
      opacity *= 1 - q
    }
  } else {
    s.blur(0)
  }
  el.style.opacity = opacity
  el.style.transform = tf
}

// ---------- Halo de luz detrás del logo ----------
function brandHalo(brand) {
  const h = document.createElement('span')
  h.className = 'halo'
  brand.prepend(h)
  return t => {
    const k = 0.5 + 0.5 * Math.sin((t / 2.4) * Math.PI * 2)
    h.style.opacity = 0.55 + 0.45 * k
    h.style.transform = `scale(${0.95 + 0.1 * k})`
  }
}

// ---------- Logo: claves {x, y, w, o, r, b} (r giro en grados, b desenfoque) ----------
function logoAt(keys, t) {
  const fill = k => ({ o: 1, r: 0, b: 0, ...k })
  if (t <= keys[0][0]) return fill(keys[0][1])
  for (let i = 1; i < keys.length; i++) {
    const [t1, b] = keys[i]
    const [t0, a] = keys[i - 1]
    if (t <= t1) {
      const ease = b.ease === 'in' ? easeIn : b.ease === 'out' ? easeOut : easeInOut
      const p = ease((t - t0) / (t1 - t0))
      const A = fill(a), B = fill(b)
      return Object.fromEntries(['x', 'y', 'w', 'o', 'r', 'b'].map(k => [k, lerp(A[k], B[k], p)]))
    }
  }
  return fill(keys[keys.length - 1][1])
}

// Achica las líneas que no entran en su renglón (nunca agranda).
function fitLines(root) {
  root.querySelectorAll('.line, .t').forEach(el => {
    const max = el.closest('.fit, .wide, .zone')?.clientWidth || 1080
    // Respeta un tamaño puesto a mano en la página; solo lo achica si no entra.
    el.dataset.fs ??= el.style.fontSize
    el.style.fontSize = el.dataset.fs
    const range = document.createRange()
    range.selectNodeContents(el)
    const w = range.getBoundingClientRect().width
    if (w > max) el.style.fontSize = `${parseFloat(getComputedStyle(el).fontSize) * (max / w)}px`
  })
}

// onRender(t, helpers): animación propia de cada promo (camión, cursor, etc.).
// shine: segundos en los que el brillo cruza el logo.
// fondo: formas | aurora | lineas | circuito (se puede cambiar con ?fondo= en la URL).
export function startPromo({ duration = 15, logo, shine = [], fondo = 'formas', onRender }) {
  const screen = document.querySelector('.screen')
  const params = new URLSearchParams(location.search)
  const moveBg = buildBackground(screen.querySelector('.bg'), params.get('fondo') || fondo)
  const halo = brandHalo(screen.querySelector('.brand'))
  const brand = screen.querySelector('.brand')
  const shineEl = brand.querySelector('.shine')
  const brandBlur = motionBlur(brand)
  const animated = [...screen.querySelectorAll('[data-in]')].map(el => [el, setupFx(el)])

  function render(t) {
    moveBg(t)

    if (logo) {
      const k = logoAt(logo, t)
      // Flota apenas, con el halo de luz latiendo detrás.
      const fy = 4 * Math.sin((t / 3.6) * Math.PI * 2)
      brand.style.left = `${k.x}px`
      brand.style.top = `${k.y}px`
      brand.style.width = `${k.w}px`
      brand.style.opacity = k.o
      brand.style.transform = `translateY(${fy}px) rotate(${k.r}deg)`
      halo(t)
      brandBlur(k.b)
    }
    const since = Math.min(...shine.map(s => (t >= s ? t - s : Infinity)))
    shineEl.style.backgroundPosition = `${150 - 300 * easeInOut(clamp(since / 0.9))}% 0`

    animated.forEach(([el, s]) => applyFx(el, s, t))
    onRender?.(t, { clamp, lerp, easeOut, easeIn, easeInOut })
  }

  const ready = Promise.all([
    document.fonts.ready,
    ...[...document.images].map(img => (img.complete ? null : new Promise(r => (img.onload = img.onerror = r)))),
  ]).then(() => fitLines(screen))

  window.promo = { render, duration, ready }

  if (params.has('t')) {
    const t = parseFloat(params.get('t'))
    render(t)
    ready.then(() => render(t))
  } else {
    const t0 = performance.now()
    const loop = now => {
      render(((now - t0) / 1000) % duration)
      requestAnimationFrame(loop)
    }
    ready.then(() => requestAnimationFrame(loop))
  }
}
