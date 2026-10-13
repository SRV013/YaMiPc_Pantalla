import AnalogClock from '../components/AnalogClock.tsx'
import Clock from '../components/Clock.tsx'
import ScreenPanel from '../components/ScreenPanel.tsx'
import styles from './Reloj.module.css'

function Reloj() {
  return (
    <ScreenPanel className={styles.panel}>
      <AnalogClock size={320} />
      <div className={styles.digital}>
        <Clock size={130} seconds />
      </div>
    </ScreenPanel>
  )
}

export default Reloj
