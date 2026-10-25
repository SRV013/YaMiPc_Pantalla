import Icon, { type IconName } from '../Icon.tsx'
import styles from './Pestanas.module.css'

type Opcion<T extends string> = { valor: T; texto: string; icono?: IconName }

type PestanasProps<T extends string> = {
  etiqueta: string
  opciones: Opcion<T>[]
  valor: T
  onCambiar: (valor: T) => void
}

/** Pestañas sobre una base oscura: la elegida se rellena en claro. */
function Pestanas<T extends string>({ etiqueta, opciones, valor, onCambiar }: PestanasProps<T>) {
  return (
    <div className={styles.pestanas} role="group" aria-label={etiqueta}>
      {opciones.map((opcion) => (
        <button
          key={opcion.valor}
          type="button"
          aria-pressed={opcion.valor === valor}
          onClick={() => onCambiar(opcion.valor)}
        >
          {opcion.icono && <Icon name={opcion.icono} size={14} />}
          {opcion.texto}
        </button>
      ))}
    </div>
  )
}

export default Pestanas
