import type { CSSProperties } from 'react'
import Icon from '../Icon.tsx'
import CarruselTactil from '../CarruselTactil.tsx'
import base from '../Landing.module.css'
import { FOTOS } from '../content.ts'
import { useEsCelular, useProgreso } from '../efectos.ts'
import styles from './DiaYNoche.module.css'

/**
 * De día a noche con el scroll: la misma esquina, desde el mismo lugar, se va oscureciendo
 * hasta que la pantalla queda encendida en la noche. El fondo de la sección acompaña.
 */
// Fotos en fila, alternando: arranca centrada la de día (con la noche a los dos costados) y el
// scroll la desliza hasta centrar la de noche (con el día a los costados).
const FILA = [
  { foto: FOTOS.noche, alt: '' },
  { foto: FOTOS.dia, alt: 'La esquina de día, con el colectivo y la pantalla' },
  { foto: FOTOS.noche, alt: 'La misma esquina de noche, con la pantalla encendida' },
  { foto: FOTOS.dia, alt: '' },
]

function DiaYNocheScroll() {
  // Dos tramos: día y noche, para marcar en qué foto está con los puntos de abajo.
  const { ref, paso } = useProgreso<HTMLElement>(2)

  return (
    <section id="dia-noche" ref={ref} className={styles.seccion} aria-labelledby="dia-noche-titulo">
      <div className={styles.fija}>
        <div className={`${base.container} ${styles.encabezado}`}>
          <p className={base.eyebrow}>14 horas al aire, de 09:00 a 23:00</p>
        </div>

        <div className={styles.marco}>
          {FILA.map((lamina, i) => (
            <img
              key={i}
              className={styles.lamina}
              src={lamina.foto}
              alt={lamina.alt}
              style={{ '--i': i } as CSSProperties}
            />
          ))}

          {/* El texto va sobre la foto del centro. */}
          <div className={styles.fotos}>

            {/* Sobre la foto: de día o de noche, cambiando con el scroll. */}
            <h2 id="dia-noche-titulo" className={styles.titulo}>
              <span className={styles.dia}>
                <span className={styles.icono}>
                  <Icon name="sun" size={22} />
                </span>
                <span className={styles.previo}>En pleno cruce y frente al shopping, a la vista de quienes pasan caminando, en auto o en colectivo.</span>
                <span className={styles.linea}>de día.</span>
              </span>
              <span className={styles.noche}>
                <span className={styles.icono}>
                  <Icon name="moon" size={22} />
                </span>
                <span className={styles.previo}>Cuando cae el sol, es la luz que más se ve en la esquina: tu marca sigue al aire hasta las 23 hs.</span>
                <span className={styles.linea}>de noche.</span>
              </span>
            </h2>
          </div>
        </div>

        {/* Avance: día o noche, con los mismos puntos que el resto de los carruseles. */}
        <div className={styles.puntos} aria-hidden="true">
          <span className={paso === 0 ? styles.puntoActivo : undefined} />
          <span className={paso === 1 ? styles.puntoActivo : undefined} />
        </div>
      </div>
    </section>
  )
}

/** En el celular: día y noche como dos fotos que se deslizan con el dedo, sin depender del scroll. */
function DiaYNocheCelular() {
  const laminas = [
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

  return (
    <section id="dia-noche" className={base.section} aria-label="De día y de noche">
      <div className={`${base.container} ${styles.encabezado}`}>
        <p className={base.eyebrow}>14 horas al aire, de 09:00 a 23:00</p>
      </div>
      <CarruselTactil
        laminas={laminas.map((l) => ({
          foto: l.foto,
          alt: l.alt,
          contenido: (
            <>
              <h3 className={styles.celTitulo}>
                <span className={styles.icono}>
                  <Icon name={l.icono} size={22} />
                </span>
                {l.titulo}
              </h3>
              <p className={styles.celTexto}>{l.texto}</p>
            </>
          ),
        }))}
      />
    </section>
  )
}

function DiaYNoche() {
  return useEsCelular() ? <DiaYNocheCelular /> : <DiaYNocheScroll />
}

export default DiaYNoche
