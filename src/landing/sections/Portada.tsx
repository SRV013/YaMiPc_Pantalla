import { useEffect } from 'react'
import Aparece from '../Aparece.tsx'
import base from '../Landing.module.css'
import { COMPANY, FOTOS, TEMPORADA } from '../content.ts'
import { useProgreso } from '../efectos.ts'
import styles from './Portada.module.css'

/**
 * Portada: el mensaje principal y, debajo, la foto de la esquina que crece hasta llenar la
 * pantalla mientras se scrollea, con el remate del título apareciendo encima.
 */
function Portada() {
  // El zoom avanza desde que la foto queda fija en el centro de la pantalla.
  const { ref } = useProgreso<HTMLDivElement>()

  // El color llega con el primer scroll de la página: a los 250 px ya está a todo color.
  useEffect(() => {
    const escena = ref.current
    if (!escena) return
    let id = 0
    const medir = () => {
      id = 0
      escena.style.setProperty('--color', Math.min(1, window.scrollY / 250).toFixed(3))
    }
    const pedir = () => {
      if (!id) id = requestAnimationFrame(medir)
    }
    medir()
    window.addEventListener('scroll', pedir, { passive: true })
    return () => {
      window.removeEventListener('scroll', pedir)
      cancelAnimationFrame(id)
    }
  }, [ref])

  return (
    <section id="inicio" className={styles.portada}>
      <div className={`${base.container} ${styles.texto}`}>
        <Aparece>
          <p className={base.eyebrow}>Publicidad digital de alto impacto · Diagonal Pueyrredón y La Rioja</p>
          <h1 className={styles.titulo}>Conectá tu marca con el corazón de Mar del Plata en seis esquinas.</h1>
        </Aparece>
        <Aparece retraso={150}>
          <p className={styles.bajada}>
            Ubicá tu marca en el punto neurálgico y de mayor convergencia de la ciudad: una intersección abierta
            de 6 esquinas, con visibilidad garantizada y flujo vehicular y peatonal constante.
          </p>
          <p className={styles.temporada}>{TEMPORADA}</p>
          <div className={styles.acciones}>
            <a className={`${base.button} ${base.primary}`} href={COMPANY.whatsapp} target="_blank" rel="noreferrer">
              Anunciá en la pantalla
            </a>
            <a className={`${base.button} ${base.secondary}`} href="#seis-esquinas">
              Conocé la esquina
            </a>
          </div>
        </Aparece>
      </div>

      <div ref={ref} className={styles.escena}>
        <div className={styles.fija}>
          <div className={styles.marco}>
            <img src={FOTOS.portada} alt="La pantalla LED en la esquina de La Rioja y Belgrano" />
            <p className={styles.remate}>
              Seis esquinas.
              <br />
              <span>Una sola pantalla.</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Portada
