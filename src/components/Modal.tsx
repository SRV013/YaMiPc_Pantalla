import { useEffect, useRef, type ReactNode } from 'react'
import styles from './Modal.module.css'

type ModalProps = {
  open: boolean
  title: string
  onClose: () => void
  children: ReactNode
}

function Modal({ open, title, onClose, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const openRef = useRef(open)

  useEffect(() => {
    openRef.current = open
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className={styles.modal}
      // Solo avisa los cierres del usuario (Esc). Si lo cerró el código, por ejemplo para pasar
      // a otro modal, avisar acá cerraría también el modal nuevo.
      onClose={() => {
        if (openRef.current) onClose()
      }}
      // El dialog no tiene padding, así que un clic directo sobre él es un clic en el fondo.
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <div className={styles.body}>
        <header className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button className={styles.close} type="button" aria-label="Cerrar" onClick={onClose}>
            ✕
          </button>
        </header>
        {children}
      </div>
    </dialog>
  )
}

export default Modal
