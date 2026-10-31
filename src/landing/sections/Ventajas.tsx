import type { CSSProperties } from 'react'
import base from '../Landing.module.css'
import { VENTAJAS } from '../content.ts'
import { useProgreso } from '../efectos.ts'
import styles from './Ventajas.module.css'

/**
 * Ventajas estratégicas en paneles que siguen el scroll: los tres lado a lado, el activo se abre
 * grande con su texto y los otros quedan como franjas angostas con su número.
 */
function Ventajas() {
  const { ref, paso } = useProgreso<HTMLElement>(VENTAJAS.length)

  return (
    <section id="ventajas" ref={ref} className={styles.ventajas} style={{ height: `${VENTAJAS.length * 80 + 60}svh` }}>
      <div className={styles.fija}>
        <div className={`${base.container} ${styles.encabezado}`}>
          <p className={base.eyebrow}>Ventajas estratégicas del punto</p>
          <h2 className={styles.titulo}>Una esquina que se ve desde todos lados.</h2>
        </div>

        <div className={styles.contenedor}>
          <ol className={styles.paneles}>
            {VENTAJAS.map((v, i) => (
              <li key={v.titulo} className={styles.panel} style={{ '--i': i } as CSSProperties} aria-current={i === paso}>
                <img src={v.foto} alt="" loading="lazy" />
                <span className={styles.numero}>{String(i + 1).padStart(2, '0')}</span>
                <div className={styles.texto}>
                  <h3>{v.titulo}</h3>
                  <p>{v.texto}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default Ventajas
