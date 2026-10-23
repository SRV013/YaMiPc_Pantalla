import { TIME_ZONE } from '../weather.ts'

export type TipoSaludo = 'cumpleanos' | 'aniversario' | 'recibida' | 'nacimiento' | 'felicitaciones'

export type Saludo = {
  tipo: TipoSaludo
  para: string
  mensaje?: string
  de?: string
}

/** Saludo agendado: sale en pantalla entre `desde` y `hasta` (AAAA-MM-DD, ambos incluidos). */
export type SaludoProgramado = Saludo & {
  desde: string
  hasta: string
}

// Frase, color e ícono de cada tipo. El ícono es un trazo en una grilla de 24×24.
export const TIPOS: Record<TipoSaludo, { nombre: string; frase: string; color: string; icono: string }> = {
  cumpleanos: {
    nombre: 'Cumpleaños',
    frase: '¡Feliz cumpleaños!',
    color: '#ec268f',
    icono: 'M4 21h16M5 21v-7h14v7M5 16.5c2.3 0 2.3-1.5 4.7-1.5s2.3 1.5 4.6 1.5 2.4-1.5 4.7-1.5M12 14v-3.5M12 7.5c-.9-.6-1-1.8 0-3 1 1.2.9 2.4 0 3z',
  },
  aniversario: {
    nombre: 'Aniversario',
    frase: '¡Feliz aniversario!',
    color: '#fb7185',
    icono: 'M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z',
  },
  recibida: {
    nombre: 'Recibida',
    frase: '¡Felicitaciones por tu recibida!',
    color: '#fff212',
    icono: 'M2 9l10-5 10 5-10 5zM6 11v5c3 2 9 2 12 0v-5M22 9v6',
  },
  nacimiento: {
    nombre: 'Nacimiento',
    frase: '¡Llegó al mundo!',
    color: '#7dd3fc',
    icono: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6',
  },
  felicitaciones: {
    nombre: 'Felicitaciones',
    frase: '¡Felicitaciones!',
    color: '#fbbf24',
    icono: 'M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.4l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z',
  },
}

export const LIMITES = { para: 30, mensaje: 40, de: 30 }

function esTipo(valor: string | null): valor is TipoSaludo {
  return valor !== null && valor in TIPOS
}

/** Lee un saludo de la dirección (`?tipo=…&para=…&mensaje=…&de=…`). Sin `para` no hay saludo. */
export function saludoDesdeLink(search: string): Saludo | null {
  const params = new URLSearchParams(search)
  const para = params.get('para')?.trim().slice(0, LIMITES.para)
  if (!para) return null
  const tipo = params.get('tipo')
  return {
    tipo: esTipo(tipo) ? tipo : 'felicitaciones',
    para,
    mensaje: params.get('mensaje')?.trim().slice(0, LIMITES.mensaje) || undefined,
    de: params.get('de')?.trim().slice(0, LIMITES.de) || undefined,
  }
}

/** Arma la dirección del widget para un saludo, la que se abre en la pantalla. */
export function linkDeSaludo(saludo: Saludo) {
  const params = new URLSearchParams({ tipo: saludo.tipo, para: saludo.para })
  if (saludo.mensaje) params.set('mensaje', saludo.mensaje)
  if (saludo.de) params.set('de', saludo.de)
  return `/saludos?${params}`
}

// Fecha de hoy en la ciudad, como AAAA-MM-DD.
const hoyFormat = new Intl.DateTimeFormat('en-CA', { timeZone: TIME_ZONE })

/** Los saludos programados que corresponden a hoy. */
export function saludosDeHoy(programados: SaludoProgramado[], ahora = new Date()) {
  const hoy = hoyFormat.format(ahora)
  return programados.filter((saludo) => saludo.desde <= hoy && hoy <= saludo.hasta)
}
