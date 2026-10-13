import Clock from '../components/Clock.tsx'
import ScreenPanel from '../components/ScreenPanel.tsx'
import { describe, useWeather } from '../weather.ts'
import styles from './ClimaSmall.module.css'

function ClimaSmall() {
  const weather = useWeather()
  const condition = weather && describe(weather.code, weather.isDay)
  const today = weather?.days[0]

  return (
    <ScreenPanel className={styles.panel}>
      <Clock size={168} />

      {weather && condition && today ? (
        <section className={styles.weather}>
          <div className={styles.current}>
            <span className={styles.icon}>{condition.icon}</span>
            <span className={styles.temperature}>{Math.round(weather.temperature)}°</span>
          </div>
          <p className={styles.condition}>{condition.text}</p>
          <p className={styles.details}>
            <span>Máx {Math.round(today.max)}°</span>
            <span>Mín {Math.round(today.min)}°</span>
            <span>ST {Math.round(weather.feelsLike)}°</span>
          </p>
          <p className={styles.details}>
            <span>Humedad {weather.humidity}%</span>
            <span>Viento {Math.round(weather.wind)} km/h</span>
          </p>
        </section>
      ) : (
        <section className={styles.weather}>
          <p className={styles.condition}>Cargando clima…</p>
        </section>
      )}
    </ScreenPanel>
  )
}

export default ClimaSmall
