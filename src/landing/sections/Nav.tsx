import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { COMPANY } from '../content.ts'
import styles from './Nav.module.css'

/** Barra superior del panel administrativo: logo con la etiqueta Admin y el botón para salir. */
function Nav() {
  return (
    <header className={styles.nav}>
      <div className={`${base.container} ${styles.inner}`}>
        <div className={styles.brand}>
          <a href="/panel" aria-label="Panel">
            <img src="/yamipc-dark.svg" alt={COMPANY.name} width={96} />
          </a>
          <span className={styles.badge}>Admin</span>
        </div>
        <a className={styles.cta} href="/">
          <Icon name="logout" />
          Salir
        </a>
      </div>
    </header>
  )
}

export default Nav
