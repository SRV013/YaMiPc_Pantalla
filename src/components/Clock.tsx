import { CITY, dateFormat, timeFormat, useNow } from '../weather.ts'
import styles from './Clock.module.css'

/** Ciudad, hora y día. `size` es el alto en px de la hora; el resto escala en proporción. */
function Clock({ size }: { size: number }) {
  const now = useNow()

  return (
    <section className={styles.clock} style={{ fontSize: size }}>
      <p className={styles.city}>{CITY}</p>
      <p className={styles.time}>{timeFormat.format(now)}</p>
      <p className={styles.date}>{dateFormat.format(now)}</p>
    </section>
  )
}

export default Clock
