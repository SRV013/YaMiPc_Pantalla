import { useEffect, useRef, useState, type ReactNode } from 'react'
import Icon from './Icon.tsx'
import { useRuedaLateral } from './efectos.ts'
import styles from './CarruselTactil.module.css'

export type Lamina = {
  /** Ruta de la foto, o un elemento ya armado (por ejemplo, una foto con carga progresiva). */
  foto: string | ReactNode
  alt: string
  contenido: ReactNode
  /** Algo más sobre la foto, como un botón para ampliarla. */
  encima?: ReactNode
}

/** Desliza la fila hasta dejar centrada la foto `i` (sin pasarse de la primera ni de la última). */
function centrar(lista: HTMLUListElement | null, i: number) {
  const destino = lista?.children[Math.min(lista.children.length - 1, Math.max(0, i))] as HTMLElement | undefined
  if (!lista || !destino) return
  lista.scrollTo({ left: destino.offsetLeft - (lista.clientWidth - destino.offsetWidth) / 2, behavior: 'smooth' })
}

/**
 * Carrusel que se mueve hacia los costados, nunca con el scroll de la página: con el dedo en el
 * celular y, en la computadora, con el gesto de costado del touchpad, arrastrando con el mouse o con
 * las flechas. Cada foto se frena centrada (scroll-snap) y los puntos muestran cuál se ve.
 */
function CarruselTactil({ laminas }: { laminas: Lamina[] }) {
  const [actual, setActual] = useState(0)
  const actualRef = useRef(0)
  useEffect(() => {
    actualRef.current = actual
  }, [actual])
  const arrastre = useRef<{ x: number; inicio: number; movio: boolean } | null>(null)

  const fila = useRuedaLateral<HTMLUListElement>((sentido, lista) => centrar(lista, actualRef.current + sentido))
  const ir = (i: number) => centrar(fila.current, i)

  useEffect(() => {
    const lista = fila.current
    if (!lista) return
    let id = 0
    const medir = () => {
      id = 0
      const centro = lista.scrollLeft + lista.clientWidth / 2
      let cerca = 0
      Array.from(lista.children).forEach((hijo, i) => {
        const h = hijo as HTMLElement
        const elegido = lista.children[cerca] as HTMLElement
        if (Math.abs(h.offsetLeft + h.offsetWidth / 2 - centro) < Math.abs(elegido.offsetLeft + elegido.offsetWidth / 2 - centro))
          cerca = i
      })
      setActual(cerca)
    }
    const pedir = () => {
      if (!id) id = requestAnimationFrame(medir)
    }
    lista.addEventListener('scroll', pedir, { passive: true })
    return () => {
      lista.removeEventListener('scroll', pedir)
      cancelAnimationFrame(id)
    }
  }, [fila, laminas.length])

  return (
    <div className={styles.carrusel}>
      <ul
        ref={fila}
        className={styles.fila}
        // Con el mouse se puede arrastrar de costado; con el dedo lo hace el navegador solo.
        onPointerDown={(e) => {
          if (e.pointerType !== 'mouse' || e.button !== 0) return
          arrastre.current = { x: e.clientX, inicio: actual, movio: false }
        }}
        onPointerMove={(e) => {
          const a = arrastre.current
          if (!a || Math.abs(e.clientX - a.x) < 8) return
          if (!a.movio) {
            a.movio = true
            e.currentTarget.classList.add(styles.arrastrando)
          }
        }}
        onPointerUp={(e) => {
          const a = arrastre.current
          if (!a) return
          e.currentTarget.classList.remove(styles.arrastrando)
          const dx = e.clientX - a.x
          if (a.movio && Math.abs(dx) > 40) ir(a.inicio + (dx < 0 ? 1 : -1))
          // Se suelta un instante después, así el clic que sigue al arrastre no cuenta.
          setTimeout(() => (arrastre.current = null))
        }}
        onPointerLeave={(e) => {
          e.currentTarget.classList.remove(styles.arrastrando)
          arrastre.current = null
        }}
        onClickCapture={(e) => {
          if (arrastre.current?.movio) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
      >
        {laminas.map((l, i) => (
          <li key={i} className={styles.lamina} aria-roledescription="diapositiva" aria-label={`${i + 1} de ${laminas.length}`}>
            {typeof l.foto === 'string' ? (
              <img src={l.foto} alt={l.alt} loading={i === 0 ? 'eager' : 'lazy'} draggable={false} />
            ) : (
              l.foto
            )}
            <div className={styles.leyenda}>{l.contenido}</div>
            {l.encima}
          </li>
        ))}
      </ul>
      <div className={styles.controles}>
        <button
          type="button"
          className={styles.flecha}
          aria-label="Anterior"
          disabled={actual === 0}
          onClick={() => ir(actual - 1)}
        >
          <Icon name="arrow" size={18} className={styles.atras} />
        </button>
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
        <button
          type="button"
          className={styles.flecha}
          aria-label="Siguiente"
          disabled={actual === laminas.length - 1}
          onClick={() => ir(actual + 1)}
        >
          <Icon name="arrow" size={18} />
        </button>
      </div>
      <p className={styles.ayuda} aria-hidden="true">
        Deslizá para ver más →
      </p>
    </div>
  )
}

export default CarruselTactil
