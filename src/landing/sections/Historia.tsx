import type { CSSProperties } from 'react'
import CarruselTactil from '../CarruselTactil.tsx'
import base from '../Landing.module.css'
import { ATRACCION } from '../content.ts'
import { useEsCelular, useProgreso } from '../efectos.ts'
import styles from './Historia.module.css'

/**
 * Puntos de atracción en un carrusel que sigue el scroll, como las galerías de Apple: un punto
 * grande en el centro, los otros asomando a los costados, y al bajar se corre al siguiente.
 */
// Para que nunca quede un costado vacío, la fila suma una copia del último punto antes del primero
// y una del primero después del último.
const FILA = [
  { punto: ATRACCION[ATRACCION.length - 1], i: -1, copia: true },
  ...ATRACCION.map((punto, i) => ({ punto, i, copia: false })),
  { punto: ATRACCION[0], i: ATRACCION.length, copia: true },
]

function HistoriaScroll() {
  const { ref, paso } = useProgreso<HTMLElement>(ATRACCION.length)

  return (
    <section id="esquina" ref={ref} className={styles.historia} style={{ height: `${ATRACCION.length * 90 + 40}svh` }}>
      <div className={styles.fija}>
        <div className={`${base.container} ${styles.encabezado}`}>
          <p className={base.eyebrow}>Puntos de atracción inmediata</p>
        </div>

        <div className={styles.carrusel}>
          {FILA.map(({ punto, i, copia }) => (
            <figure
              key={i}
              className={styles.lamina}
              style={{ '--i': i } as CSSProperties}
              aria-hidden={copia || i !== paso}
            >
              <img src={punto.foto} alt={copia ? '' : punto.titulo} />
              {/* El texto va dentro de la foto, abajo a la izquierda, como en día y noche. */}
              <figcaption className={styles.leyenda}>
                <h2 className={styles.titulo}>{punto.titulo}</h2>
                <p className={styles.texto}>{punto.texto}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {/* Avance: en qué punto de los tres está. */}
        <div className={styles.puntos} aria-hidden="true">
          {ATRACCION.map((punto, i) => (
            <span key={punto.titulo} className={i === paso ? styles.puntoActivo : undefined} />
          ))}
        </div>
      </div>
    </section>
  )
}

/** En el celular: las mismas fotos en un carrusel que se desliza con el dedo, sin depender del scroll. */
function HistoriaCelular() {
  return (
    <section id="esquina" className={base.section}>
      <div className={`${base.container} ${styles.encabezado}`}>
        <p className={base.eyebrow}>Puntos de atracción inmediata</p>
      </div>
      <CarruselTactil
        laminas={ATRACCION.map((punto) => ({
          foto: punto.foto,
          alt: punto.titulo,
          contenido: (
            <>
              <h2 className={styles.titulo}>{punto.titulo}</h2>
              <p className={styles.texto}>{punto.texto}</p>
            </>
          ),
        }))}
      />
    </section>
  )
}

function Historia() {
  return useEsCelular() ? <HistoriaCelular /> : <HistoriaScroll />
}

export default Historia
