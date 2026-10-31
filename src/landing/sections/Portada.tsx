import Aparece from '../Aparece.tsx'
import base from '../Landing.module.css'
import { COMPANY, FOTOS, TEMPORADA } from '../content.ts'
import { useProgreso } from '../efectos.ts'
import styles from './Portada.module.css'

/**
 * Portada: el mensaje principal y, debajo, la foto de la esquina que crece hasta llenar la
 * pantalla mientras se scrollea, con el remate del título apareciendo encima.
 */
function Portada() {
  const { ref } = useProgreso<HTMLDivElement>()

  return (
    <section id="inicio" className={styles.portada}>
      <div className={`${base.container} ${styles.texto}`}>
        <Aparece>
          <p className={base.eyebrow}>Publicidad digital de alto impacto · Diagonal Pueyrredón y La Rioja</p>
          <h1 className={styles.titulo}>Conectá tu marca con el corazón de Mar del Plata.</h1>
        </Aparece>
        <Aparece retraso={150}>
          <p className={styles.bajada}>
            Ubicá tu marca en el punto neurálgico y de mayor convergencia de la ciudad: una intersección abierta
            de 6 esquinas, con visibilidad garantizada y flujo vehicular y peatonal constante.
          </p>
          <p className={styles.temporada}>{TEMPORADA}</p>
          <div className={styles.acciones}>
            <a className={`${base.button} ${base.primary}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Anunciá en la pantalla
            </a>
            <a className={`${base.button} ${base.secondary}`} href="#esquina">
              Conocé la esquina
            </a>
          </div>
        </Aparece>
      </div>

      <div ref={ref} className={styles.escena}>
        <div className={styles.fija}>
          <div className={styles.marco}>
            <img src={FOTOS.portada} alt="La pantalla de YaMiPc en la esquina de La Rioja y Belgrano" />
            <p className={styles.remate}>
              Seis esquinas.
              <br />
              <span>Una sola pantalla.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portada
