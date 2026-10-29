import { useEffect, useRef, useState, type CSSProperties } from 'react'
import Icon from '../Icon.tsx'
import { ESQUINA, PANORAMA, type Momento } from '../content.ts'
import Foto from './Foto.tsx'
import { precargar } from './variantes.ts'
import VistaDoble from './VistaDoble.tsx'
import Panorama from './Panorama.tsx'
import DiaNoche from './DiaNoche.tsx'
import Pestanas from './Pestanas.tsx'
import Visor from './Visor.tsx'
import styles from './EsquinaGaleria.module.css'

const PASO_MS = 10000
const ZOOM_MAX = 2.5
// Cuánto hay que arrastrar de costado para pasar de foto.
const ARRASTRE_PX = 50

// Colores de los marcadores mientras no están las fotos: uno por punto, más oscuros de noche.
const COLORES = {
  dia: { hacia: ['#4f7fd6', '#3f9d77', '#d29a3a', '#c25d8c', '#5a9ec9'], desde: ['#6b6fd6', '#3c9aa8', '#c97b4a', '#8a6bc2', '#7aa35a'] },
  noche: { hacia: ['#1d2550', '#123a30', '#4a3113', '#3b1832', '#152f45'], desde: ['#272a5c', '#11363d', '#4a2a17', '#2e1f4a', '#22341a'] },
}

const NOMBRE = { dia: 'Día', noche: 'Noche' }

type Ampliada = { tipo: 'foto'; indice: number } | { tipo: 'panorama' } | null

/** Posición de cada foto respecto de la actual, dando la vuelta: -1 la anterior, 1 la siguiente. */
function posicion(indice: number, actual: number, total: number) {
  const mitad = Math.floor(total / 2)
  return ((indice - actual + total + mitad) % total) - mitad
}

/**
 * Fotos de la esquina con selector de día o noche. Muestra un slider lento (la foto actual en el
 * centro y las vecinas difuminadas a los costados) o una vista 360 que gira sola.
 */
