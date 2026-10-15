import type { ReactNode } from 'react'
import ScreenPanel from '../components/ScreenPanel.tsx'
import styles from './YaMiPc.module.css'

// Íconos de trazo simple, dibujados en una grilla de 24×24.
const ICONS = {
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M3.5 20.5l1.2-4.1a8.6 8.6 0 1 1 3.2 3z" />
      <path d="M9.2 8.2c.3-.6.9-.6 1.2 0l.6 1.3c.1.3 0 .6-.2.8l-.5.5c.6 1.2 1.6 2.2 2.8 2.8l.5-.5c.2-.2.5-.3.8-.2l1.3.6c.6.3.6.9 0 1.2-.8.5-1.8.6-2.7.2a8 8 0 0 1-4-4c-.4-.9-.3-1.9.2-2.7z" />
    </>
  ),
}

type InfoProps = {
  icon: keyof typeof ICONS
  small?: boolean
  children: ReactNode
}

function Info({ icon, small = false, children }: InfoProps) {
  return (
    <li className={`${styles.info} ${small ? styles.small : ''}`}>
      <svg className={styles.icon} viewBox="0 0 24 24" aria-hidden="true">
        {ICONS[icon]}
      </svg>
      <span className={styles.value}>{children}</span>
    </li>
  )
}

function YaMiPc() {
  return (
    <ScreenPanel className={styles.panel}>
      <div className={styles.backdrop} aria-hidden="true">
        <span />
        <span />
      </div>

      <div className={styles.brand}>
        <span className={styles.glow} aria-hidden="true" />
        <img className={styles.logo} src="/yamipc-dark.svg" alt="YaMiPc Computación" />
        {/* Brillo que cruza el logo; la máscara lo limita a la forma del logo. */}
        <span className={styles.shine} aria-hidden="true" />
      </div>

      <ul className={styles.list}>
        <Info icon="clock">
          <span className={styles.hours}>10:00 - 18:00</span>
          <span className={styles.days}>Lunes a sábado</span>
        </Info>
        <Info icon="whatsapp">223 616-9545</Info>
        <Info icon="globe" small>
          www.yamipc.com
        </Info>
      </ul>
    </ScreenPanel>
  )
}

export default YaMiPc
