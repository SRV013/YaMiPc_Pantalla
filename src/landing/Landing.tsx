import styles from './Landing.module.css'
import Alcance from './sections/Alcance.tsx'
import Cierre from './sections/Cierre.tsx'
import DiaYNoche from './sections/DiaYNoche.tsx'
import Explorar from './sections/Explorar.tsx'
import Historia from './sections/Historia.tsx'
import PorQue from './sections/PorQue.tsx'
import Portada from './sections/Portada.tsx'
import Screen from './sections/Screen.tsx'
import SeisEsquinas from './sections/SeisEsquinas.tsx'

/**
 * Home de la pantalla Seis Esquinas, contado con scroll y ordenado para el anunciante:
 * la promesa, los números, por qué el punto es único, qué hay alrededor, cómo se ve, y la propuesta.
 */
function Landing() {
  return (
    <div className={styles.landing}>
      {/* Fondo de luces de neón que se mueven despacio, como el brillo de la pantalla en la calle. */}
      <div className={styles.fondo} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <main className={styles.contenido}>
        <Portada />
        <Alcance />
        <SeisEsquinas />
        <Historia />
        <DiaYNoche />
        <PorQue />
        <Screen />
        <Explorar />
        <Cierre />
      </main>
    </div>
  )
}

export default Landing
