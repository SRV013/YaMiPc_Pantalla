import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { COMPANY } from '../content.ts'
import styles from './Location.module.css'

function Location() {
  return (
    <section id="ubicacion" className={base.section}>
      <div className={`${base.container} ${styles.grid}`}>
        <div className={styles.info}>
          <p className={base.eyebrow}>Ubicación</p>
          <h2 className={base.heading}>En el centro de la ciudad.</h2>
          <ul className={styles.details}>
            <li>
              <Icon name="pin" size={22} className={styles.icon} />
              <span>
                {COMPANY.address}
                <span className={styles.muted}>{COMPANY.city}</span>
              </span>
            </li>
            <li>
              <Icon name="clock" size={22} className={styles.icon} />
              <span>
                {COMPANY.hours}
                <span className={styles.muted}>Horario del local</span>
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
          title={`Mapa: ${COMPANY.address}, Mar del Plata`}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  )
}

export default Location
