import { fetchJson, usePolled } from './usePolled.ts'
import { LOCATION_QUERY } from './weather.ts'

const AIR_URL =
  `https://air-quality-api.open-meteo.com/v1/air-quality?${LOCATION_QUERY}` +
  '&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide'

export type Air = {
  aqi: number
  pm25: number
  pm10: number
  ozone: number
  no2: number
  so2: number
  co: number
}

// Escala del índice de calidad del aire de EE. UU. (US AQI).
export const AQI_LEVELS = [
  { max: 50, name: 'Buena', color: '#22c55e', advice: 'Aire limpio. Ideal para actividades al aire libre.' },
  { max: 100, name: 'Moderada', color: '#facc15', advice: 'Aceptable. Personas muy sensibles: moderar el esfuerzo intenso.' },
  { max: 150, name: 'Dañina para sensibles', color: '#fb923c', advice: 'Niños, mayores y personas con asma: reducir la actividad al aire libre.' },
  { max: 200, name: 'Dañina', color: '#ef4444', advice: 'Evitar el esfuerzo prolongado al aire libre.' },
  { max: 300, name: 'Muy dañina', color: '#a855f7', advice: 'Evitar la actividad al aire libre.' },
  { max: 500, name: 'Peligrosa', color: '#9f1239', advice: 'Permanecer en interiores con las ventanas cerradas.' },
]

export function aqiLevel(aqi: number) {
  const index = AQI_LEVELS.findIndex((level) => aqi <= level.max)
  return index === -1 ? AQI_LEVELS.length - 1 : index
}

async function loadAir(): Promise<Air> {
  const { current } = await fetchJson(AIR_URL)
  return {
    aqi: current.us_aqi,
    pm25: current.pm2_5,
    pm10: current.pm10,
    ozone: current.ozone,
    no2: current.nitrogen_dioxide,
    so2: current.sulphur_dioxide,
    co: current.carbon_monoxide,
  }
}

export function useAir() {
  return usePolled(loadAir)
}
