import { timeWithSecondsFormat, useNow } from '../weather.ts'
import styles from './AnalogClock.module.css'

const HOURS = Array.from({ length: 12 }, (_, i) => i)

/** Reloj de agujas con la hora de la ciudad. `size` es el diámetro en px. */
function AnalogClock({ size }: { size: number }) {
  const now = useNow()
  // Se parte la hora ya formateada para respetar la zona horaria de la ciudad.
  const [hours, minutes, seconds] = timeWithSecondsFormat.format(now).split(':').map(Number)
  const secondAngle = seconds * 6
  const minuteAngle = minutes * 6 + seconds * 0.1
  const hourAngle = (hours % 12) * 30 + minutes * 0.5

  return (
    <svg className={styles.clock} width={size} height={size} viewBox="-100 -100 200 200" aria-hidden="true">
      <circle className={styles.face} r="96" />
      {HOURS.map((hour) => (
        <line
          key={hour}
          className={hour % 3 === 0 ? styles.mainTick : styles.tick}
          y1="-88"
          y2={hour % 3 === 0 ? -72 : -78}
          transform={`rotate(${hour * 30})`}
        />
      ))}
      <line className={styles.hourHand} y1="8" y2="-50" transform={`rotate(${hourAngle})`} />
      <line className={styles.minuteHand} y1="10" y2="-76" transform={`rotate(${minuteAngle})`} />
      <line className={styles.secondHand} y1="16" y2="-82" transform={`rotate(${secondAngle})`} />
      <circle className={styles.pin} r="5" />
    </svg>
  )
}

export default AnalogClock
