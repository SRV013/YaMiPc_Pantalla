import { useEffect, useRef, useState, type CSSProperties } from 'react'
import CarruselTactil from '../CarruselTactil.tsx'
import Icon from '../Icon.tsx'
import { useEsCelular } from '../efectos.ts'
import { ESQUINA, type Momento } from '../content.ts'
import Foto from './Foto.tsx'
import { precargar } from './variantes.ts'
import Pestanas from './Pestanas.tsx'
import StreetView, { CLAVE_MAPS } from './StreetView.tsx'
import Visor from './Visor.tsx'
import styles from './EsquinaGaleria.module.css'

const PASO_MS = 10000
// Cuánto hay que arrastrar de costado para pasar de foto.
const ARRASTRE_PX = 50

// Colores de los marcadores mientras no están las fotos: uno por punto, más oscuros de noche.
const COLORES = {
  dia: {
    hacia: ['#4f7fd6', '#3f9d77', '#d29a3a', '#c25d8c', '#5a9ec9'],
    desde: ['#6b6fd6', '#3c9aa8', '#c97b4a', '#8a6bc2', '#7aa35a'],
  },
  noche: {
    hacia: ['#1d2550', '#123a30', '#4a3113', '#3b1832', '#152f45'],
    desde: ['#272a5c', '#11363d', '#4a2a17', '#2e1f4a', '#22341a'],
  },
}

const NOMBRE = { dia: 'Día', noche: 'Noche' }

type Ampliada = { tipo: 'foto'; indice: number } | null
type Lado = 'hacia' | 'desde'

/** Posición de cada foto respecto de la actual, dando la vuelta: -1 la anterior, 1 la siguiente. */
function posicion(indice: number, actual: number, total: number) {
  const mitad = Math.floor(total / 2)
  return ((indice - actual + total + mitad) % total) - mitad
}

/**
 * Fotos de la esquina con selector de día o noche. Muestra un slider lento (la foto actual en el
 * centro y las vecinas a los costados) o el Street View de Google.
 */
