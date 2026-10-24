import base from '../Landing.module.css'
import { VERANO } from '../content.ts'
import { TIME_ZONE } from '../../weather.ts'
import styles from './Verano.module.css'

// Se calcula al cargar la página: alcanza para que el bloque deje de salir al terminar el verano.
const EN_VERANO = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE }).format(new Date()) <= VERANO.fin

const DATOS = [
  // Dato del dueño de la pantalla.
  {
    valor: 'Temporada MDQ',
    detalle:
      'Más de 500 mil peatones por semana. Y en el cruce de La Rioja, Belgrano y la Diagonal, los autos esperan el semáforo mirando la pantalla.',
  },
  // De 9 a 23 h son 14 horas al aire.
  { valor: '14 horas', detalle: 'De publicidad continua, todos los días' },
  { valor: 'Tu anuncio', detalle: 'Si no lo tenés, lo diseñamos' },
]

/** Llamado a sumarse a la pantalla durante el verano. Desaparece solo cuando termina. */
function Verano() {
  if (!EN_VERANO) return null

  return (
    <section id="verano" className={`${base.section} ${styles.verano}`} aria-labelledby="verano-titulo">
      <div className={base.container}>
        <h2 id="verano-titulo" className={styles.titulo}>
          PreVenta <span className={styles.año}>{VERANO.año}</span>
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
