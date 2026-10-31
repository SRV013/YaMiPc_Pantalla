import Aparece from '../Aparece.tsx'
import base from '../Landing.module.css'
import { VENTAJAS_PUNTO } from '../content.ts'
import { useVisible } from '../efectos.ts'
import styles from './SeisEsquinas.module.css'

/**
 * Las 6 esquinas: un esquema del cruce (La Rioja, Belgrano y Diagonal Pueyrredón) con la pantalla
 * y las líneas de visión hacia cada esquina, y al lado las ventajas estratégicas del punto.
 * Es un esquema ilustrativo, no un plano a escala.
 */
// Centro del cruce y radio donde van los números de cada esquina.
const C = 200
const R = 128
// Cada esquina queda entre dos calles: se ubica en el ángulo medio de su porción.
const ESQUINAS = [-67.5, -22.5, 45, 112.5, 157.5, 225].map((grados, i) => {
  const rad = (grados * Math.PI) / 180
  return { n: i + 1, x: C + R * Math.cos(rad), y: C + R * Math.sin(rad) }
})
// La pantalla está en la esquina 6; las líneas de visión van hacia las otras cinco.
const PANTALLA = ESQUINAS[5]

function SeisEsquinas() {
  const { ref, visible } = useVisible<HTMLDivElement>()

  return (
    <section id="seis-esquinas" className={base.section}>
      <div className={`${base.container} ${styles.grid}`}>
        <div ref={ref} className={`${styles.esquema} ${visible ? styles.visible : ''}`}>
          <svg viewBox="0 0 400 400" role="img" aria-labelledby="esquema-titulo">
            <title id="esquema-titulo">
              Esquema del cruce de La Rioja, Belgrano y Diagonal Pueyrredón: seis esquinas con vista a la pantalla
            </title>

            {/* Calles */}
            <g className={styles.calles}>
              <rect x="176" y="0" width="48" height="400" />
              <rect x="0" y="176" width="400" height="48" />
              <rect x="176" y="-90" width="48" height="580" transform="rotate(45 200 200)" />
            </g>
            <g className={styles.nombres}>
              <text x="200" y="22" textAnchor="middle">LA RIOJA</text>
              <text x="388" y="194" textAnchor="end">BELGRANO</text>
              <text x="96" y="308" textAnchor="middle" transform="rotate(-45 96 304)">
                DIAGONAL PUEYRREDÓN
              </text>
            </g>

            {/* Líneas de visión desde la pantalla */}
            <g className={styles.vision}>
              {ESQUINAS.slice(0, 5).map((e) => (
                <line key={e.n} x1={PANTALLA.x} y1={PANTALLA.y} x2={e.x} y2={e.y} />
              ))}
            </g>

            {/* Esquinas */}
            {ESQUINAS.slice(0, 5).map((e) => (
              <g key={e.n} className={styles.esquina}>
                <circle cx={e.x} cy={e.y} r="17" />
                <text x={e.x} y={e.y + 5} textAnchor="middle">
                  {e.n}
                </text>
              </g>
            ))}

            {/* Pantalla */}
            <g className={styles.pantalla}>
              <circle className={styles.halo} cx={PANTALLA.x} cy={PANTALLA.y} r="34" />
              <rect x={PANTALLA.x - 26} y={PANTALLA.y - 13} width="52" height="26" rx="4" />
              <text x={PANTALLA.x} y={PANTALLA.y + 4} textAnchor="middle">
                LED
              </text>
            </g>
          </svg>
          <p className={styles.nota}>Esquema ilustrativo, no a escala.</p>
        </div>

        <div className={styles.texto}>
          <Aparece>
            <p className={base.eyebrow}>Intersección de 6 esquinas</p>
            <h2 className={styles.titulo}>Tres calles se cruzan. Todas miran a tu marca.</h2>
            <p className={base.lead}>
              La Rioja, Belgrano y Diagonal Pueyrredón se encuentran en un mismo punto: seis esquinas y muchas
              calles de acceso con la pantalla de frente.
            </p>
          </Aparece>
          <ol className={styles.ventajas}>
            {VENTAJAS_PUNTO.map((v, i) => (
              <li key={v.titulo}>
                <Aparece retraso={i * 120}>
                  <span className={styles.numero}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{v.titulo}</h3>
                    <p>{v.texto}</p>
                  </div>
                </Aparece>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

export default SeisEsquinas
