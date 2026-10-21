// Fondos animados para las promos. Cada uno devuelve una función que lo dibuja en el segundo t.
//   formas   cuadrados redondeados girados (la forma del logo) flotando en profundidad, sobre luz difusa
//   aurora   manchas de luz en los colores de la marca que se mueven despacio, con trama de puntos
//   lineas   haces de luz diagonales que cruzan la pantalla, sobre luz difusa
//   circuito placa de circuito desenfocada (estilo del video viejo)

const NS = 'http://www.w3.org/2000/svg'

function seeded(seed) {
  return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646
}

function el(tag, cls, parent, style = {}) {
  const e = document.createElement(tag)
  if (cls) e.className = cls
  Object.assign(e.style, style)
  parent.appendChild(e)
  return e
}

// Luz difusa de fondo: manchas grandes y muy desenfocadas que se desplazan lento.
function aurora(root, strength = 1) {
  const blobs = [
    { c: `rgb(236 38 143 / ${0.42 * strength})`, s: 620, x: 200, y: 120, ax: 160, ay: 60, w: 0.11, p: 0 },
    { c: `rgb(110 40 210 / ${0.45 * strength})`, s: 700, x: 860, y: 260, ax: 180, ay: 70, w: 0.08, p: 2 },
    { c: `rgb(35 70 220 / ${0.32 * strength})`, s: 560, x: 600, y: -40, ax: 220, ay: 50, w: 0.07, p: 4 },
    { c: `rgb(255 242 18 / ${0.10 * strength})`, s: 380, x: 1000, y: 40, ax: 120, ay: 60, w: 0.13, p: 1 },
  ].map(b => ({ ...b, e: el('div', '', root, {
    position: 'absolute', width: `${b.s}px`, height: `${b.s * 0.6}px`, borderRadius: '50%',
    background: `radial-gradient(closest-side, ${b.c}, transparent)`, filter: 'blur(40px)',
  }) }))
  return t => blobs.forEach(b => {
    const x = b.x + b.ax * Math.sin(t * b.w * Math.PI * 2 + b.p) - b.s / 2
    const y = b.y + b.ay * Math.cos(t * b.w * 1.3 * Math.PI * 2 + b.p) - b.s * 0.3
    b.e.style.transform = `translate(${x}px, ${y}px)`
  })
}

function dots(root, opacity = 0.09) {
  el('div', '', root, {
    position: 'absolute', inset: '0',
    backgroundImage: `radial-gradient(rgb(255 255 255 / ${opacity}) 1.3px, transparent 1.8px)`,
    backgroundSize: '22px 22px',
  })
}

const FONDOS = {
  formas(root) {
    const moveLight = aurora(root, 0.85)
    const rand = seeded(5)
    const colors = ['236 38 143', '236 38 143', '140 60 230', '255 242 18', '70 100 240']
    // depth: 0 lejos (chico, desenfocado, lento) → 1 cerca (grande, nítido, rápido)
    const shapes = Array.from({ length: 16 }, (_, i) => {
      const depth = i / 15
      const size = 50 + depth * 260 + rand() * 40
      const color = colors[Math.floor(rand() * colors.length)]
      const filled = rand() < 0.35
      const e = el('div', '', root, {
        position: 'absolute', width: `${size}px`, height: `${size}px`,
        borderRadius: `${size * 0.17}px`,
        border: `${Math.max(3, size * 0.035)}px solid rgb(${color} / ${0.22 + depth * 0.25})`,
        background: filled ? `linear-gradient(160deg, rgb(${color} / 0.16), transparent 70%)` : 'none',
        filter: `blur(${(1 - depth) * 3 + (depth > 0.85 ? 3 : 0)}px)`,
      })
      return { e, size, depth, x: rand() * 1400 - 120, y: rand() * 420 - 60, rot: 26 + (rand() - 0.5) * 16, spin: (rand() - 0.5) * 6 }
    })
    return t => {
      moveLight(t)
      shapes.forEach(s => {
        const speed = 12 + s.depth * 45
        const span = 1152 + s.size * 2
        const x = ((((s.x - t * speed) % span) + span) % span) - s.size
        const y = s.y + Math.sin(t * 0.4 + s.x) * 10 * (0.5 + s.depth)
        s.e.style.transform = `translate(${x}px, ${y}px) rotate(${s.rot + s.spin * t}deg)`
      })
    }
  },

  aurora(root) {
    const moveLight = aurora(root, 1.25)
    dots(root, 0.1)
    return moveLight
  },

  lineas(root) {
    const moveLight = aurora(root, 0.75)
    const rand = seeded(9)
    const colors = ['236 38 143', '255 242 18', '150 80 255', '236 38 143']
    const angle = -26 // mismo ángulo que el cuadrado del logo
    const rad = (angle * Math.PI) / 180
    const streaks = Array.from({ length: 22 }, () => {
      const len = 140 + rand() * 360
      const h = 2 + rand() * 4
      const color = colors[Math.floor(rand() * colors.length)]
      const e = el('div', '', root, {
        position: 'absolute', left: '0', top: '0', width: `${len}px`, height: `${h}px`, borderRadius: `${h}px`,
        background: `linear-gradient(90deg, transparent, rgb(${color} / ${0.35 + rand() * 0.35}), transparent)`,
        boxShadow: `0 0 12px rgb(${color} / 0.35)`,
      })
      return { e, len, offset: rand() * 2000, lane: (rand() - 0.5) * 900, speed: 70 + rand() * 170 }
    })
    // Cada haz viaja por su propio carril paralelo; los carriles cubren toda la pantalla.
    const ux = Math.cos(rad), uy = Math.sin(rad)
    const nx = -uy, ny = ux
    return t => {
      moveLight(t)
      streaks.forEach(s => {
        const span = 2000
        const d = ((s.offset + t * s.speed) % span) - span / 2
        const x = 576 + nx * s.lane + ux * d - s.len / 2
        const y = 192 + ny * s.lane + uy * d
        s.e.style.transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`
      })
    }
  },

  circuito(root) {
    // Versión simple del fondo del video viejo, por si se quiere volver a usar.
    const svg = document.createElementNS(NS, 'svg')
    svg.setAttribute('viewBox', '0 0 1152 384')
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'
    root.appendChild(svg)
    const rand = seeded(7)
    const g = document.createElementNS(NS, 'g')
    g.setAttribute('filter', 'blur(3px)')
    svg.appendChild(g)
    for (let i = 0; i < 40; i++) {
      const x = rand() * 1600, y = rand() * 500
      const p = document.createElementNS(NS, 'path')
      p.setAttribute('d', `M${x} ${y} l${100 + rand() * 200} 0 l80 80 l0 ${100 + rand() * 150}`)
      p.setAttribute('stroke', rand() < 0.55 ? '#b0136a' : '#232f7d')
      p.setAttribute('stroke-width', 8)
      p.setAttribute('fill', 'none')
      g.appendChild(p)
    }
    return t => g.setAttribute('transform', `translate(${-200 - t * 30} ${-60})`)
  },
}

// liso: sin fondo animado; el color lo pone la promo (por ejemplo, el gris claro estilo Samsung).
FONDOS.liso = () => () => {}

export function buildBackground(root, kind = 'formas') {
  root.innerHTML = ''
  return (FONDOS[kind] || FONDOS.formas)(root)
}
