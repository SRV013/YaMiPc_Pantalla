import { useState, type CSSProperties } from 'react'
import { variante, type Variante } from './variantes.ts'
import styles from './Foto.module.css'

type FotoProps = {
  /** Ruta de la foto original. Vacía: se muestra un bloque de color con la etiqueta. */
  src: string
  alt: string
  etiqueta: string
  color: string
  className?: string
  /** Qué versión se muestra: la liviana (por defecto) o el original, para la vista ampliada. */
  calidad?: Exclude<Variante, 'mini'>
  /** false: solo se muestra la miniatura, sin pedir la foto (para las que no están a la vista). */
  cargar?: boolean
}

/**
 * Una foto que carga de a poco: primero se ve la miniatura desenfocada y, cuando llega la foto,
 * aparece con un fundido. Sin foto, se muestra un bloque de color con su nombre.
 */
function Foto({ src, alt, etiqueta, color, className = '', calidad = 'vista', cargar = true }: FotoProps) {
  if (!src) {
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

  // La key reinicia el estado de carga cuando cambia la foto (por ejemplo, de día a noche).
  return <FotoReal key={src} src={src} alt={alt} className={className} calidad={calidad} cargar={cargar} />
}

function FotoReal({ src, alt, className, calidad, cargar }: Required<Omit<FotoProps, 'etiqueta' | 'color'>>) {
  const [lista, setLista] = useState(false)

  return (
    <div className={`${styles.contenedor} ${className}`}>
      <img className={styles.mini} src={variante(src, 'mini')} alt="" aria-hidden="true" draggable={false} />
      {cargar && (
        <img
          className={`${styles.foto} ${lista ? styles.lista : ''}`}
          src={variante(src, calidad)}
          alt={alt}
          decoding="async"
          draggable={false}
          // Si ya estaba en caché, onLoad puede llegar antes de montarse: se revisa al montar.
          ref={(img) => {
            if (img?.complete && img.naturalWidth > 0 && !lista) setLista(true)
          }}
          onLoad={() => setLista(true)}
        />
      )}
    </div>
  )
}

export default Foto
