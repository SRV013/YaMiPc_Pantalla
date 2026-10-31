import { useEffect, useRef, useState } from 'react'
import styles from './StreetView.module.css'

// La clave se lee de .env.local (VITE_GOOGLE_MAPS_KEY) y en Vercel de su variable de entorno.
export const CLAVE_MAPS = import.meta.env.VITE_GOOGLE_MAPS_KEY as string | undefined

type LatLng = { lat: () => number; lng: () => number }
type Panorama = {
  getPosition: () => LatLng | null
  setPov: (pov: { heading: number; pitch: number }) => void
  addListener: (evento: string, fn: () => void) => void
}
type Maps = {
  StreetViewPanorama: new (div: HTMLElement, opciones: object) => Panorama
}
type Ventana = Window & {
  google?: { maps: Maps }
  gm_authFailure?: () => void
  __mapsListo?: () => void
}

let carga: Promise<Maps> | null = null

/** Carga la API de Google Maps una sola vez para toda la página. */
function cargarMaps(clave: string) {
  const w = window as Ventana
  if (w.google?.maps) return Promise.resolve(w.google.maps)
  carga ??= new Promise<Maps>((resolver, rechazar) => {
    w.__mapsListo = () => resolver(w.google!.maps)
    const script = document.createElement('script')
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(clave)}&v=weekly&loading=async&callback=__mapsListo`
    script.async = true
    script.onerror = () => rechazar(new Error('No se pudo cargar Google Maps'))
    document.head.append(script)
  })
  return carga
}

/** Street View de Google en la esquina, con la interfaz reducida para que combine con el sitio. */
function StreetView() {
  const caja = useRef<HTMLDivElement>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!CLAVE_MAPS || !caja.current) return
    const w = window as Ventana
    // Google llama a esta función si la clave es inválida o el proyecto no tiene facturación.
    w.gm_authFailure = () => setError('Google rechazó la clave: revisá que la facturación y la Maps JavaScript API estén activas.')

    let activo = true
    cargarMaps(CLAVE_MAPS)
      .then((maps) => {
        if (!activo || !caja.current) return
        
        // Inicializamos con los nuevos valores ajustados de tu enlace
        new maps.StreetViewPanorama(caja.current, {
          pano: 'uLFrS0N2ZTVr8Y_QKua03g', // ID exacto de la foto
          position: { lat: -37.9988773, lng: -57.5525009 }, // Coordenadas
          pov: { 
            heading: 125.15, // Ajustado al nuevo ángulo horizontal
            pitch: 2.82      // Ajustado a la nueva inclinación
          },
          zoom: 1,
          disableDefaultUI: true,
          addressControl: false,
          showRoadLabels: false,
          linksControl: false,
          motionTracking: false,
          clickToGo: true,
        })
      })
      .catch((e: Error) => activo && setError(e.message))

    return () => {
      activo = false
    }
  }, [])

  return (
    <div className={styles.streetView}>
      <div ref={caja} className={styles.mapa} />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  )
}

export default StreetView