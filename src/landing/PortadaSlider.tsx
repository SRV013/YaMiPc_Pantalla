import { useEffect, useRef, useState } from 'react'
import styles from './PortadaSlider.module.css'

const PASO_MS = 5000
const DESLIZAR_PX = 40

type Punto = {
  lugar: string
  posicion: string
  hacia: string
  desde: string
  altHacia: string
  altDesde: string
}

/**
 * Fotos de la esquina que pasan de una en una. Cada foto mira hacia la pantalla y lleva, en un
 * recuadro, la vista contraria: lo que la pantalla tiene enfrente.
 */
function PortadaSlider({ puntos }: { puntos: Punto[] }) {
  const [actual, setActual] = useState(0)
  const inicioToque = useRef<number | null>(null)
  const ir = (paso: number) => setActual((i) => (i + paso + puntos.length) % puntos.length)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Se reinicia en cada cambio, así no pasa enseguida después de elegir una a mano.
    const id = setTimeout(() => setActual((i) => (i + 1) % puntos.length), PASO_MS)
    return () => clearTimeout(id)
  }, [actual, puntos.length])

  return (
    <div className={styles.slider}>
      <div
        className={styles.escenario}
        onPointerDown={(e) => (inicioToque.current = e.clientX)}
        onPointerUp={(e) => {
          if (inicioToque.current === null) return
          const dx = e.clientX - inicioToque.current
          inicioToque.current = null
          if (Math.abs(dx) > DESLIZAR_PX) ir(dx < 0 ? 1 : -1)
        }}
      >
        {puntos.map((punto, i) => (
          <figure key={punto.hacia} className={i === actual ? styles.visible : undefined} aria-hidden={i !== actual}>
            <img
              className={styles.foto}
              src={punto.hacia}
              alt={punto.altHacia}
              style={{ objectPosition: punto.posicion }}
              draggable={false}
            />
            <figcaption className={styles.lugar}>
              <span>{String(i + 1).padStart(2, '0')}</span> {punto.lugar}
            </figcaption>
            <div className={styles.recuadro}>
              <img src={punto.desde} alt={punto.altDesde} draggable={false} />
              <span className={styles.etiqueta}>Vista de enfrente</span>
            </div>
          </figure>
        ))}
      </div>

      <div className={styles.puntos}>
        {puntos.map((punto, i) => (
          <button
            key={punto.hacia}
            type="button"
            aria-label={`Foto ${i + 1}: ${punto.lugar}`}
            aria-pressed={i === actual}
            onClick={() => setActual(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  )
}

export default PortadaSlider
