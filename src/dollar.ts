import { fetchJson, usePolled } from './usePolled.ts'

const DOLLAR_URL = 'https://dolarapi.com/v1/dolares'

// Cotizaciones que se muestran, en este orden, con el nombre que se ve en pantalla.
const RATES = [
  { casa: 'oficial', name: 'Oficial' },
  { casa: 'blue', name: 'Blue' },
  { casa: 'bolsa', name: 'MEP' },
  { casa: 'contadoconliqui', name: 'CCL' },
  { casa: 'tarjeta', name: 'Tarjeta' },
  { casa: 'cripto', name: 'Cripto' },
]

export type Rate = {
  name: string
  buy: number
  sell: number
}

export type Dollar = {
  rates: Rate[]
  updatedAt: Date
}

type ApiRate = { casa: string; compra: number; venta: number; fechaActualizacion: string }

async function loadDollar(): Promise<Dollar> {
  const data: ApiRate[] = await fetchJson(DOLLAR_URL)
  const found = RATES.flatMap(({ casa, name }) => {
    const rate = data.find((item) => item.casa === casa)
    return rate ? [{ name, rate }] : []
  })
  if (found.length === 0) throw new Error('La respuesta no trae cotizaciones conocidas')

  return {
    rates: found.map(({ name, rate }) => ({ name, buy: rate.compra, sell: rate.venta })),
    updatedAt: new Date(
      Math.max(...found.map(({ rate }) => new Date(rate.fechaActualizacion).getTime())),
    ),
  }
}

export function useDollar() {
  return usePolled(loadDollar)
}
