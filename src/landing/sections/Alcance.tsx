import Aparece from '../Aparece.tsx'
import Contador from '../Contador.tsx'
import base from '../Landing.module.css'
import { METRICAS } from '../content.ts'
import styles from './Alcance.module.css'

/** Métricas de alcance en números grandes que cuentan desde cero al aparecer. */
function Alcance() {
  return (
    <section id="alcance" className={`${base.section} ${styles.alcance}`}>
      <div className={base.container}>
        <Aparece>
          <p className={base.eyebrow}>Métricas de alcance</p>
          <h2 className={styles.titulo}>Miles de miradas. Todos los días.</h2>
        </Aparece>
        <ul className={styles.cifras}>
          {METRICAS.map((m, i) => (
            <li key={m.unidad}>
              <Aparece retraso={i * 140}>
                <p className={styles.valor}>
                  <Contador hasta={m.numero} prefijo={m.prefijo} sufijo={m.sufijo} />
                </p>
                <p className={styles.unidad}>{m.unidad}</p>
                <p className={styles.detalle}>{m.detalle}</p>
              </Aparece>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Alcance
