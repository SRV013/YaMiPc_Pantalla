import { AQI_LEVELS, aqiLevel, useAir } from '../air.ts'
import ScreenPanel from '../components/ScreenPanel.tsx'
import Stat from '../components/Stat.tsx'
import { CITY, dateFormat, timeFormat, useNow } from '../weather.ts'
import styles from './Aire.module.css'

function micrograms(value: number) {
  return `${value.toLocaleString('es-AR', { maximumFractionDigits: 1 })} µg/m³`
}

// Posición del marcador sobre la barra: cada nivel ocupa un tramo del mismo ancho.
function markerPosition(aqi: number, levelIndex: number) {
  const from = levelIndex === 0 ? 0 : AQI_LEVELS[levelIndex - 1].max
  const to = AQI_LEVELS[levelIndex].max
  const within = Math.min(Math.max((aqi - from) / (to - from), 0), 1)
  return ((levelIndex + within) / AQI_LEVELS.length) * 100
}

function Aire() {
  const now = useNow()
  const air = useAir()
  const levelIndex = air ? aqiLevel(air.aqi) : 0
  const level = AQI_LEVELS[levelIndex]

  return (
    <ScreenPanel className={styles.panel}>
      {air ? (
        <>
          <section className={styles.index}>
            <header className={styles.header}>
              <p className={styles.heading}>Calidad del aire · {CITY}</p>
              <p className={styles.clock}>
                {timeFormat.format(now)} · {dateFormat.format(now)}
              </p>
            </header>
            <div className={styles.reading}>
              <span className={styles.aqi} style={{ color: level.color }}>
                {Math.round(air.aqi)}
              </span>
              <div>
                <p className={styles.level}>{level.name}</p>
                <p className={styles.note}>Índice AQI</p>
              </div>
            </div>

            <div className={styles.scale}>
              {AQI_LEVELS.map((item) => (
                <span key={item.name} style={{ background: item.color }} />
              ))}
              <span
                className={styles.marker}
                style={{ left: `${markerPosition(air.aqi, levelIndex)}%` }}
              />
            </div>

            <p className={styles.advice}>{level.advice}</p>
          </section>

          <ul className={styles.stats}>
            <Stat label="PM2,5" value={micrograms(air.pm25)} />
            <Stat label="PM10" value={micrograms(air.pm10)} />
            <Stat label="Ozono" value={micrograms(air.ozone)} />
            <Stat label="Dióxido de nitrógeno" value={micrograms(air.no2)} />
            <Stat label="Dióxido de azufre" value={micrograms(air.so2)} />
            <Stat label="Monóxido de carbono" value={micrograms(air.co)} />
          </ul>
        </>
      ) : (
        <p className={styles.heading}>Cargando calidad del aire…</p>
      )}
    </ScreenPanel>
  )
}

export default Aire
