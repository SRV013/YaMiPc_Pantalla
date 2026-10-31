import CarruselTactil from '../CarruselTactil.tsx'
import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { FOTOS } from '../content.ts'
import styles from './DiaYNoche.module.css'

const LAMINAS = [
  {
    foto: FOTOS.dia,
    alt: 'La esquina de día, con el colectivo y la pantalla',
    icono: 'sun' as const,
    titulo: 'de día.',
    texto: 'En pleno cruce y frente al shopping, a la vista de quienes pasan caminando, en auto o en colectivo.',
  },
  {
    foto: FOTOS.noche,
    alt: 'La misma esquina de noche, con la pantalla encendida',
    icono: 'moon' as const,
    titulo: 'de noche.',
    texto: 'Cuando cae el sol, es la luz que más se ve en la esquina: tu marca sigue al aire hasta las 23 hs.',
  },
]

/** La misma esquina de día y de noche, en un carrusel que se mueve hacia los costados. */
function DiaYNoche() {
  return (
    <section id="dia-noche" className={base.section} aria-label="De día y de noche">
      <div className={`${base.container} ${styles.encabezado}`}>
        <p className={base.eyebrow}>14 horas al aire, de 09:00 a 23:00</p>
      </div>
      <CarruselTactil
        laminas={LAMINAS.map((l) => ({
          foto: l.foto,
          alt: l.alt,
          contenido: (
            <>
              <h3 className={styles.titulo}>
                <span className={styles.icono}>
                  <Icon name={l.icono} size={22} />
                </span>
                {l.titulo}
              </h3>
              <p className={styles.texto}>{l.texto}</p>
            </>
          ),
        }))}
      />
    </section>
  )
}

export default DiaYNoche
