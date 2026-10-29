import { useEffect, useRef, type CSSProperties } from 'react'
import type { Momento } from '../content.ts'
import Foto from './Foto.tsx'
import { variante } from './variantes.ts'
import styles from './Panorama.module.css'

// Proporción de los marcadores de color, mientras no hay foto: ancho / alto.
const PROPORCION = 8

// Marcadores mientras no está la panorámica real: ocho tramos de color, uno cada 45°.
const TRAMOS = {
  dia: ['#4f7fd6', '#3f9d77', '#d29a3a', '#c25d8c', '#6b6fd6', '#3c9aa8', '#c97b4a', '#8a6bc2'],
  noche: ['#1d2550', '#123a30', '#4a3113', '#3b1832', '#272a5c', '#11363d', '#4a2a17', '#2e1f4a'],
}

// Al soltar, el giro sigue un poco y frena solo, como al empujar algo que gira.
const FRENO = 0.94
// Cuánto gira cada flecha del teclado: un 1/24 de vuelta (15°).
const PASO_TECLADO = 1 / 24

type PanoramaProps = {
  /** Foto de la vuelta completa: el borde derecho empalma con el izquierdo. */
  src: string
  momento: Momento
  /** Hacia dónde mira al abrir, de 0 a 1 a lo ancho de la foto (por ejemplo, la pantalla). */
  inicio?: number
  /** Se puede girar arrastrando con el mouse o el dedo, y con las flechas del teclado. */
  arrastrable?: boolean
  /** Acercamiento: 1 es la altura completa. */
  zoom?: number
}

/**
 * Vista 360 de la esquina. La foto da la vuelta completa sin corte: se gira arrastrando (con un
 * poco de inercia al soltar) y un mapa abajo muestra la vuelta entera y hacia dónde se está mirando.
 */
function Panorama({ src, momento, inicio = 0.5, arrastrable = false, zoom = 1 }: PanoramaProps) {
  const caja = useRef<HTMLDivElement>(null)
  const pista = useRef<HTMLDivElement>(null)
  const ventanas = useRef<HTMLSpanElement[]>([])
  // Hacia dónde mira el centro de la vista, como fracción de la vuelta (0 a 1).
  const posicion = useRef(inicio)
  const velocidad = useRef(0)
  const arrastre = useRef<{ x: number; posicion: number; t: number } | null>(null)

  useEffect(() => {
    let id = 0
    const cuadro = () => {
      const copia = pista.current?.firstElementChild as HTMLElement | null
      const ancho = copia?.offsetWidth ?? 0
      const visible = caja.current?.clientWidth ?? 0
      if (ancho > 0) {
        if (!arrastre.current && Math.abs(velocidad.current) > 0.00001) {
          posicion.current += velocidad.current
          velocidad.current *= FRENO
        }
        const p = ((posicion.current % 1) + 1) % 1
        const x = p * ancho - visible / 2
        pista.current!.style.transform = `translate(${-(((x % ancho) + ancho) % ancho)}px, -50%)`

        // Recuadro del mapa: dos copias, así se ve bien cuando la vista cruza el borde de la foto.
        const tamano = Math.min(1, visible / ancho)
        ventanas.current.forEach((ventana, i) => {
          ventana.style.width = `${tamano * 100}%`
          ventana.style.left = `${(p - tamano / 2 + (i === 0 ? 0 : p - tamano / 2 < 0 ? 1 : -1)) * 100}%`
        })
      }
      id = requestAnimationFrame(cuadro)
    }
    id = requestAnimationFrame(cuadro)
    return () => cancelAnimationFrame(id)
  }, [])

  const anchoVuelta = () => (pista.current?.firstElementChild as HTMLElement | null)?.offsetWidth || 1

  const copia = (clave: string) => (
    <div key={clave} className={src ? styles.copiaFoto : styles.copia} aria-hidden={clave !== 'a'}>
      {src ? (
        // La miniatura da el ancho y se ve desenfocada; la foto liviana aparece encima al cargar.
        <div className={styles.capas}>
          <img className={styles.mini} src={variante(src, 'mini')} alt="" draggable={false} />
          <img
            className={styles.foto}
            src={variante(src, 'vista')}
            alt={clave === 'a' ? 'Vista 360 de la esquina' : ''}
            decoding="async"
            draggable={false}
            onLoad={(e) => e.currentTarget.classList.add(styles.lista)}
          />
        </div>
      ) : (
        TRAMOS[momento].map((color, i) => (
          <Foto
            key={i}
            src=""
            alt={`Vista 360, ${i * 45}°`}
            etiqueta={`360 · ${momento === 'dia' ? 'Día' : 'Noche'} · ${i * 45}°`}
            color={color}
          />
        ))
      )}
    </div>
  )

  return (
    <div
      ref={caja}
      className={`${styles.panorama} ${arrastrable ? styles.arrastrable : ''}`}
      tabIndex={arrastrable ? 0 : undefined}
      role={arrastrable ? 'application' : undefined}
      aria-label={arrastrable ? 'Vista 360 de la esquina. Usá las flechas para girar.' : undefined}
      onKeyDown={(e) => {
        if (!arrastrable || (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight')) return
        e.preventDefault()
        velocidad.current = 0
        posicion.current += e.key === 'ArrowRight' ? PASO_TECLADO : -PASO_TECLADO
      }}
      onPointerDown={(e) => {
        if (!arrastrable) return
        velocidad.current = 0
        arrastre.current = { x: e.clientX, posicion: posicion.current, t: performance.now() }
        caja.current?.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        const inicioArrastre = arrastre.current
        if (!inicioArrastre) return
        const anterior = posicion.current
        posicion.current = inicioArrastre.posicion - (e.clientX - inicioArrastre.x) / anchoVuelta()
        // La velocidad del último tramo da la inercia al soltar.
        const ahora = performance.now()
        const dt = Math.max(1, ahora - inicioArrastre.t)
        velocidad.current = ((posicion.current - anterior) / dt) * 16
        inicioArrastre.t = ahora
      }}
      onPointerUp={() => (arrastre.current = null)}
      onPointerCancel={() => (arrastre.current = null)}
    >
      <div ref={pista} className={styles.pista} style={{ height: `${zoom * 100}%`, '--proporcion': PROPORCION } as CSSProperties}>
        {copia('a')}
        {copia('b')}
      </div>

      {src && (
        // Mapa de la vuelta completa: tocarlo gira la vista hacia ese punto.
        <button
          type="button"
          className={styles.mapa}
          aria-label="Mapa de la vuelta completa"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            const r = e.currentTarget.getBoundingClientRect()
            velocidad.current = 0
            posicion.current = (e.clientX - r.left) / r.width
          }}
        >
          <img src={variante(src, 'vista')} alt="" draggable={false} />
          {[0, 1].map((i) => (
            <span
              key={i}
              className={styles.ventana}
              ref={(el) => {
                if (el) ventanas.current[i] = el
              }}
            />
          ))}
        </button>
      )}
    </div>
  )
}

export default Panorama
