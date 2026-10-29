import Icon, { type IconName } from './Icon.tsx'
import base from './Landing.module.css'
import styles from './Tarjetas.module.css'

type Tarjeta = { icono: IconName; titulo: string; texto: string }

/** Grilla de tarjetas con ícono, título y texto, para las secciones de ventajas del home. */
function Tarjetas({ items }: { items: readonly Tarjeta[] }) {
  return (
    <ul className={styles.grilla}>
      {items.map((item) => (
        <li key={item.titulo} className={`${base.card} ${styles.tarjeta}`}>
          <Icon name={item.icono} size={26} className={styles.icono} />
          <h3 className={styles.titulo}>{item.titulo}</h3>
          <p className={styles.texto}>{item.texto}</p>
        </li>
      ))}
    </ul>
  )
}

export default Tarjetas
