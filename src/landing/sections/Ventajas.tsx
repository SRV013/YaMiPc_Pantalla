import Tarjetas from '../Tarjetas.tsx'
import base from '../Landing.module.css'
import { ATRACCION, METRICAS, POR_QUE, VENTAJAS } from '../content.ts'
import styles from './Ventajas.module.css'

/** Puntos de atracción, ventajas, métricas y por qué pautar: el pedido de marketing, en ese orden. */
function Ventajas() {
  return (
    <>
      <section id="ventajas" className={base.section}>
        <div className={base.container}>
          <p className={base.eyebrow}>Puntos de atracción inmediata</p>
          <h2 className={base.heading}>Todo pasa frente a la pantalla.</h2>
          <Tarjetas items={ATRACCION} />

          <div className={styles.bloque}>
            <p className={base.eyebrow}>Ventajas estratégicas del punto</p>
            <h2 className={base.heading}>Una esquina que se ve desde todos lados.</h2>
            <Tarjetas items={VENTAJAS} />
          </div>
        </div>
      </section>

      <section id="metricas" className={`${base.section} ${styles.metricas}`}>
        <div className={base.container}>
          <p className={base.eyebrow}>Métricas de alcance</p>
          <h2 className={base.heading}>Miles de miradas, todos los días.</h2>
          <ul className={styles.cifras}>
            {METRICAS.map((m) => (
              <li key={m.unidad}>
                <p className={styles.valor}>{m.valor}</p>
                <p className={styles.unidad}>{m.unidad}</p>
                <p className={styles.detalle}>{m.detalle}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="por-que" className={base.section}>
        <div className={base.container}>
          <p className={base.eyebrow}>Pantalla digital Seis Esquinas</p>
          <h2 className={base.heading}>¿Por qué pautar en una pantalla digital?</h2>
          <Tarjetas items={POR_QUE} />
        </div>
      </section>
    </>
  )
}

export default Ventajas
