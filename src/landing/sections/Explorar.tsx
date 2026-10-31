import Aparece from '../Aparece.tsx'
import EsquinaGaleria from '../esquina/EsquinaGaleria.tsx'
import base from '../Landing.module.css'

/** Galería para recorrer la esquina: fotos de cada punto, de día o de noche, y el Street View de Google. */
function Explorar() {
  return (
    <section id="explorar" className={base.section}>
      <div className={base.container}>
        <Aparece>
          <p className={base.eyebrow}>Explorá la esquina</p>
          <h2 className={base.heading}>Mirala desde cada punto. De día o de noche.</h2>
          <p className={base.lead}>
            Recorré las fotos de la esquina y, para cada punto, lo que la pantalla tiene enfrente.
          </p>
        </Aparece>
      </div>
      <EsquinaGaleria />
    </section>
  )
}

export default Explorar