function EsquinaGaleria() {
  const [momento, setMomento] = useState<Momento>('dia')
  const [vista, setVista] = useState<'fotos' | '360'>('fotos')
  const [actual, setActual] = useState(0)
  const [pausa, setPausa] = useState(false)
  const [invertida, setInvertida] = useState(false)
  const [ampliada, setAmpliada] = useState<Ampliada>(null)
  const [zoom, setZoom] = useState(1)
  const vuelta = PANORAMA[momento]
  const total = ESQUINA.length
  const arrastre = useRef<{ x: number; movio: boolean } | null>(null)

  const foto = (indice: number, lado: 'hacia' | 'desde') => ({
    src: ESQUINA[indice][momento][lado],
    alt:
      lado === 'hacia'
        ? `${ESQUINA[indice].lugar}, mirando hacia la pantalla, de ${NOMBRE[momento].toLowerCase()}`
        : `Lo que tiene enfrente la pantalla desde ${ESQUINA[indice].lugar}, de ${NOMBRE[momento].toLowerCase()}`,
    etiqueta: `${lado === 'hacia' ? 'Img' : 'Enfrente'} ${indice + 1} · ${NOMBRE[momento]}`,
    color: COLORES[momento][lado][indice],
  })

  useEffect(() => {
    if (vista !== 'fotos' || pausa || ampliada) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => {
      setActual((i) => (i + 1) % total)
      setInvertida(false)
    }, PASO_MS)
    return () => clearTimeout(id)
  }, [actual, vista, pausa, ampliada, total])

  // Mientras se mira una foto, se piden por adelantado las que vienen: la vista de enfrente de la
  // siguiente y la misma foto en el otro momento del día, así los cambios no esperan a la red.
  useEffect(() => {
    const siguiente = ESQUINA[(actual + 1) % total]
    const otro = momento === 'dia' ? 'noche' : 'dia'
    const id = setTimeout(() => {
      precargar(siguiente[momento].desde)
      precargar(ESQUINA[actual][otro].hacia)
      precargar(ESQUINA[actual][otro].desde)
    }, 1500)
    return () => clearTimeout(id)
  }, [actual, momento, total])

  const ir = (indice: number) => {
    // La foto nueva entra bajo el mouse, que ya no está sobre la anterior.
    setPausa(false)
    setActual((indice + total) % total)
    setInvertida(false)
  }

  const cerrarVisor = () => {
    setAmpliada(null)
    setZoom(1)
  }

  return (
    <div className={styles.galeria}>
      {vista === 'fotos' ? (
        <div
          className={styles.carrusel}
          aria-roledescription="carrusel"
          aria-label="Fotos de la esquina"
          // Se pasa de foto arrastrando de costado, con el mouse o el dedo.
          onPointerDown={(e) => (arrastre.current = { x: e.clientX, movio: false })}
          onPointerMove={(e) => {
            if (arrastre.current && Math.abs(e.clientX - arrastre.current.x) > 8) arrastre.current.movio = true
          }}
          onPointerUp={(e) => {
            const inicio = arrastre.current
            if (!inicio) return
            const dx = e.clientX - inicio.x
            if (Math.abs(dx) > ARRASTRE_PX) ir(actual + (dx < 0 ? 1 : -1))
            // Se suelta un instante después, así el clic que sigue al arrastre no cuenta.
            setTimeout(() => (arrastre.current = null))
          }}
          onClickCapture={(e) => {
            if (arrastre.current?.movio) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
        >
          {ESQUINA.map((punto, i) => {
            const rel = posicion(i, actual, total)
            const esActual = rel === 0
            const hacia = foto(i, 'hacia')
            const desde = foto(i, 'desde')
            return (
              <figure
                key={i}
                className={`${styles.diapositiva} ${esActual ? styles.actual : ''} ${Math.abs(rel) > 1 ? styles.oculta : ''}`}
                style={{ '--rel': rel } as CSSProperties}
                aria-hidden={!esActual}
                // Solo se frena con el mouse sobre la foto actual; en el resto sigue pasando sola.
                onMouseEnter={esActual ? () => setPausa(true) : undefined}
                onMouseLeave={esActual ? () => setPausa(false) : undefined}
              >
                {esActual ? (
                  <VistaDoble
                    hacia={hacia}
                    desde={desde}
                    invertida={invertida}
                    onInvertir={() => setInvertida((v) => !v)}
                  />
                ) : (
                  // Solo se piden las fotos de al lado; las demás muestran su miniatura hasta acercarse.
                  <Foto {...hacia} cargar={Math.abs(rel) <= 1} />
                )}

                {esActual ? (
                  <>
                    <figcaption className={styles.lugar}>
                      <span>{String(i + 1).padStart(2, '0')}</span> {punto.lugar}
                    </figcaption>

                    <button
                      type="button"
                      className={styles.ampliar}
                      aria-label="Ampliar foto"
                      onClick={() => setAmpliada({ tipo: 'foto', indice: i })}
                    >
                      <Icon name="expand" size={18} />
                    </button>
                  </>
                ) : (
                  // Las vecinas no tienen controles: tocarlas lleva a esa foto.
                  <button
                    type="button"
                    className={styles.vecina}
                    aria-label={`Ver ${punto.lugar}`}
                    tabIndex={Math.abs(rel) === 1 ? 0 : -1}
                    onClick={() => ir(i)}
                  />
                )}
              </figure>
            )
          })}
        </div>
      ) : (
        <div className={styles.vista360}>
          {/* La key recarga la vista al cambiar de foto, así arranca desde el principio. */}
          <Panorama key={vuelta.src} src={vuelta.src} inicio={vuelta.inicio} momento={momento} arrastrable />
          <button
            type="button"
            className={styles.ampliar}
            aria-label="Abrir la vista 360"
            onClick={() => setAmpliada({ tipo: 'panorama' })}
          >
            <Icon name="expand" size={18} />
          </button>
          <p className={styles.ayuda}>Arrastrá para girar la vista</p>
        </div>
      )}

      {/* Debajo de las fotos, centrados: el tipo de vista y el interruptor de día o noche. */}
      <div className={styles.controles}>
        <Pestanas
          etiqueta="Tipo de vista"
          valor={vista}
          onCambiar={setVista}
          opciones={[
            { valor: 'fotos', texto: 'Imágenes', icono: 'photos' },
            { valor: '360', texto: 'Vista 360', icono: 'orbit' },
          ]}
        />
        <DiaNoche momento={momento} onCambiar={setMomento} />
      </div>
      <p className={styles.explicacion}>
        {vista === 'fotos'
          ? 'Elegí entre fotos o vista 360, y mirá la esquina de día o de noche. Arrastrá o tocá las fotos de los costados para pasar.'
          : 'Elegí entre fotos o vista 360, y mirá la esquina de día o de noche. Arrastrá la vista para girarla.'}
      </p>

      <Visor abierto={ampliada !== null} titulo="Vista ampliada" onCerrar={cerrarVisor}>
        {ampliada?.tipo === 'foto' && (
          <div className={styles.fotoAmpliada}>
            <VistaDoble
              hacia={foto(ampliada.indice, 'hacia')}
              desde={foto(ampliada.indice, 'desde')}
              invertida={invertida}
              onInvertir={() => setInvertida((v) => !v)}
              calidad="original"
            />
          </div>
        )}
        {ampliada?.tipo === 'panorama' && (
          <div
            className={styles.panoramaAmpliada}
            onWheel={(e) => setZoom((z) => Math.min(ZOOM_MAX, Math.max(1, z - e.deltaY * 0.002)))}
          >
            <Panorama key={vuelta.src} src={vuelta.src} inicio={vuelta.inicio} momento={momento} arrastrable zoom={zoom} />
            <div className={styles.zoom}>
              <button type="button" aria-label="Alejar" onClick={() => setZoom((z) => Math.max(1, z - 0.25))}>
                <Icon name="minus" size={18} />
              </button>
              <button type="button" aria-label="Acercar" onClick={() => setZoom((z) => Math.min(ZOOM_MAX, z + 0.25))}>
                <Icon name="plus" size={18} />
              </button>
            </div>
          </div>
        )}
      </Visor>
    </div>
  )
}

export default EsquinaGaleria
