import { useEffect, useState } from 'react'
import styles from './AdCarousel.module.css'

const ROTATION_MS = 5000

type Ad = { src: string; alt: string }

/** Anuncios en un marco de pantalla que cambian solos con un fundido lento. */
function AdCarousel({ ads }: { ads: Ad[] }) {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    // Se reinicia al elegir uno a mano, así no cambia enseguida.
    const id = setTimeout(() => setCurrent((i) => (i + 1) % ads.length), ROTATION_MS)
    return () => clearTimeout(id)
  }, [current, ads.length])

  return (
    <div>
      <div className={styles.frame}>
        <div className={styles.screen}>
          {ads.map((ad, i) => (
            <img
              key={ad.src}
              src={ad.src}
              alt={ad.alt}
              aria-hidden={i !== current}
              className={i === current ? styles.visible : undefined}
            />
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {ads.map((ad, i) => (
          <button
            key={ad.src}
            type="button"
            aria-label={`Anuncio ${i + 1}`}
            aria-pressed={i === current}
            onClick={() => setCurrent(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdCarousel
