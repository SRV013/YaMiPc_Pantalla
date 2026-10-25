import Icon from '../Icon.tsx'
import Foto from './Foto.tsx'
import styles from './VistaDoble.module.css'

type FotoDatos = { src: string; alt: string; etiqueta: string; color: string }

type VistaDobleProps = {
  hacia: FotoDatos
  desde: FotoDatos
  /** true: la vista de enfrente pasa a ser la grande y la que mira a la pantalla, la chica. */
  invertida: boolean
  onInvertir: () => void
  /** Versión de las fotos: la liviana en la página y el original en la vista ampliada. */
  calidad?: 'vista' | 'original'
}

const NOMBRES = { hacia: 'Mirando a la pantalla', desde: 'Vista de enfrente' }

/** Una foto grande con la vista contraria en un recuadro, y un botón para intercambiarlas. */
function VistaDoble({ hacia, desde, invertida, onInvertir, calidad = 'vista' }: VistaDobleProps) {
  const principal = invertida ? desde : hacia
  const secundaria = invertida ? hacia : desde
  const nombreSecundaria = invertida ? NOMBRES.hacia : NOMBRES.desde

  return (
    <div className={styles.vista}>
      {/* La key reinicia el fundido cada vez que se intercambian. */}
      <div key={principal.etiqueta} className={styles.principal}>
        <Foto {...principal} calidad={calidad} />
      </div>

      {/* Dentro del recuadro: el botón arriba a la izquierda y el nombre abajo a la derecha. */}
      <div className={styles.zona}>
        <div key={secundaria.etiqueta} className={styles.secundaria}>
          <Foto {...secundaria} calidad={calidad} />
          <span className={styles.etiqueta}>{nombreSecundaria}</span>
          {/* Todo el recuadro intercambia las vistas. El botón y el mensaje aparecen con el mouse encima. */}
          <button type="button" className={styles.cambiar} onClick={onInvertir} aria-label="Intercambiar las imágenes">
            <span className={styles.invertir} aria-hidden="true">
              <Icon name="expand" size={14} />
            </span>
            <span className={styles.mensaje} aria-hidden="true">
              Click para intercambiar imagen
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default VistaDoble
