// Cada foto de la esquina tiene, además del original, dos versiones generadas por
// scripts/optimizar-esquina.sh: una liviana para mostrar y una miniatura para la precarga.
export type Variante = 'original' | 'vista' | 'mini'

export function variante(src: string, tipo: Variante) {
  if (!src || tipo === 'original') return src
  const nombre = src.slice(src.lastIndexOf('/') + 1).replace(/\.[^.]+$/, '')
  return `${src.slice(0, src.lastIndexOf('/'))}/${tipo}/${nombre}.jpg`
}

/** Pide la foto por adelantado, así ya está lista cuando hace falta. */
export function precargar(src: string) {
  if (!src) return
  const img = new Image()
  img.decoding = 'async'
  img.src = variante(src, 'vista')
}
