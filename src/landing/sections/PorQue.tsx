import { useRef } from 'react'
import Aparece from '../Aparece.tsx'
import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { POR_QUE } from '../content.ts'
import styles from './PorQue.module.css'

/** Por qué pautar en una pantalla digital: tarjetas grandes que se deslizan de costado. */
function PorQue() {
  const fila = useRef<HTMLUListElement>(null)
  const mover = (sentido: 1 | -1) => {
    const tarjeta = fila.current?.firstElementChild as HTMLElement | null
    fila.current?.scrollBy({ left: sentido * ((tarjeta?.offsetWidth ?? 320) + 16), behavior: 'smooth' })
  }

  return (
    <section id="por-que" className={base.section}>
      <div className={base.container}>
        <Aparece>
          <p className={base.eyebrow}>Pantalla digital Seis Esquinas</p>
          <h2 className={styles.titulo}>¿Por qué pautar en una pantalla digital?</h2>
        </Aparece>
      </div>

      <ul ref={fila} className={styles.fila}>
        {POR_QUE.map((item, i) => (
          <li key={item.titulo} className={styles.tarjeta} data-tono={i}>
            <Icon name={item.icono} size={44} className={styles.icono} />
            <h3>{item.titulo}</h3>
            <p>{item.texto}</p>
          </li>
        ))}
      </ul>

      <div className={`${base.container} ${styles.flechas}`}>
        <button type="button" aria-label="Anterior" onClick={() => mover(-1)}>
          <Icon name="arrow" size={20} className={styles.atras} />
        </button>
        <button type="button" aria-label="Siguiente" onClick={() => mover(1)}>
          <Icon name="arrow" size={20} />
        </button>
      </div>
    </section>
  )
}

export default PorQue
