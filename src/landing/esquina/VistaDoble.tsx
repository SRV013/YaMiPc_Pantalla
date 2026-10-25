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
}

const NOMBRES = { hacia: 'Mirando a la pantalla', desde: 'Vista de enfrente' }

/** Una foto grande con la vista contraria en un recuadro, y un botón para intercambiarlas. */
function VistaDoble({ hacia, desde, invertida, onInvertir }: VistaDobleProps) {
  const principal = invertida ? desde : hacia
  const secundaria = invertida ? hacia : desde
  const nombreSecundaria = invertida ? NOMBRES.hacia : NOMBRES.desde

  return (
    <div className={styles.vista}>
      {/* La key reinicia el fundido cada vez que se intercambian. */}
      <div key={principal.etiqueta} className={styles.principal}>
        <Foto {...principal} />
      </div>

      {/* Dentro del recuadro: el botón arriba a la izquierda y el nombre abajo a la derecha. */}
      <div className={styles.zona}>
        <div key={secundaria.etiqueta} className={styles.secundaria}>
          <Foto {...secundaria} />
          <span className={styles.etiqueta}>{nombreSecundaria}</span>
          <button type="button" className={styles.invertir} onClick={onInvertir} aria-label="Invertir las vistas">
            <Icon name="expand" size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default VistaDoble
