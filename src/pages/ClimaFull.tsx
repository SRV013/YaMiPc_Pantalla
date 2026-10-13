import {
  CITY,
  compass,
  dateFormat,
  describe,
  timeFormat,
  useNow,
  useWeather,
} from '../weather.ts'
import styles from './ClimaFull.module.css'

const weekdayFormat = new Intl.DateTimeFormat('es-AR', { weekday: 'long' })

// La fecha llega como AAAA-MM-DD; al mediodía se evita el corrimiento de día.
function weekday(date: string) {
  return weekdayFormat.format(new Date(`${date}T12:00`))
}

function ClimaFull() {
  const now = useNow()
  const weather = useWeather()
  const condition = weather && describe(weather.code, weather.isDay)
  const today = weather?.days[0]

  return (
    <main className={styles.screen}>
      <div className={styles.panel}>
        <header className={styles.top}>
          <section>
            <p className={styles.city}>{CITY}</p>
            <p className={styles.time}>{timeFormat.format(now)}</p>
            <p className={styles.date}>{dateFormat.format(now)}</p>
          </section>

          {weather && condition && today ? (
            <>
              <section className={styles.now}>
                <div className={styles.current}>
                  <span className={styles.icon}>{condition.icon}</span>
                  <span className={styles.temperature}>
                    {Math.round(weather.temperature)}°
                  </span>
                </div>
                <p className={styles.condition}>{condition.text}</p>
                <p className={styles.range}>
                  Máx {Math.round(today.max)}° · Mín {Math.round(today.min)}° · ST{' '}
                  {Math.round(weather.feelsLike)}°
                </p>
              </section>

              <ul className={styles.stats}>
                <Stat label="Humedad" value={`${weather.humidity}%`} />
                <Stat
                  label="Viento"
                  value={`${compass(weather.windDirection)} ${Math.round(weather.wind)} km/h`}
                />
                <Stat label="Ráfagas" value={`${Math.round(weather.gusts)} km/h`} />
                <Stat label="Presión" value={`${Math.round(weather.pressure)} hPa`} />
                <Stat label="Nubosidad" value={`${weather.clouds}%`} />
                <Stat label="Lluvia" value={`${today.rainChance}%`} />
                <Stat label="Índice UV" value={`${Math.round(today.uv)}`} />
                <Stat label="Amanecer" value={today.sunrise} />
                <Stat label="Atardecer" value={today.sunset} />
              </ul>
            </>
          ) : (
            <p className={styles.condition}>Cargando clima…</p>
          )}
        </header>

        {weather && (
          <ul className={styles.days}>
            {weather.days.slice(1).map((day) => (
              <li key={day.date} className={styles.day}>
                <span className={styles.dayIcon}>{describe(day.code).icon}</span>
                <span className={styles.dayName}>{weekday(day.date)}</span>
                <span className={styles.value}>
                  {Math.round(day.max)}° <span className={styles.min}>{Math.round(day.min)}°</span>
                </span>
                <span className={styles.label}>Lluvia {day.rainChance}%</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <li className={styles.stat}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </li>
  )
}

export default ClimaFull
