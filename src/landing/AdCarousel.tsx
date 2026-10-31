import { useEffect, useRef, useState } from 'react'
import { useRuedaLateral } from './efectos.ts'
import styles from './AdCarousel.module.css'

const ROTATION_MS = 5000
// Cuánto hay que arrastrar de costado para pasar de anuncio.
const SWIPE_PX = 40

type Ad = { src: string; alt: string }

/** Anuncios en un marco de pantalla que cambian solos con un fundido lento. */
function AdCarousel({ ads }: { ads: Ad[] }) {
  const [current, setCurrent] = useState(0)
  const drag = useRef<number | null>(null)
  const go = (i: number) => setCurrent((i + ads.length) % ads.length)
  // Con el mouse encima, el gesto de costado del touchpad pasa de anuncio.
  const screen = useRuedaLateral<HTMLDivElement>((dir) => go(current + dir))

  useEffect(() => {
    // Se reinicia al elegir uno a mano, así no cambia enseguida.
    const id = setTimeout(() => setCurrent((i) => (i + 1) % ads.length), ROTATION_MS)
    return () => clearTimeout(id)
  }, [current, ads.length])

  return (
    <div>
      <div className={styles.frame}>
        {/* Se pasa de anuncio arrastrando de costado, con el dedo o el mouse, como en los otros carruseles. */}
        <div
          ref={screen}
          className={styles.screen}
          onPointerDown={(e) => (drag.current = e.clientX)}
          onPointerUp={(e) => {
            if (drag.current === null) return
            const dx = e.clientX - drag.current
            drag.current = null
            if (Math.abs(dx) > SWIPE_PX) go(current + (dx < 0 ? 1 : -1))
          }}
          onPointerCancel={() => (drag.current = null)}
        >
          {ads.map((ad, i) => (
            <img
              key={ad.src}
              src={ad.src}
              alt={ad.alt}
              aria-hidden={i !== current}
              draggable={false}
              className={i === current ? styles.visible : undefined}
            />
          ))}
        </div>
      </div>
      <div className={styles.dots}>
        {ads.map((ad, i) => (
          <button key={ad.src} type="button" aria-label={`Anuncio ${i + 1}`} aria-current={i === current} onClick={() => go(i)}>
            <span />
          </button>
        ))}
      </div>
    </div>
  )
}

export default AdCarousel
