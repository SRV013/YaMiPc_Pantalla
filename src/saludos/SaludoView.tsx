import type { CSSProperties } from 'react'
import { TIPOS, type Saludo } from './saludos.ts'
import styles from './SaludoView.module.css'

// Papel picado: posición, demora y duración fijas para que el dibujo sea siempre el mismo.
const PAPELITOS = Array.from({ length: 22 }, (_, i) => ({
  left: `${(i * 47) % 100}%`,
  delay: `${-((i * 1.7) % 12)}s`,
  duration: `${10 + ((i * 3) % 7)}s`,
  tone: i % 3,
}))

// Cuanto más largo el nombre, más chica la letra, para que siempre entre en una línea.
function tamañoDelNombre(nombre: string) {
  if (nombre.length <= 8) return 128
  if (nombre.length <= 14) return 100
  if (nombre.length <= 20) return 78
  return 62
}

/** Un saludo dibujado en el tamaño de la pantalla, 1152 × 384. */
function SaludoView({ saludo }: { saludo: Saludo }) {
  const tipo = TIPOS[saludo.tipo]

  return (
    <div className={styles.saludo} style={{ '--acento': tipo.color } as CSSProperties}>
      <div className={styles.papelitos} aria-hidden="true">
        {PAPELITOS.map((papel, i) => (
          <span
            key={i}
            className={styles[`tono${papel.tone}`]}
            style={{ left: papel.left, animationDelay: papel.delay, animationDuration: papel.duration }}
          />
        ))}
      </div>

      <svg className={styles.icono} viewBox="0 0 24 24" aria-hidden="true">
        <path d={tipo.icono} />
      </svg>

      <div className={styles.texto}>
        <p className={styles.frase}>{tipo.frase}</p>
        <p className={styles.para} style={{ fontSize: tamañoDelNombre(saludo.para) }}>
          {saludo.para}
        </p>
        {saludo.mensaje && <p className={styles.mensaje}>{saludo.mensaje}</p>}
        {saludo.de && <p className={styles.de}>De parte de {saludo.de}</p>}
      </div>
    </div>
  )
}

export default SaludoView
