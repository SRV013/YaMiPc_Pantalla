import AdCarousel from '../AdCarousel.tsx'
import base from '../Landing.module.css'
import { ADS, SCREEN } from '../content.ts'
import styles from './Screen.module.css'

// Pendiente: sumar la frecuencia con la que sale cada anuncio cuando esté definida.
// Especificaciones técnicas del pedido de marketing. "P7" es la distancia entre los centros de dos
// LED vecinos (pixel pitch): 7 mm, una medida para verse de lejos, típica de la vía pública.
const SPECS = [
  { title: 'Gran formato', label: 'Pantalla LED P7 de 8 × 4 metros, para un dominio visual absoluto.' },
  { title: 'Definición', label: '1152 × 384 píxeles, optimizada para lecturas veloces a distancia.' },
  { title: 'Formato de spots', label: `Anuncios dinámicos de ${SCREEN.spot} de duración.` },
]

function Screen() {
  return (
    <section id="pantalla" className={`${base.section} ${styles.screen}`}>
      <div className={base.container}>
        <p className={base.eyebrow}>Especificaciones técnicas</p>
        <h2 className={base.heading}>Así se ve tu anuncio.</h2>
        <p className={base.lead}>
          La pantalla LED está en el frente de nuestro local, en La Rioja 1902, a la vista de todos los que
          caminan o pasan en auto por la esquina con Belgrano.
        </p>

        <div className={styles.carousel}>
          <AdCarousel ads={ADS} />
        </div>

        <ul className={styles.specs}>
          {SPECS.map((spec) => (
            <li key={spec.title}>
              <p className={styles.value}>{spec.title}</p>
              <p className={styles.label}>{spec.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Screen
