import Icon from '../Icon.tsx'
import base from '../Landing.module.css'
import { FOTOS } from '../content.ts'
import { useProgreso } from '../efectos.ts'
import styles from './DiaYNoche.module.css'

/**
 * De día a noche con el scroll: la misma esquina, desde el mismo lugar, se va oscureciendo
 * hasta que la pantalla queda encendida en la noche. El fondo de la sección acompaña.
 */
function DiaYNoche() {
  const { ref } = useProgreso<HTMLElement>()

  return (
    <section id="dia-noche" ref={ref} className={styles.seccion} aria-labelledby="dia-noche-titulo">
      <div className={styles.fija}>
        <div className={`${base.container} ${styles.encabezado}`}>
          <p className={base.eyebrow}>14 horas al aire, de 09:00 a 23:00</p>
        </div>

        <div className={styles.marco}>
          <div className={styles.fotos}>
            <img src={FOTOS.dia} alt="La esquina de día, con el colectivo y la pantalla" />
            <img className={styles.fotoNoche} src={FOTOS.noche} alt="La misma esquina de noche, con la pantalla encendida" />
            <span className={styles.hora} aria-hidden="true" />

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
      </div>
    </section>
  )
}

export default DiaYNoche
