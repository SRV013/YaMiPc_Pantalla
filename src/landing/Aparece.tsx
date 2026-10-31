import type { ReactNode } from 'react'
import { useVisible } from './efectos.ts'
import styles from './Aparece.module.css'

/** Aparece subiendo y con un fundido la primera vez que entra en pantalla. */
function Aparece({ children, retraso = 0, className = '' }: { children: ReactNode; retraso?: number; className?: string }) {
  const { ref, visible } = useVisible<HTMLDivElement>()

  return (
    <div
      ref={ref}
      className={`${styles.aparece} ${visible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${retraso}ms` }}
    >
      {children}
    </div>
  )
}

export default Aparece
