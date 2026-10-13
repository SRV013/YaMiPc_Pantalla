import Clock from '../components/Clock.tsx'
import ScreenPanel from '../components/ScreenPanel.tsx'
import Stat from '../components/Stat.tsx'
import { useMarine, type TideEvent, type TidePoint } from '../marine.ts'
import { compass } from '../weather.ts'
import styles from './Marea.module.css'

const KNOTS_PER_KMH = 0.539957

function decimal(value: number) {
  return value.toLocaleString('es-AR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
}

function meters(value: number) {
  return `${value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} m`
}

const CHART_WIDTH = 486
const CHART_HEIGHT = 132
const CHART_MARGIN = 24

function TideChart({ tide, events }: { tide: TidePoint[]; events: TideEvent[] }) {
  const levels = tide.map((point) => point.level)
  const min = Math.min(...levels)
  const max = Math.max(...levels)
  const x = (index: number) => (index / (tide.length - 1)) * CHART_WIDTH
  const y = (level: number) =>
    CHART_HEIGHT -
    CHART_MARGIN -
    ((level - min) / (max - min || 1)) * (CHART_HEIGHT - CHART_MARGIN * 2)
  const line = tide.map((point, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(point.level)}`).join(' ')

  return (
    <svg
      className={styles.chart}
      viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}
      role="img"
      aria-label="Curva de marea de las próximas horas"
    >
      <path className={styles.area} d={`${line} L${CHART_WIDTH},${CHART_HEIGHT} L0,${CHART_HEIGHT} Z`} />
      <path className={styles.line} d={line} />
      <circle className={styles.nowDot} cx={x(0) + 5} cy={y(tide[0].level)} r="5" />
      {events.map((event) => (
        <g key={event.index}>
          <circle className={styles.dot} cx={x(event.index)} cy={y(event.level)} r="4" />
          <text
            className={styles.tick}
            // Se aleja del borde para que la hora no quede cortada.
            x={Math.min(Math.max(x(event.index), 20), CHART_WIDTH - 20)}
            y={y(event.level) + (event.type === 'Pleamar' ? -9 : 19)}
            textAnchor="middle"
          >
            {event.time}
          </text>
        </g>
      ))}
    </svg>
  )
}

function Marea() {
  const marine = useMarine()

  return (
    <ScreenPanel className={styles.panel}>
      <div className={styles.side}>
        <Clock size={84} />

        {marine && (
          <section className={styles.wind}>
            <svg
              className={styles.arrow}
              viewBox="0 0 24 24"
              // La dirección es de dónde viene el viento; la flecha apunta hacia dónde sopla.
              style={{ transform: `rotate(${marine.windDirection + 180}deg)` }}
              aria-hidden="true"
            >
              <path d="M12 2 L19 20 L12 16 L5 20 Z" />
            </svg>
            <div>
              <p className={styles.heading}>Viento {compass(marine.windDirection)}</p>
              <p className={styles.windSpeed}>
                {Math.round(marine.wind)} <span className={styles.unit}>km/h</span>
              </p>
              <p className={styles.note}>
                {Math.round(marine.wind * KNOTS_PER_KMH)} nudos · ráfagas {Math.round(marine.gusts)} km/h
              </p>
            </div>
          </section>
        )}
      </div>

      {marine ? (
        <>
          <section className={styles.tide}>
            <header className={styles.tideHeader}>
              <p className={styles.heading}>Marea</p>
              <p className={styles.tideState}>
                {marine.tideRising ? '▲ Subiendo' : '▼ Bajando'} · {meters(marine.tide[0].level)}
              </p>
            </header>

            {/* El gráfico muestra 24 horas; la serie trae un poco más para detectar la cuarta marea. */}
            <TideChart
              tide={marine.tide.slice(0, 97)}
              events={marine.tideEvents.filter((event) => event.index < 96)}
            />

            <ul className={styles.events}>
              {marine.tideEvents.slice(0, 4).map((event) => (
                <li key={event.index} className={styles.event}>
                  <span className={styles.eventType}>{event.type}</span>
                  <span className={styles.eventTime}>{event.time}</span>
                  <span className={styles.eventLevel}>{meters(event.level)}</span>
                </li>
              ))}
            </ul>
          </section>

          <ul className={styles.stats}>
            <Stat label="Olas" value={`${decimal(marine.waveHeight)} m`} />
            <Stat label="Período" value={`${Math.round(marine.wavePeriod)} s`} />
            <Stat label="Olas desde" value={compass(marine.waveDirection)} />
            <Stat
              label="Mar de fondo"
              value={`${decimal(marine.swellHeight)} m · ${Math.round(marine.swellPeriod)} s`}
            />
            <Stat label="Agua" value={`${decimal(marine.waterTemperature)}°`} />
            <Stat label="Aire" value={`${decimal(marine.airTemperature)}°`} />
            <Stat
              label="Corriente"
              value={`${decimal(marine.currentSpeed)} km/h ${compass(marine.currentDirection)}`}
            />
            <Stat label="Presión" value={`${Math.round(marine.pressure)} hPa`} />
          </ul>
        </>
      ) : (
        <p className={styles.heading}>Cargando datos del mar…</p>
      )}
    </ScreenPanel>
  )
}

export default Marea
