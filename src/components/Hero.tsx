import styles from './Hero.module.css'

type HeroProps = {
  eyebrow?: string
  title: string
  subtitle?: string
}

function Hero({ eyebrow, title, subtitle }: HeroProps) {
  return (
    <header className={styles.hero}>
      {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
      <h1 className={styles.title}>{title}</h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </header>
  )
}

export default Hero
