import { useEffect, useRef, useState, type ReactNode } from 'react'
import styles from './CarruselTactil.module.css'

export type Lamina = {
  /** Ruta de la foto, o un elemento ya armado (por ejemplo, una foto con carga progresiva). */
  foto: string | ReactNode
  alt: string
  contenido: ReactNode
  /** Algo más sobre la foto, como un botón para ampliarla. */
  encima?: ReactNode
}

/**
 * Carrusel para el celular: las fotos se deslizan con el dedo hacia los costados y se frenan
 * centradas (scroll-snap). Los puntos de abajo muestran cuál se ve y también sirven para saltar.
 */
function CarruselTactil({ laminas }: { laminas: Lamina[] }) {
  const fila = useRef<HTMLUListElement>(null)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    const lista = fila.current
    if (!lista) return
    let id = 0
    const medir = () => {
      id = 0
      const primera = lista.firstElementChild as HTMLElement | null
      if (!primera) return
      const paso = primera.offsetWidth + parseFloat(getComputedStyle(lista).columnGap || '0')
      setActual(Math.min(laminas.length - 1, Math.max(0, Math.round(lista.scrollLeft / paso))))
    }
    const pedir = () => {
      if (!id) id = requestAnimationFrame(medir)
    }
    lista.addEventListener('scroll', pedir, { passive: true })
    return () => {
      lista.removeEventListener('scroll', pedir)
      cancelAnimationFrame(id)
    }
  }, [laminas.length])

  const ir = (i: number) => {
    const destino = fila.current?.children[i] as HTMLElement | undefined
    destino?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center',
    })
  }

  return (
    <div className={styles.carrusel}>
      <ul ref={fila} className={styles.fila}>
        {laminas.map((l, i) => (
          <li key={i} className={styles.lamina} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${laminas.length}`}>
            {typeof l.foto === 'string' ? <img src={l.foto} alt={l.alt} loading={i === 0 ? 'eager' : 'lazy'} /> : l.foto}
            <div className={styles.leyenda}>{l.contenido}</div>
            {l.encima}
          </li>
        ))}
      </ul>
      <div className={styles.puntos}>
        {laminas.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Ver foto ${i + 1}`}
            aria-current={i === actual}
            className={i === actual ? styles.activo : undefined}
            onClick={() => ir(i)}
          />
        ))}
      </div>
      <p className={styles.ayuda} aria-hidden="true">
        Deslizá para ver más →
      </p>
    </div>
  )
}

export default CarruselTactil
