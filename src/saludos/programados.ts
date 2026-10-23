import type { SaludoProgramado } from './saludos.ts'

// Saludos agendados hasta que haya base de datos. Cada uno sale en pantalla entre `desde` y
// `hasta` (AAAA-MM-DD, ambos incluidos). Tipos: cumpleanos, aniversario, recibida,
// nacimiento, felicitaciones. Ejemplo:
//   { tipo: 'cumpleanos', para: 'Martina', mensaje: '¡Feliz 15!', de: 'Tu familia', desde: '2026-10-24', hasta: '2026-10-24' },
export const PROGRAMADOS: SaludoProgramado[] = []
