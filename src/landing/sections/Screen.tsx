import AdCarousel from '../AdCarousel.tsx'
import base from '../Landing.module.css'
import { ADS, SCREEN } from '../content.ts'
import styles from './Screen.module.css'

const SPECS = [
  {
    value: (
      <>
        8 <span className={styles.unit}>metros</span> x 4 <span className={styles.unit}>metros</span>
      </>
    ),
    label: 'de pantalla',
  },
  { value: '15 s', label: 'por spot' },
  { value: 'A la calle', label: 'sobre la vereda de La Rioja y Belgrano' },
]

// Pendiente: sumar la frecuencia con la que sale cada anuncio cuando esté definida.
const SCHEDULE = [
  { title: 'Horario', text: `La pantalla está encendida todos los días ${SCREEN.hours}.` },
  { title: 'Duración', text: `Cada anuncio dura ${SCREEN.spot}.` },
  { title: 'Formato', text: `Video o imagen de ${SCREEN.fileFormat}. Si no tenés uno, lo diseñamos.` },
]

function Screen() {
  return (
    <section id="pantalla" className={`${base.section} ${styles.screen}`}>
      <div className={base.container}>
        <p className={base.eyebrow}>La pantalla</p>
        <h2 className={base.heading}>Tu anuncio, sobre la vereda.</h2>
        <p className={base.lead}>
          La pantalla LED está en el frente de nuestro local, en La Rioja 1902, a la vista de todos los que
          caminan o pasan en auto por la esquina con Belgrano.
        </p>

        <div className={styles.carousel}>
          <AdCarousel ads={ADS} />
        </div>

        <ul className={styles.specs}>
          {SPECS.map((spec) => (
            <li key={spec.label}>
              <p className={styles.value}>{spec.value}</p>
              <p className={styles.label}>{spec.label}</p>
            </li>
          ))}
        </ul>

        <h3 className={styles.subheading}>Cuándo salen los anuncios</h3>
        <ul className={styles.schedule}>
          {SCHEDULE.map((item) => (
            <li key={item.title} className={base.card}>
              <p className={styles.scheduleTitle}>{item.title}</p>
              <p className={styles.scheduleText}>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Screen
