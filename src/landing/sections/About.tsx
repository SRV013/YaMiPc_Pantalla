import Icon, { type IconName } from '../Icon.tsx'
import base from '../Landing.module.css'
import styles from './About.module.css'

const SERVICES: { icon: IconName; title: string; text: string }[] = [
  {
    icon: 'computer',
    title: 'Tecnología',
    text: 'PC armadas, notebooks, consolas, impresoras y accesorios para el hogar, la oficina y el comercio.',
  },
  {
    icon: 'tools',
    title: 'Servicio técnico',
    text: 'Diagnóstico, reparación y puesta a punto de equipos en nuestro local.',
  },
  {
    icon: 'screen',
    title: 'Pantalla LED',
    text: 'Publicidad en nuestra pantalla sobre la calle, a la vista de todos los que pasan por la esquina.',
  },
]

function About() {
  return (
    <section id="nosotros" className={base.section}>
      <div className={`${base.container} ${styles.grid}`}>
        <div className={styles.intro}>
          <p className={base.eyebrow}>Quiénes somos</p>
          <h2 className={base.heading}>Tecnología, servicio técnico y publicidad, en un mismo lugar.</h2>
          <p className={base.lead}>
            Somos un local de computación en el centro de Mar del Plata. Asesoramos, vendemos y reparamos,
            y desde nuestra fachada ofrecemos un espacio de publicidad para comercios y marcas de la ciudad.
          </p>
        </div>
        <ul className={styles.services}>
          {SERVICES.map((service) => (
            <li key={service.title} className={`${base.card} ${styles.service}`}>
              <Icon name={service.icon} size={28} className={styles.icon} />
              <div>
                <h3 className={styles.title}>{service.title}</h3>
                <p className={styles.text}>{service.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default About
