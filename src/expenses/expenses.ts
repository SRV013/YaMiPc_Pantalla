import { useState } from 'react'

const STORAGE_KEY = 'yamipc-gastos'

// Gastos típicos de una pantalla LED en la vía pública.
export const CATEGORIES = [
  'Luz',
  'Municipalidad',
  'Comisiones',
  'Consorcio',
  'Fuentes LED',
  'Módulos LED',
  'Controladora',
  'Mantenimiento',
  'Reparaciones',
  'Internet',
  'Seguro',
  'Estructura',
  'Otro',
]

export type Expense = {
  id: string
  description: string
  amount: number
  category: string
  /** AAAA-MM-DD */
  date: string
}

// Fecha local de hoy como AAAA-MM-DD, el formato que usa <input type="date">.
export function today() {
  return new Date().toLocaleDateString('en-CA')
}

function read(): Expense[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function write(expenses: Expense[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses))
  } catch (error) {
    console.error('No se pudieron guardar los gastos', error)
  }
}

/** Gastos guardados en este navegador, del más reciente al más viejo. */
export function useExpenses() {
  const [expenses, setExpenses] = useState(read)

  function update(next: Expense[]) {
    setExpenses(next)
    write(next)
  }

  // Las categorías nuevas que se crearon al cargar un gasto quedan disponibles para los siguientes.
  const custom = expenses
    .map((expense) => expense.category)
    .filter((category) => !CATEGORIES.includes(category))

  return {
    expenses,
    categories: [...new Set([...CATEGORIES, ...custom])],
    add: (expense: Omit<Expense, 'id'>) =>
      update(
        [{ ...expense, id: crypto.randomUUID() }, ...expenses].sort((a, b) =>
          b.date.localeCompare(a.date),
        ),
      ),
    remove: (id: string) => update(expenses.filter((expense) => expense.id !== id)),
  }
}
