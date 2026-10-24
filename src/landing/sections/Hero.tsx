import PortadaSlider from '../PortadaSlider.tsx'
import base from '../Landing.module.css'
import { COMPANY, PORTADA, PREVENTA } from '../content.ts'
import styles from './Hero.module.css'

const DATOS = [
  {
    valor: 'Temporada MDQ',
    // Dato del dueño de la pantalla.
    detalle: 'Más de 500 mil peatones por semana.',
    puntos: [
      'Frente al shopping Los Gallegos',
      'En el cruce de La Rioja, Belgrano y la Diagonal',
      'Los autos esperan el semáforo mirando la pantalla',
    ],
  },
  {
    // De 9 a 23 h son 14 horas al aire.
    valor: '14 horas',
    detalle: 'De publicidad continua, todos los días.',
    puntos: [
      'Encendida de 9 a 23 h',
      'Spots de 15 segundos que se repiten durante el día',
      'Se ve de día y también de noche',
    ],
  },
  {
    valor: 'Tu anuncio',
    detalle: 'Si no lo tenés, lo diseñamos.',
    puntos: [
      'Pantalla de 8 × 4 metros',
      'Video o imagen de 1152 × 384 píxeles',
      'Pensado para leerse de lejos y en pocos segundos',
    ],
  },
]

/** Portada: la preventa de la temporada, las fotos de la esquina y los datos que la respaldan. */
function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="preventa-titulo">
      <div className={base.container}>
        <p className={base.eyebrow}>Mar del Plata · La Rioja y Belgrano</p>
        <h1 id="preventa-titulo" className={styles.titulo}>
          PreVenta <span className={styles.año}>{PREVENTA.año}</span>
        </h1>

        <div className={styles.fila}>
          <p className={styles.bajada}>
            Este verano la ciudad se llena de gente, y la esquina de La Rioja y Belgrano no para.
            Sumá tu marca a la pantalla y que te vean todos los que pasan.
          </p>
          <div className={styles.acciones}>
            <a className={`${base.button} ${base.primary}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Anunciá en la pantalla
            </a>
            <a className={`${base.button} ${base.secondary}`} href="#ubicacion">
              Dónde está
            </a>
          </div>
        </div>

        <PortadaSlider puntos={PORTADA} />

        <ul className={styles.datos}>
          {DATOS.map((dato) => (
            <li key={dato.valor}>
              <p className={styles.valor}>{dato.valor}</p>
              <p className={styles.detalle}>{dato.detalle}</p>
              <ul className={styles.puntos}>
                {dato.puntos.map((punto) => (
                  <li key={punto}>{punto}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Hero
