import EsquinaGaleria from '../esquina/EsquinaGaleria.tsx'
import base from '../Landing.module.css'
import { COMPANY, TEMPORADA } from '../content.ts'
import styles from './Hero.module.css'

/** Portada: el mensaje principal de marketing, la temporada y las fotos de la esquina. */
function Hero() {
  return (
    <section id="inicio" className={styles.hero} aria-labelledby="portada-titulo">
      <div className={base.container}>
        <p className={base.eyebrow}>Publicidad digital de alto impacto · Diagonal Pueyrredón y La Rioja</p>
        <h1 id="portada-titulo" className={styles.titulo}>
          Conectá tu marca con el corazón de Mar del Plata <span className={styles.acento}>en seis esquinas</span>
        </h1>

        <div className={styles.fila}>
          <div className={styles.texto}>
            <p className={styles.bajada}>
              Ubicá tu marca en el punto neurálgico y de mayor convergencia de la ciudad. Esta pantalla digital
              estratégica te posiciona en una intersección abierta de 6 esquinas, con visibilidad garantizada y
              flujo vehicular y peatonal constante.
            </p>
            <p className={styles.temporada}>{TEMPORADA}</p>
          </div>
          <div className={styles.acciones}>
            <a className={`${base.button} ${base.primary}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Anunciá en la pantalla
            </a>
            <a className={`${base.button} ${base.secondary}`} href="#ubicacion">
              Dónde está
            </a>
          </div>
        </div>
      </div>

      <EsquinaGaleria />
    </section>
  )
}

export default Hero
