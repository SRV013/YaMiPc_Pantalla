import styles from './Landing.module.css'
import Alcance from './sections/Alcance.tsx'
import DiaYNoche from './sections/DiaYNoche.tsx'
import Explorar from './sections/Explorar.tsx'
import Footer from './sections/Footer.tsx'
import Historia from './sections/Historia.tsx'
import Location from './sections/Location.tsx'
import Nav from './sections/Nav.tsx'
import PorQue from './sections/PorQue.tsx'
import Portada from './sections/Portada.tsx'
import Screen from './sections/Screen.tsx'
import Ventajas from './sections/Ventajas.tsx'

/** Home de la pantalla Seis Esquinas, contado con scroll. */
function Landing() {
  return (
    <div className={styles.landing}>
      <Nav />
      <main>
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
      <Footer />
    </div>
  )
}

export default Landing
