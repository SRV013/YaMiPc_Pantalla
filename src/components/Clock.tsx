import { CITY, dateFormat, timeFormat, timeWithSecondsFormat, useNow } from '../weather.ts'
import styles from './Clock.module.css'

type ClockProps = {
  /** Alto en px de la hora; el resto escala en proporción. */
  size: number
  seconds?: boolean
}

/** Ciudad, hora y día. */
function Clock({ size, seconds = false }: ClockProps) {
  const now = useNow()
  const format = seconds ? timeWithSecondsFormat : timeFormat

  return (
    <section style={{ fontSize: size }}>
      <p className={styles.city}>{CITY}</p>
      <p className={styles.time}>{format.format(now)}</p>
      <p className={styles.date}>{dateFormat.format(now)}</p>
    </section>
  )
}

export default Clock
