import { useEffect, useRef, type ReactNode } from 'react'
import Icon from '../Icon.tsx'
import styles from './Visor.module.css'

type VisorProps = {
  abierto: boolean
  titulo: string
  onCerrar: () => void
  children: ReactNode
}

/** Muestra un contenido a pantalla completa. Se cierra con la ✕, con Esc o tocando el fondo. */
function Visor({ abierto, titulo, onCerrar, children }: VisorProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const abiertoRef = useRef(abierto)

  useEffect(() => {
    abiertoRef.current = abierto
    const dialog = ref.current
    if (!dialog) return
    if (abierto && !dialog.open) dialog.showModal()
    if (!abierto && dialog.open) dialog.close()
  }, [abierto])

  return (
    <dialog
      ref={ref}
      className={styles.visor}
      aria-label={titulo}
      onClose={() => {
        if (abiertoRef.current) onCerrar()
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onCerrar()
      }}
    >
      {abierto && <div className={styles.contenido}>{children}</div>}
      <button type="button" className={styles.cerrar} aria-label="Cerrar" onClick={onCerrar}>
        <Icon name="close" size={22} />
      </button>
    </dialog>
  )
}

export default Visor
