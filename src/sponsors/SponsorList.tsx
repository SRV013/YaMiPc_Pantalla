import { money } from '../format.ts'
import type { Sponsor } from './sponsors.ts'
import styles from './SponsorList.module.css'

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short', year: 'numeric' })

// La fecha llega como AAAA-MM-DD; al mediodía se evita el corrimiento de día.
function formatDate(date: string) {
  return dateFormat.format(new Date(`${date}T12:00`))
}

function SponsorList({ sponsors }: { sponsors: Sponsor[] }) {
  const active = sponsors.filter((sponsor) => sponsor.active)
  const monthly = active.reduce((sum, sponsor) => sum + sponsor.monthly, 0)

  return (
    <section>
      <ul className={styles.summary}>
        <li>
          <span className={styles.summaryValue}>{sponsors.length}</span> sponsors
        </li>
        <li>
          <span className={styles.summaryValue}>{active.length}</span> activos
        </li>
        <li>
          <span className={styles.summaryValue}>{money.format(monthly)}</span> por mes
        </li>
      </ul>

      <ul className={styles.items}>
        {sponsors.map((sponsor) => (
          <li key={sponsor.id} className={`${styles.item} ${sponsor.active ? '' : styles.inactive}`}>
            <span className={styles.avatar} aria-hidden="true">
              {sponsor.name.charAt(0)}
            </span>
            <span className={styles.info}>
              <span className={styles.name}>{sponsor.name}</span>
              <span className={styles.detail}>
                {sponsor.category} · {sponsor.contact}
              </span>
            </span>
            <span className={styles.terms}>
              <span className={`${styles.plan} ${styles[`plan${sponsor.plan}`] ?? ''}`}>
                {sponsor.plan}
              </span>
              <span className={styles.amount}>{money.format(sponsor.monthly)}/mes</span>
              <span className={styles.detail}>
                {sponsor.active ? 'Hasta' : 'Venció'} {formatDate(sponsor.until)}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SponsorList
