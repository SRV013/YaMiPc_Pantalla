import styles from './Card.module.css'

type CardProps = {
  icon?: string
  title: string
  description?: string
  /** Con href la tarjeta es un enlace que abre en una pestaña nueva; sin href es un botón. */
  href?: string
  onClick?: () => void
  /** Muestra la tarjeta deshabilitada, con la etiqueta "Próximamente". */
  soon?: boolean
}

function Card({ icon, title, description, href, onClick, soon = false }: CardProps) {
  const content = (
    <>
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.title}>{title}</span>
      {description && <span className={styles.description}>{description}</span>}
      {soon && <span className={styles.soon}>Próximamente</span>}
    </>
  )

  if (href) {
    return (
      <a className={styles.card} href={href} target="_blank" rel="noreferrer" onClick={onClick}>
        {content}
      </a>
    )
  }

  return (
    <button className={styles.card} type="button" onClick={onClick} disabled={soon}>
      {content}
    </button>
  )
}

export default Card
