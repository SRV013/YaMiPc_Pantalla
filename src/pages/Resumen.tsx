import { useEffect, useState } from 'react'
import ScreenPanel from '../components/ScreenPanel.tsx'
import { useSummary, type Holiday } from '../summary.ts'
import { dateFormat, useNow } from '../weather.ts'
import styles from './Resumen.module.css'

const EVENT_ROTATION_MS = 15 * 1000

const monthFormat = new Intl.DateTimeFormat('es-AR', { month: 'long', year: 'numeric' })

// Las fechas llegan como AAAA-MM-DD; al mediodía de Argentina se evita el corrimiento de día.
function toDate(date: string) {
  return new Date(`${date}T12:00:00-03:00`)
}

function countdown({ daysLeft }: Holiday) {
  if (daysLeft === 0) return 'Es hoy'
  if (daysLeft === 1) return 'Falta 1 día'
  return `Faltan ${daysLeft} días`
}

function useRotation(length: number) {
  const [turn, setTurn] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setTurn((current) => current + 1), EVENT_ROTATION_MS)
    return () => clearInterval(id)
  }, [])

  return length > 0 ? turn % length : 0
}

// Fondos disponibles; se elige con ?fondo=nombre en la dirección.
const BACKDROPS = ['atardecer', 'noche', 'formas'] as const

function chosenBackdrop() {
  const requested = new URLSearchParams(window.location.search).get('fondo')
  return BACKDROPS.find((name) => name === requested) ?? BACKDROPS[0]
}

// Olas que se repiten cada 576 px, así el desplazamiento en bucle no muestra el corte.
const WAVE_PATH =
  'M0 30 Q144 0 288 30 T576 30 T864 30 T1152 30 T1440 30 T1728 30 T2016 30 T2304 30 V90 H0 Z'

function Waves({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 2304 90" width="2304" height="90">
      <path d={WAVE_PATH} />
    </svg>
  )
}

function Resumen() {
  const backdrop = chosenBackdrop()
  const now = useNow()
  const summary = useSummary()
  const eventIndex = useRotation(summary?.events.length ?? 0)
  const event = summary?.events[eventIndex]

  return (
    <ScreenPanel className={`${styles.panel} ${styles[backdrop]}`}>
      <div className={styles.backdrop} aria-hidden="true">
        {backdrop === 'atardecer' && (
          <>
            <span className={styles.sun} />
            <Waves className={styles.waveBack} />
            <Waves className={styles.waveFront} />
          </>
        )}
        {backdrop === 'noche' && (
          <>
            <span className={styles.stars} />
            <span className={styles.starsAlt} />
            <span className={styles.moon} />
          </>
        )}
        {backdrop === 'formas' && (
          <>
            <span className={styles.circle} />
            <span className={styles.ring} />
            <span className={styles.stripes} />
            <span className={styles.dots} />
          </>
        )}
      </div>

      <header className={styles.header}>
        <h1 className={styles.title}>Resumen del día</h1>
        <p className={styles.date}>{dateFormat.format(now)}</p>
      </header>

      {summary ? (
        <div className={styles.content}>
          {/* La key reinicia la animación de entrada cada vez que cambia la efeméride. */}
          <section key={eventIndex} className={styles.history}>
            <p className={styles.label}>📜 Un día como hoy</p>
            {event ? (
              <>
                <p className={styles.year}>{event.year}</p>
                <p className={styles.text}>{event.text}</p>
              </>
            ) : (
              <p className={styles.text}>Sin efemérides para hoy.</p>
            )}
          </section>

          <section className={styles.holiday}>
            <p className={styles.label}>🗓️ Próximo feriado</p>
            {summary.holiday ? (
              <>
                <p className={styles.value}>{countdown(summary.holiday)}</p>
                <p className={styles.holidayName}>{summary.holiday.name}</p>
                <p className={styles.detail}>{dateFormat.format(toDate(summary.holiday.date))}</p>
              </>
            ) : (
              <p className={styles.holidayName}>Sin datos</p>
            )}
          </section>

          <section className={styles.card}>
            <p className={styles.label}>📈 Riesgo país</p>
            <p className={styles.value}>{summary.countryRisk.value.toLocaleString('es-AR')}</p>
            <p className={styles.detail}>puntos</p>
          </section>

          <section className={styles.card}>
            <p className={styles.label}>🛒 Inflación mensual</p>
            <p className={styles.value}>
              {summary.inflation.value.toLocaleString('es-AR', { minimumFractionDigits: 1 })}%
            </p>
            <p className={styles.detail}>{monthFormat.format(toDate(summary.inflation.date))}</p>
          </section>
        </div>
      ) : (
        <p className={styles.loading}>Cargando resumen…</p>
      )}
    </ScreenPanel>
  )
}

export default Resumen