function EsquinaGaleria() {
  const [momento, setMomento] = useState<Momento>('dia')
  // Con ?vista=street en la dirección (el link de compartir), la galería abre directo en Street View.
  const [vista, setVista] = useState<'fotos' | 'google'>(() =>
    CLAVE_MAPS && new URLSearchParams(window.location.search).get('vista') === 'street' ? 'google' : 'fotos',
  )
  const [copiado, setCopiado] = useState(false)
  const [actual, setActual] = useState(0)
  const [pausa, setPausa] = useState(false)
  // Pausa elegida con el botón de reproducir/pausar, aparte de la que pone el mouse encima.
  const [detenido, setDetenido] = useState(false)
  const [lado, setLado] = useState<Lado>('hacia')
  const [ampliada, setAmpliada] = useState<Ampliada>(null)
  const total = ESQUINA.length
  // En el celular las fotos se deslizan con el dedo, como el resto de los carruseles de la página.
  const celular = useEsCelular()
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
    if (celular || vista !== 'fotos' || pausa || detenido || ampliada) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const id = setTimeout(() => {
      setActual((i) => (i + 1) % total)
    }, PASO_MS)
    return () => clearTimeout(id)
  }, [actual, vista, pausa, detenido, ampliada, total, celular])

  // Mientras se mira una foto, se piden por adelantado las que vienen: la otra vista de la siguiente
  // y la misma foto en el otro momento del día, así los cambios no esperan a la red.
  useEffect(() => {
    const siguiente = ESQUINA[(actual + 1) % total]
    const otro = momento === 'dia' ? 'noche' : 'dia'
    const id = setTimeout(() => {
      precargar(siguiente[momento][lado === 'hacia' ? 'desde' : 'hacia'])
      precargar(ESQUINA[actual][otro].hacia)
      precargar(ESQUINA[actual][otro].desde)
    }, 1500)
    return () => clearTimeout(id)
  }, [actual, momento, lado, total])

  const descripcion = (lado: Lado) =>
    lado === 'hacia'
      ? `Así se ve la pantalla desde este punto, de ${NOMBRE[momento].toLowerCase()}.`
      : 'Esto es lo que la pantalla tiene enfrente: todas esas miradas apuntan a tu anuncio.'

  const selectorLado = (
    <Pestanas
      etiqueta="Qué vista mostrar"
      valor={lado}
      onCambiar={setLado}
      opciones={[
        { valor: 'hacia', texto: 'Mirando la pantalla' },
        { valor: 'desde', texto: 'Desde la pantalla' },
      ]}
    />
  )

  const ir = (indice: number) => {
    // La foto nueva entra bajo el mouse, que ya no está sobre la anterior.
    setPausa(false)
    setActual((indice + total) % total)
  }

  const cerrarVisor = () => setAmpliada(null)

  // Si se entró por el link de compartir, baja hasta la galería.
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('vista') !== 'street') return
    const id = setTimeout(() => document.getElementById('explorar')?.scrollIntoView(), 300)
    return () => clearTimeout(id)
  }, [])

  // Comparte el link que abre la página directo en este Street View. En el celular abre el menú de
  // compartir del teléfono; en la compu copia el link.
  const compartir = async () => {
    const url = `${window.location.origin}/?vista=street#explorar`
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Pantalla Seis Esquinas',
          text: 'Mirá la esquina de la pantalla en Street View',
          url,
        })
      } catch {
        // Si la persona cierra el menú de compartir no hay nada que hacer.
      }
      return
    }
    await navigator.clipboard.writeText(url)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  return (
    <div className={styles.galeria}>
      {vista === 'fotos' && celular && (
        <CarruselTactil
          laminas={ESQUINA.map((punto, i) => {
            const f = foto(i, lado)
            return {
              foto: <Foto {...f} />,
              alt: f.alt,
              contenido: (
                <>
                  <h3 className={styles.celTitulo}>{punto.lugar}</h3>
                  <p className={styles.celTexto}>{descripcion(lado)}</p>
                </>
              ),
              encima: (
                <button
                  type="button"
                  className={styles.ampliar}
                  aria-label="Ampliar foto"
                  onClick={() => setAmpliada({ tipo: 'foto', indice: i })}
                >
                  <Icon name="expand" size={18} />
                </button>
              ),
            }
          })}
        />
      )}

      {vista === 'fotos' && !celular && (
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
                {/* La vista elegida queda fija al pasar de foto: las vecinas ya muestran ese mismo lado.
                    Solo se piden las fotos de al lado; las demás muestran su miniatura hasta acercarse. */}
                <Foto {...(esActual ? hacia : foto(i, lado))} cargar={Math.abs(rel) <= 1} />

                {esActual ? (
                  <>
                    {/* La vista de enfrente entra por encima con un barrido de costado. */}
                    <div
                      className={`${styles.enfrente} ${lado === 'desde' ? styles.enfrenteVisible : ''}`}
                      aria-hidden={lado !== 'desde'}
                    >
                      <Foto {...desde} />
                    </div>
                    {/* Abajo a la derecha, sobre la foto: hacia dónde se mira. */}
                    <div className={`${styles.sobreFoto} ${styles.vidrio}`}>{selectorLado}</div>
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
      )}

      {vista === 'google' && (
        <div className={styles.streetView}>
          <StreetView />
          <button type="button" className={styles.compartir} onClick={compartir}>
            <Icon name={copiado ? 'check' : 'share'} size={16} />
            {copiado ? 'Link copiado' : 'Compartir'}
          </button>
        </div>
      )}

      {/* El pie está en las dos vistas, así la sección mantiene la misma altura y no salta.
          En el celular, con fotos, el texto va sobre cada foto y el carrusel trae sus puntos. */}
      {!(celular && vista === 'fotos') && (
        <div className={styles.pie}>
          {/* La key reinicia el fundido del texto al cambiar de foto o de vista. */}
          <p key={`${vista}-${actual}-${lado}-${momento}`} className={styles.leyenda}>
            {vista === 'google' ? (
              <>
                <strong>Street View de Google.</strong> Arrastrá para mirar alrededor y tocá la calle para avanzar.
              </>
            ) : (
              <>
                <strong>{ESQUINA[actual].lugar}.</strong> {descripcion(lado)}
              </>
            )}
          </p>

          {/* Avance del slider, como en las galerías de Apple. En Street View queda oculto pero ocupa su lugar. */}
          <div className={`${styles.avance} ${vista !== 'fotos' ? styles.invisible : ''}`} aria-hidden={vista !== 'fotos'}>
            <div className={styles.puntos}>
              {ESQUINA.map((punto, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Foto ${i + 1}: ${punto.lugar}`}
                  aria-current={i === actual}
                  tabIndex={vista === 'fotos' ? 0 : -1}
                  onClick={() => ir(i)}
                >
                  <span />
                </button>
              ))}
            </div>
            <button
              type="button"
              className={styles.reproducir}
              aria-label={detenido ? 'Reproducir' : 'Pausar'}
              tabIndex={vista === 'fotos' ? 0 : -1}
              onClick={() => setDetenido((d) => !d)}
            >
              <Icon name={detenido ? 'play' : 'pause'} size={14} />
            </button>
          </div>
        </div>
      )}

      {/* En el celular, hacia dónde se mira va debajo de las fotos, no encima. */}
      {celular && vista === 'fotos' && <div className={styles.modo}>{selectorLado}</div>}

      {/* Al final, debajo de la leyenda y el avance, al centro: qué se mira y en qué momento del día. */}
      <div className={`${styles.modo} ${celular && vista === 'fotos' ? styles.modoJunto : ''}`}>
        <Pestanas
          etiqueta="Qué mirar"
          valor={vista}
          onCambiar={setVista}
          opciones={[
            { valor: 'fotos', texto: 'Fotos', icono: 'photos' },
            // Street View solo aparece si hay una clave de Google cargada.
            ...(CLAVE_MAPS
              ? [
                  {
                    valor: 'google' as const,
                    texto: 'Street View',
                    icono: 'globe' as const,
                  },
                ]
              : []),
          ]}
        />
        {/* En Street View no hay día ni noche: queda deshabilitado, sin desaparecer, así nada salta. */}
        <Pestanas
          etiqueta="Momento del día"
          valor={momento}
          onCambiar={setMomento}
          deshabilitado={vista !== 'fotos'}
          opciones={[
            { valor: 'dia', texto: 'Día', icono: 'sun' },
            { valor: 'noche', texto: 'Noche', icono: 'moon' },
          ]}
        />
      </div>

      <Visor abierto={ampliada !== null} titulo="Vista ampliada" onCerrar={cerrarVisor}>
        {ampliada && (
          <div className={styles.fotoAmpliada}>
            <Foto {...foto(ampliada.indice, lado)} calidad="original" />
          </div>
        )}
      </Visor>
    </div>
  )
}

export default EsquinaGaleria
