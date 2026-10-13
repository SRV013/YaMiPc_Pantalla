import type { ReactNode } from 'react'
import styles from './CardGrid.module.css'

function CardGrid({ children }: { children: ReactNode }) {
  return <div className={styles.grid}>{children}</div>
}

export default CardGrid
