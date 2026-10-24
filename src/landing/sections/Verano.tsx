import base from '../Landing.module.css'
import { SCREEN, VERANO } from '../content.ts'
import { TIME_ZONE } from '../../weather.ts'
import styles from './Verano.module.css'

// Se calcula al cargar la página: alcanza para que el bloque deje de salir al terminar el verano.
const EN_VERANO = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date()) <= VERANO.fin

const DATOS = [
  { valor: VERANO.periodo, detalle: 'Todo el verano' },
  { valor: SCREEN.hours, detalle: 'Todos los días, con la ciudad llena' },
  { valor: 'Tu anuncio', detalle: 'Si no lo tenés, lo diseñamos' },
]

/** Llamado a sumarse a la pantalla durante el verano. Desaparece solo cuando termina. */
function Verano() {
  if (!EN_VERANO) return null

  return (
    <section id="verano" className={`${base.section} ${styles.verano}`} aria-labelledby="verano-titulo">
      <div className={base.container}>
        <h2 id="verano-titulo" className={styles.titulo}>
          Temporada <span className={styles.año}>{VERANO.año}</span>
        </h2>
        <p className={styles.bajada}>
          Este verano la ciudad se llena de gente, y la esquina de La Rioja y Belgrano no para.
          Sumá tu marca a la pantalla y que te vean todos los que pasan.
        </p>

        <ul className={styles.datos}>
          {DATOS.map((dato) => (
            <li key={dato.valor}>
              <p className={styles.valor}>{dato.valor}</p>
              <p className={styles.detalle}>{dato.detalle}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Verano
