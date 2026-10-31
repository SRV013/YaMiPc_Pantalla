import base from '../Landing.module.css'
import { ATRACCION } from '../content.ts'
import { useProgreso } from '../efectos.ts'
import styles from './Historia.module.css'

/**
 * Puntos de atracción, contados con scroll: la sección queda fija y, a medida que se baja, se
 * ilumina el siguiente punto y cambia la foto (shopping, McDonald's, semáforos).
 */
function Historia() {
  const { ref, paso } = useProgreso<HTMLElement>(ATRACCION.length)

  return (
    <section id="esquina" ref={ref} className={styles.historia} style={{ height: `${ATRACCION.length * 90 + 40}svh` }}>
      <div className={styles.fija}>
        <div className={`${base.container} ${styles.grilla}`}>
          <div className={styles.lista}>
            <p className={base.eyebrow}>Puntos de atracción inmediata</p>
            <ol>
              {ATRACCION.map((punto, i) => (
                <li key={punto.titulo} className={i === paso ? styles.activo : undefined} aria-current={i === paso}>
                  <h2 className={styles.titulo}>{punto.titulo}</h2>
                  <p className={styles.texto}>{punto.texto}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className={styles.fotos}>
            {ATRACCION.map((punto, i) => (
              <img
                key={punto.foto}
                src={punto.foto}
                alt={punto.titulo}
                className={i === paso ? styles.visible : undefined}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
            <span className={styles.avance} aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Historia
