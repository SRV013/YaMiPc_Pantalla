import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { COMPANY, SCREEN } from '../content.ts'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={base.container}>
        <div className={styles.columns}>
          <div className={styles.brand}>
            <img src="/yamipc-dark.svg" alt={COMPANY.name} width={104} />
            <p className={styles.muted}>Tecnología, servicio técnico y publicidad en el centro de Mar del Plata.</p>
            <a className={styles.invite} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              ¿Querés anunciar en la pantalla? Escribinos
              <Icon name="arrow" size={16} />
            </a>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Visitanos</h3>
            <span>{COMPANY.address}</span>
            <span className={styles.muted}>{COMPANY.city}</span>
            <span className={styles.muted}>{COMPANY.hours}</span>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>Contacto</h3>
            <a className={styles.contact} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              <Icon name="whatsapp" />
              {COMPANY.phone}
            </a>
            <a className={`${styles.contact} ${styles.muted}`} href={COMPANY.web} target="_blank" rel="noreferrer">
              <Icon name="globe" />
              {COMPANY.webLabel}
            </a>
            <span className={`${styles.contact} ${styles.muted}`}>
              <Icon name="instagram" />
              {COMPANY.social}
            </span>
          </div>

          <div className={styles.column}>
            <h3 className={styles.title}>La pantalla</h3>
            <span>Encendida de {SCREEN.hours}</span>
            <span className={styles.muted}>{SCREEN.size} sobre la vereda</span>
            <span className={styles.muted}>Spots de {SCREEN.spot}</span>
          </div>
        </div>

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {YEAR} {COMPANY.name}
          </span>
          <nav aria-label="Redes" className={styles.social}>
            <a href={COMPANY.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
              <Icon name="instagram" />
            </a>
            <a href={COMPANY.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
              <Icon name="facebook" />
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
