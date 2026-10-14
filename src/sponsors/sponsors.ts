export type Plan = 'Básico' | 'Destacado' | 'Premium'

export type Sponsor = {
  id: string
  name: string
  category: string
  contact: string
  plan: Plan
  /** Monto mensual en pesos. */
  monthly: number
  /** Fin del contrato, AAAA-MM-DD. */
  until: string
  active: boolean
}

// Datos inventados de ejemplo, hasta conectar la lista con la base de datos.
export const SAMPLE_SPONSORS: Sponsor[] = [
  { id: '1', name: 'Panadería La Espiga', category: 'Panadería', contact: 'Marta Gómez', plan: 'Básico', monthly: 45000, until: '2026-12-31', active: true },
  { id: '2', name: 'Heladería Costa Azul', category: 'Heladería', contact: 'Julián Ríos', plan: 'Premium', monthly: 120000, until: '2027-03-31', active: true },
  { id: '3', name: 'Ferretería El Tornillo', category: 'Ferretería', contact: 'Raúl Benítez', plan: 'Destacado', monthly: 80000, until: '2026-11-30', active: true },
  { id: '4', name: 'Gimnasio Ola Fit', category: 'Gimnasio', contact: 'Carla Sosa', plan: 'Destacado', monthly: 80000, until: '2027-01-31', active: true },
  { id: '5', name: 'Óptica Visión Clara', category: 'Óptica', contact: 'Diego Ferreyra', plan: 'Básico', monthly: 45000, until: '2026-10-31', active: true },
  { id: '6', name: 'Pizzería Don Vito', category: 'Gastronomía', contact: 'Vito Russo', plan: 'Premium', monthly: 120000, until: '2027-02-28', active: true },
  { id: '7', name: 'Inmobiliaria Puerto Sur', category: 'Inmobiliaria', contact: 'Laura Méndez', plan: 'Premium', monthly: 120000, until: '2027-06-30', active: true },
  { id: '8', name: 'Veterinaria Patitas', category: 'Veterinaria', contact: 'Sofía Herrera', plan: 'Básico', monthly: 45000, until: '2026-09-30', active: false },
  { id: '9', name: 'Café del Faro', category: 'Cafetería', contact: 'Tomás Acosta', plan: 'Destacado', monthly: 80000, until: '2026-12-31', active: true },
  { id: '10', name: 'Librería Página Uno', category: 'Librería', contact: 'Elena Paz', plan: 'Básico', monthly: 45000, until: '2026-08-31', active: false },
]
