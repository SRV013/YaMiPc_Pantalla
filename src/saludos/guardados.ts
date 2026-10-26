import { useEffect, useState } from 'react'
import type { Saludo } from './saludos.ts'

// Saludos fijos guardados desde el panel, hasta tener base de datos. Quedan en el navegador
// (localStorage): los ve solo la computadora donde se guardaron, y salen en /saludos hasta borrarlos.
const CLAVE = 'yamipc-saludos-guardados'

export type SaludoGuardado = Saludo & { id: string }

function leer(): SaludoGuardado[] {
  try {
    const guardados = JSON.parse(localStorage.getItem(CLAVE) ?? '[]')
    return Array.isArray(guardados) ? guardados : []
  } catch {
    return []
  }
}

function escribir(saludos: SaludoGuardado[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(saludos))
  } catch (error) {
    console.error('No se pudieron guardar los saludos', error)
  }
}

/** Saludos guardados en este navegador. Se actualiza si se guardan desde otra pestaña. */
export function useSaludosGuardados() {
  const [saludos, setSaludos] = useState(leer)

  useEffect(() => {
    const alCambiar = (e: StorageEvent) => {
      if (e.key === CLAVE) setSaludos(leer())
    }
    window.addEventListener('storage', alCambiar)
    return () => window.removeEventListener('storage', alCambiar)
  }, [])

  function actualizar(siguientes: SaludoGuardado[]) {
    setSaludos(siguientes)
    escribir(siguientes)
  }

  return {
    saludos,
    guardar: (saludo: Saludo) => actualizar([...saludos, { ...saludo, id: crypto.randomUUID() }]),
    quitar: (id: string) => actualizar(saludos.filter((s) => s.id !== id)),
  }
}
