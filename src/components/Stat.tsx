import styles from './Stat.module.css'

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className={styles.stat}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </li>
  )
}

export default Stat
