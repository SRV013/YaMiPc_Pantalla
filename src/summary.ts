import { fetchJson, usePolled } from './usePolled.ts'
import { TIME_ZONE } from './weather.ts'

const DATA_URL = 'https://api.argentinadatos.com/v1'
const ON_THIS_DAY_URL = 'https://es.wikipedia.org/api/rest_v1/feed/onthisday/events'
// Los textos más largos no entran en el panel.
const MAX_EVENT_LENGTH = 150
const DAY_MS = 24 * 60 * 60 * 1000

export type Holiday = {
  date: string
  name: string
  daysLeft: number
}

export type HistoryEvent = {
  year: number
  text: string
}

export type Summary = {
  holiday: Holiday | null
  events: HistoryEvent[]
}

// Fecha de hoy en la ciudad, como AAAA-MM-DD.
const todayFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })

type ApiHoliday = { fecha: string; nombre: string }

async function loadNextHoliday(today: string): Promise<Holiday | null> {
  const year = Number(today.slice(0, 4))
  // Después del último feriado del año, el próximo está en el año siguiente.
  for (const candidate of [year, year + 1]) {
    const holidays: ApiHoliday[] = await fetchJson(`${DATA_URL}/feriados/${candidate}`)
    const next = holidays.find((holiday) => holiday.fecha >= today)
    if (next) {
      return {
        date: next.fecha,
        name: next.nombre,
        daysLeft: Math.round((Date.parse(next.fecha) - Date.parse(today)) / DAY_MS),
      }
    }
  }
  return null
}

function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

async function loadSummary(): Promise<Summary> {
  const today = todayFormat.format(new Date())
  const [, month, day] = today.split('-')
  const [holiday, history] = await Promise.all([
    loadNextHoliday(today),
    fetchJson(`${ON_THIS_DAY_URL}/${month}/${day}`),
  ])

  return {
    holiday,
    events: (history.events as HistoryEvent[])
      .filter((event) => event.text.length <= MAX_EVENT_LENGTH)
      .map((event) => ({ year: event.year, text: capitalize(event.text) })),
  }
}

export function useSummary() {
  return usePolled(loadSummary)
}
