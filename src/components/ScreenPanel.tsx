import type { ReactNode } from 'react'
import styles from './ScreenPanel.module.css'

/** Panel fijo de 1152×384 px pegado a la esquina superior izquierda, sobre fondo negro. */
function ScreenPanel({ className = '', children }: { className?: string; children: ReactNode }) {
  return (
    <main className={styles.screen}>
      <div className={`${styles.panel} ${className}`}>{children}</div>
    </main>
  )
}

export default ScreenPanel
