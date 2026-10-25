import Icon from '../Icon.tsx'
import type { Momento } from '../content.ts'
import styles from './DiaNoche.module.css'

/** Interruptor de día y noche, como los de modo claro y modo oscuro. */
function DiaNoche({ momento, onCambiar }: { momento: Momento; onCambiar: (momento: Momento) => void }) {
  const noche = momento === 'noche'

  return (
    <button
      type="button"
      role="switch"
      aria-checked={noche}
      aria-label="Ver de noche"
      className={`${styles.interruptor} ${noche ? styles.noche : ''}`}
      onClick={() => onCambiar(noche ? 'dia' : 'noche')}
    >
      <Icon name="sun" size={12} className={styles.sol} />
      <Icon name="moon" size={12} className={styles.luna} />
      <span className={styles.perilla} aria-hidden="true">
        <Icon name={noche ? 'moon' : 'sun'} size={12} />
      </span>
    </button>
  )
}

export default DiaNoche
