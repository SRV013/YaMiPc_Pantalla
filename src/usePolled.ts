import { useEffect, useState } from 'react'

const REFRESH_MS = 10 * 60 * 1000

/** Pide los datos al montar y los vuelve a pedir cada 10 minutos. `load` debe ser una función estable. */
export function usePolled<T>(load: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null)

  useEffect(() => {
    let cancelled = false

    async function refresh() {
      try {
        const next = await load()
        if (!cancelled) setData(next)
      } catch (error) {
        // Si falla, se mantiene el último dato y se reintenta en el próximo ciclo.
        console.error('No se pudieron actualizar los datos', error)
      }
    }

    refresh()
    const id = setInterval(refresh, REFRESH_MS)
    return () => {
      cancelled = true
      clearInterval(id)
    }
  }, [load])

  return data
}

export async function fetchJson(url: string) {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}
