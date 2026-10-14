import type { ReactNode } from 'react'
import styles from './Field.module.css'

/** Etiqueta con su control de formulario (input, select, etc.) debajo. */
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className={styles.field}>
      <span className={styles.label}>{label}</span>
      {children}
    </label>
  )
}

export default Field
