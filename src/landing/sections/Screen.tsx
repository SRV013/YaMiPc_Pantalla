import AdCarousel from '../AdCarousel.tsx'
import base from '../Landing.module.css'
import { ADS, SCREEN } from '../content.ts'
import styles from './Screen.module.css'

// Pendiente: sumar la frecuencia con la que sale cada anuncio cuando esté definida.
const SPECS = [
  // Tipo de LED informado por el dueño de la pantalla. "P7" es la distancia entre los centros de
  // dos LED vecinos (pixel pitch): 7 mm, una medida para verse de lejos, típica de la vía pública.
  {
    title: 'Tamaño',
    label:
      'Pantalla LED de alta potencia de 8 × 4 metros. Es P7: sus LED están a 7 mm uno de otro, una medida pensada para verse nítida de lejos, desde la calle.',
  },
  { title: 'Encendida', label: `De ${SCREEN.hours}, todos los días, con los anuncios en rotación continua.` },
  { title: 'Duración', label: '15 segundos por anuncio, que se repite a lo largo del día.' },
  { title: 'Formato', label: 'Imagen o video de 1152 × 384 píxeles, el tamaño del archivo de tu anuncio.' },
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
