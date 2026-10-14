import { CITY, dateFormat, timeFormat, timeWithSecondsFormat, useNow } from '../weather.ts'
import styles from './Clock.module.css'

type ClockProps = {
  /** Alto en px de la hora; el resto escala en proporción. */
  size: number
  seconds?: boolean
  /** Muestra la fecha arriba de la hora en lugar de debajo. */
  dateFirst?: boolean
}

/** Ciudad, hora y día. */
function Clock({ size, seconds = false, dateFirst = false }: ClockProps) {
  const now = useNow()
  const format = seconds ? timeWithSecondsFormat : timeFormat
  const date = <p className={styles.date}>{dateFormat.format(now)}</p>

  return (
    <section className={dateFirst ? styles.dateFirst : undefined} style={{ fontSize: size }}>
      <p className={styles.city}>{CITY}</p>
      {dateFirst && date}
      <p className={styles.time}>{format.format(now)}</p>
      {!dateFirst && date}
    </section>
  )
}

export default Clock
