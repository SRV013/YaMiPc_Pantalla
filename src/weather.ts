import { useEffect, useState } from 'react'

export const CITY = 'Mar del Plata'
const TIME_ZONE = 'America/Argentina/Buenos_Aires'
const REFRESH_MS = 10 * 60 * 1000
const WEATHER_URL =
  'https://api.open-meteo.com/v1/forecast' +
  '?latitude=-38.0055&longitude=-57.5426' +
  '&current=temperature_2m,apparent_temperature,relative_humidity_2m,weather_code,is_day' +
  ',wind_speed_10m,wind_direction_10m,wind_gusts_10m,pressure_msl,cloud_cover' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max' +
  ',sunrise,sunset,uv_index_max&forecast_days=7' +
  `&timezone=${encodeURIComponent(TIME_ZONE)}`

export type Day = {
  date: string
  code: number
  max: number
  min: number
  rainChance: number
  sunrise: string
  sunset: string
  uv: number
}

export type Weather = {
  temperature: number
  feelsLike: number
  humidity: number
  wind: number
  windDirection: number
  gusts: number
  pressure: number
  clouds: number
  code: number
  isDay: boolean
  days: Day[]
}

// Códigos WMO que devuelve Open-Meteo.
export function describe(code: number, isDay = true) {
  if (code === 0) return { text: 'Despejado', icon: isDay ? '☀️' : '🌙' }
  if (code <= 2) return { text: 'Parcialmente nublado', icon: isDay ? '🌤️' : '☁️' }
  if (code === 3) return { text: 'Nublado', icon: '☁️' }
  if (code <= 48) return { text: 'Niebla', icon: '🌫️' }
  if (code <= 57) return { text: 'Llovizna', icon: '🌦️' }
  if (code <= 67) return { text: 'Lluvia', icon: '🌧️' }
  if (code <= 77) return { text: 'Nieve', icon: '🌨️' }
  if (code <= 82) return { text: 'Chaparrones', icon: '🌧️' }
  if (code <= 86) return { text: 'Nevadas', icon: '🌨️' }
  return { text: 'Tormenta', icon: '⛈️' }
}

const COMPASS = ['N', 'NE', 'E', 'SE', 'S', 'SO', 'O', 'NO']

export function compass(degrees: number) {
  return COMPASS[Math.round(degrees / 45) % 8]
}

export const timeFormat = new Intl.DateTimeFormat('es-AR', {
  timeZone: TIME_ZONE,
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

export const dateFormat = new Intl.DateTimeFormat('es-AR', {
  timeZone: TIME_ZONE,
  weekday: 'long',
  day: 'numeric',
  month: 'long',
})

export function useNow() {
  const [now, setNow] = useState(() => new Date())

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return now
}

export function useWeather() {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const response = await fetch(WEATHER_URL)
        if (!response.ok) throw new Error(`HTTP ${response.status}`)
        const { current, daily } = await response.json()
        if (cancelled) return
        setWeather({
          temperature: current.temperature_2m,
          feelsLike: current.apparent_temperature,
          humidity: current.relative_humidity_2m,
          wind: current.wind_speed_10m,
          windDirection: current.wind_direction_10m,
          gusts: current.wind_gusts_10m,
          pressure: current.pressure_msl,
          clouds: current.cloud_cover,
          code: current.weather_code,
          isDay: current.is_day === 1,
          days: daily.time.map((date: string, i: number) => ({
            date,
            code: daily.weather_code[i],
            max: daily.temperature_2m_max[i],
            min: daily.temperature_2m_min[i],
            rainChance: daily.precipitation_probability_max[i] ?? 0,
            sunrise: daily.sunrise[i].slice(11, 16),
            sunset: daily.sunset[i].slice(11, 16),
            uv: daily.uv_index_max[i],
          })),
        })
      } catch (error) {
        // Si falla, se mantiene el último dato y se reintenta en el próximo ciclo.
        console.error('No se pudo actualizar el clima', error)
      }
    }

    load()
    const id = setInterval(load, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [])

  return weather
}
