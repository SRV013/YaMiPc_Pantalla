import type { CSSProperties } from 'react'
import styles from './Foto.module.css'

type FotoProps = {
  /** Ruta de la foto. Vacía: se muestra un bloque de color con la etiqueta. */
  src: string
  alt: string
  etiqueta: string
  color: string
  className?: string
}

/** Una foto, o su marcador de color mientras la foto real no está cargada. */
function Foto({ src, alt, etiqueta, color, className = '' }: FotoProps) {
  if (src) {
    return <img className={`${styles.foto} ${className}`} src={src} alt={alt} draggable={false} />
  }

  return (
    <div
      className={`${styles.marcador} ${className}`}
      style={{ '--color': color } as CSSProperties}
      role="img"
      aria-label={`${alt} (foto pendiente)`}
    >
      <span>{etiqueta}</span>
    </div>
  )
}

export default Foto
