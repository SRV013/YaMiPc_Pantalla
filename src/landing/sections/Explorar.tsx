import Aparece from '../Aparece.tsx'
import EsquinaGaleria from '../esquina/EsquinaGaleria.tsx'
import base from '../Landing.module.css'

/** Galería para recorrer la esquina: fotos de cada punto, de día o de noche, y la vista 360. */
function Explorar() {
  return (
    <section id="explorar" className={base.section}>
      <div className={base.container}>
        <Aparece>
          <p className={base.eyebrow}>Explorá la esquina</p>
          <h2 className={base.heading}>Mirala desde cada punto. De día o de noche.</h2>
          <p className={base.lead}>
            Recorré las fotos de la esquina y, al lado de cada una, lo que la pantalla tiene enfrente. Con la vista 360
            girás en el lugar.
          </p>
        </Aparece>
      </div>
      <EsquinaGaleria />
    </section>
  )
}

export default Explorar
