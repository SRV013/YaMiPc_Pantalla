import CarruselTactil from '../CarruselTactil.tsx'
import base from '../Landing.module.css'
import { ATRACCION } from '../content.ts'
import styles from './Historia.module.css'

/** Puntos de atracción en un carrusel que se mueve hacia los costados (no con el scroll de la página). */
function Historia() {
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

export default Historia
