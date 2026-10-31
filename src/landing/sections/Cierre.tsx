import Aparece from '../Aparece.tsx'
import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { COMPANY, PANTALLA, SCREEN, TEMPORADA_DESDE, TEMPORADA_HASTA } from '../content.ts'
import styles from './Cierre.module.css'

/** Cierre: la propuesta de temporada, el contacto por WhatsApp y dónde está la pantalla. */
function Cierre() {
  return (
    <section id="temporada" className={base.section}>
      <div className={base.container}>
        <Aparece className={styles.propuesta}>
          <p className={base.eyebrow}>Propuesta temporada 2026 / 2027</p>
          <h2 className={styles.titulo}>Tu marca, toda la temporada en el centro de la ciudad.</h2>
          <div className={styles.fechas}>
            <div>
              <span>Desde</span>
              <strong>{TEMPORADA_DESDE}</strong>
            </div>
            <Icon name="arrow" size={28} className={styles.flecha} />
            <div>
              <span>Hasta</span>
              <strong>{TEMPORADA_HASTA}</strong>
            </div>
          </div>
          <a className={`${base.button} ${base.primary} ${styles.cta}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
            <Icon name="whatsapp" size={20} />
            Consultá disponibilidad
          </a>
        </Aparece>

        <div className={styles.grid}>
          <div className={styles.info}>
            <p className={base.eyebrow}>Ubicación de la pantalla</p>
            <h3 className={base.heading}>En el corazón de Mar del Plata.</h3>
            <ul className={styles.details}>
              <li>
                <Icon name="pin" size={22} className={styles.icon} />
                <span>
                  {PANTALLA.ubicacion}
                  <span className={styles.muted}>{COMPANY.city}</span>
                </span>
              </li>
              <li>
                <Icon name="clock" size={22} className={styles.icon} />
                <span>
                  De {SCREEN.hours}
                  <span className={styles.muted}>Horario de transmisión</span>
                </span>
              </li>
              <li>
                <Icon name="whatsapp" size={22} className={styles.icon} />
                <span>
                  {COMPANY.phone}
                  <span className={styles.muted}>Consultas por WhatsApp</span>
                </span>
              </li>
            </ul>
            <a className={`${base.button} ${base.secondary}`} href={COMPANY.mapsLink} target="_blank" rel="noreferrer">
              Cómo llegar
              <Icon name="arrow" />
            </a>
          </div>
          <iframe
            className={styles.map}
            src={COMPANY.mapsEmbed}
            title={`Mapa: ${PANTALLA.ubicacion}, Mar del Plata`}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  )
}

export default Cierre
