import base from '../Landing.module.css'
import { COMPANY, PORTADA } from '../content.ts'
import styles from './Hero.module.css'

function Hero() {
  return (
    <section id="inicio" className={styles.hero}>
      <div className={base.container}>
        <div className={styles.top}>
          <div className={styles.text}>
            <p className={base.eyebrow}>Mar del Plata · La Rioja y Belgrano</p>
            <h1 className={styles.title}>
              Tecnología en Mar del Plata. <span className={styles.soft}>Y una pantalla para tu marca.</span>
            </h1>
            <p className={base.lead}>
              Somos {COMPANY.name}. Desde nuestro local vendemos y reparamos tecnología, y sumamos una
              pantalla LED sobre la calle para que tu negocio también se vea.
            </p>
          </div>
          <div className={styles.actions}>
            <a className={`${base.button} ${base.primary}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Anunciá en la pantalla
            </a>
            <a className={`${base.button} ${base.secondary}`} href="#ubicacion">
              Dónde está
            </a>
          </div>
        </div>
        <div className={styles.rule} />
      </div>

      {/* Tira de fotos de borde a borde: muestra el lugar antes que los anuncios. */}
      <div className={styles.strip}>
        {PORTADA.map((photo) => (
          <img
            key={photo.src}
            src={photo.src}
            alt={photo.alt}
            style={{ flexGrow: photo.grow, objectPosition: photo.position }}
          />
        ))}
      </div>
    </section>
  )
}

export default Hero
