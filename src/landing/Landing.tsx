import styles from './Landing.module.css'
import Alcance from './sections/Alcance.tsx'
import DiaYNoche from './sections/DiaYNoche.tsx'
import Explorar from './sections/Explorar.tsx'
import Historia from './sections/Historia.tsx'
import Location from './sections/Location.tsx'
import PorQue from './sections/PorQue.tsx'
import Portada from './sections/Portada.tsx'
import Screen from './sections/Screen.tsx'
import Ventajas from './sections/Ventajas.tsx'

/** Home de la pantalla Seis Esquinas, contado con scroll. */
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
        <Historia />
        <DiaYNoche />
        <Alcance />
        <Ventajas />
        <Explorar />
        <PorQue />
        <Screen />
        <Location />
      </main>
    </div>
  )
}

export default Landing
