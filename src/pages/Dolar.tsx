import Clock from '../components/Clock.tsx'
import ScreenPanel from '../components/ScreenPanel.tsx'
import { useDollar } from '../dollar.ts'
import { timeFormat } from '../weather.ts'
import styles from './Dolar.module.css'

function pesos(value: number) {
  return `$${value.toLocaleString('es-AR', { maximumFractionDigits: 0 })}`
}

// Diferencia porcentual del precio de venta contra el dólar oficial.
function gap(sell: number, official: number) {
  const percent = (sell / official - 1) * 100
  const text = Math.abs(percent).toLocaleString('es-AR', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  })
  return `${percent < 0 ? '−' : '+'}${text}%`
}

// Las cotizaciones principales van grandes; el resto, en una fila más chica.
const MAIN_RATES = ['Oficial', 'Blue']

function Dolar() {
  const dollar = useDollar()
  const official = dollar?.rates.find((rate) => rate.name === 'Oficial')

  return (
    <ScreenPanel className={styles.panel}>
      <div className={styles.side}>
        <header>
          <p className={styles.heading}>
            <span className={styles.badge}>$</span> Cotizaciones
          </p>
          <p className={styles.subtitle}>Dólar hoy en pesos argentinos</p>
        </header>

        <Clock size={70} dateFirst />

        {dollar && (
          <p className={styles.note}>
            Actualizado {timeFormat.format(dollar.updatedAt)} · dolarapi.com
            {official && (
              <>
                <br />% = brecha con el oficial
              </>
            )}
          </p>
        )}
      </div>

      {dollar ? (
        <div className={styles.rates}>
          {[true, false].map((main) => (
            <ul key={String(main)} className={main ? styles.main : styles.others}>
              {dollar.rates
                .filter((rate) => MAIN_RATES.includes(rate.name) === main)
                .map((rate) => (
                  <li key={rate.name} className={styles.rate}>
                    <span className={styles.name}>{rate.name}</span>
                    {official && rate !== official && (
                      <span className={styles.gap}>{gap(rate.sell, official.sell)}</span>
                    )}
                    <span className={styles.sell}>{pesos(rate.sell)}</span>
                    <span className={styles.buy}>Compra {pesos(rate.buy)}</span>
                  </li>
                ))}
            </ul>
          ))}
        </div>
      ) : (
        <p className={styles.loading}>Cargando cotizaciones…</p>
      )}
    </ScreenPanel>
  )
}

export default Dolar
