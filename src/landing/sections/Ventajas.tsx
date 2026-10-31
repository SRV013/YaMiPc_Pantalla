import Aparece from '../Aparece.tsx'
import base from '../Landing.module.css'
import { VENTAJAS } from '../content.ts'
import styles from './Ventajas.module.css'

/** Ventajas estratégicas en tarjetas grandes con foto: al pasar el mouse la foto se acerca. */
function Ventajas() {
  return (
    <section id="ventajas" className={base.section}>
      <div className={base.container}>
        <Aparece>
          <p className={base.eyebrow}>Ventajas estratégicas del punto</p>
          <h2 className={styles.titulo}>Una esquina que se ve desde todos lados.</h2>
        </Aparece>
        <ul className={styles.tarjetas}>
          {VENTAJAS.map((v, i) => (
            <li key={v.titulo}>
              <Aparece retraso={i * 140} className={styles.alto}>
                <article className={styles.tarjeta}>
                  <img src={v.foto} alt="" loading="lazy" />
                  <div className={styles.texto}>
                    <h3>{v.titulo}</h3>
                    <p>{v.texto}</p>
                  </div>
                </article>
              </Aparece>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Ventajas
