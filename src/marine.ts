import { fetchJson, usePolled } from './usePolled.ts'
import { LOCATION_QUERY } from './weather.ts'

// 26 horas en pasos de 15 minutos: alcanza para ver las próximas cuatro mareas.
const TIDE_STEPS = 104
const MARINE_URL =
  `https://marine-api.open-meteo.com/v1/marine?${LOCATION_QUERY}` +
  '&current=wave_height,wave_direction,wave_period,swell_wave_height,swell_wave_period' +
  ',sea_surface_temperature,ocean_current_velocity,ocean_current_direction' +
  `&minutely_15=sea_level_height_msl&forecast_minutely_15=${TIDE_STEPS}`
const WIND_URL =
  `https://api.open-meteo.com/v1/forecast?${LOCATION_QUERY}` +
  '&current=temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl'

export type TidePoint = { time: string; level: number }

export type TideEvent = TidePoint & {
  type: 'Pleamar' | 'Bajamar'
  /** Posición dentro de la serie de marea. */
  index: number
}

export type Marine = {
  wind: number
  windDirection: number
  gusts: number
  airTemperature: number
  pressure: number
  waveHeight: number
  waveDirection: number
  wavePeriod: number
  swellHeight: number
  swellPeriod: number
  waterTemperature: number
  currentSpeed: number
  currentDirection: number
  tide: TidePoint[]
  tideEvents: TideEvent[]
  tideRising: boolean
}

function findTideEvents(tide: TidePoint[]) {
  const events: TideEvent[] = []
  for (let i = 1; i < tide.length - 1; i++) {
    const { level } = tide[i]
    const before = tide[i - 1].level
    const after = tide[i + 1].level
    if (level >= before && level > after) events.push({ ...tide[i], type: 'Pleamar', index: i })
    if (level <= before && level < after) events.push({ ...tide[i], type: 'Bajamar', index: i })
  }
  return events
}

async function loadMarine(): Promise<Marine> {
  const [marine, forecast] = await Promise.all([fetchJson(MARINE_URL), fetchJson(WIND_URL)])
  const sea = marine.current
  const air = forecast.current
  const levels: number[] = marine.minutely_15.sea_level_height_msl
  const tide: TidePoint[] = marine.minutely_15.time.map((time: string, i: number) => ({
    time: time.slice(11, 16),
    level: levels[i],
  }))

  return {
    wind: air.wind_speed_10m,
    windDirection: air.wind_direction_10m,
    gusts: air.wind_gusts_10m,
    airTemperature: air.temperature_2m,
    pressure: air.pressure_msl,
    waveHeight: sea.wave_height,
    waveDirection: sea.wave_direction,
    wavePeriod: sea.wave_period,
    swellHeight: sea.swell_wave_height,
    swellPeriod: sea.swell_wave_period,
    waterTemperature: sea.sea_surface_temperature,
    currentSpeed: sea.ocean_current_velocity,
    currentDirection: sea.ocean_current_direction,
    tide,
    tideEvents: findTideEvents(tide),
    tideRising: tide[1].level > tide[0].level,
  }
}

export function useMarine() {
  return usePolled(loadMarine)
}
