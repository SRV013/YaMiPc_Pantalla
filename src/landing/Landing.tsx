import styles from './Landing.module.css'
import Footer from './sections/Footer.tsx'
import Hero from './sections/Hero.tsx'
import Location from './sections/Location.tsx'
import Nav from './sections/Nav.tsx'
import Screen from './sections/Screen.tsx'
import Verano from './sections/Verano.tsx'

/** Home institucional de YaMiPc y su pantalla LED. */
function Landing() {
  return (
    <div className={styles.landing}>
      <Nav />
      <main>
        <Hero />
        <Verano />
        <Screen />
        <Location />
      </main>
      <Footer />
    </div>
  )
}

export default Landing
