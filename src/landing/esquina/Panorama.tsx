import { useEffect, useRef, type CSSProperties } from 'react'
import type { Momento } from '../content.ts'
import Foto from './Foto.tsx'
import { variante } from './variantes.ts'
import styles from './Panorama.module.css'

// Proporción de la foto panorámica: ancho / alto.
const PROPORCION = 4

// Marcadores mientras no está la panorámica real: ocho tramos de color, uno cada 45°.
const TRAMOS = {
  dia: ['#4f7fd6', '#3f9d77', '#d29a3a', '#c25d8c', '#6b6fd6', '#3c9aa8', '#c97b4a', '#8a6bc2'],
  noche: ['#1d2550', '#123a30', '#4a3113', '#3b1832', '#272a5c', '#11363d', '#4a2a17', '#2e1f4a'],
}

type PanoramaProps = {
  src: string
  momento: Momento
  /** Se puede rotar arrastrando con el mouse o el dedo. */
  arrastrable?: boolean
  /** Acercamiento: 1 es la altura completa. */
  zoom?: number
}

/** Vista 360: la foto panorámica se gira arrastrando, y da la vuelta completa sin corte. */
function Panorama({ src, momento, arrastrable = false, zoom = 1 }: PanoramaProps) {
  const caja = useRef<HTMLDivElement>(null)
  const pista = useRef<HTMLDivElement>(null)
  const desplazamiento = useRef(0)
  const arrastre = useRef<{ x: number; inicio: number } | null>(null)

  // Solo gira cuando se arrastra. Se redibuja en cada cuadro para seguir el arrastre y los cambios de zoom.
  useEffect(() => {
    let id = 0
    const cuadro = () => {
      const copia = pista.current?.firstElementChild as HTMLElement | null
      const ancho = copia?.offsetWidth ?? 0
      if (ancho > 0) {
        const x = ((desplazamiento.current % ancho) + ancho) % ancho
        pista.current!.style.transform = `translate(${-x}px, -50%)`
      }
      id = requestAnimationFrame(cuadro)
    }
    id = requestAnimationFrame(cuadro)
    return () => cancelAnimationFrame(id)
  }, [])

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
      onPointerDown={(e) => {
        if (!arrastrable) return
        arrastre.current = { x: e.clientX, inicio: desplazamiento.current }
        caja.current?.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        if (!arrastre.current) return
        desplazamiento.current = arrastre.current.inicio - (e.clientX - arrastre.current.x)
      }}
      onPointerUp={() => (arrastre.current = null)}
      onPointerCancel={() => (arrastre.current = null)}
    >
      <div
        ref={pista}
        className={styles.pista}
        style={{ height: `${zoom * 100}%`, '--proporcion': PROPORCION } as CSSProperties}
      >
        {copia('a')}
        {copia('b')}
      </div>
    </div>
  )
}

export default Panorama
