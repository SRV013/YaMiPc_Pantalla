import { useState, type FormEvent } from 'react'
import Button from '../components/Button.tsx'
import Field from '../components/Field.tsx'
import { today, type Expense } from './expenses.ts'
import styles from './ExpenseForm.module.css'

// Valor de la opción del select que permite escribir una categoría nueva.
const NEW_CATEGORY = '__nueva__'

type ExpenseFormProps = {
  categories: string[]
  onAdd: (expense: Omit<Expense, 'id'>) => void
}

function ExpenseForm({ categories, onAdd }: ExpenseFormProps) {
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState(categories[0])
  const [newCategory, setNewCategory] = useState('')
  const [date, setDate] = useState(today)
  const creating = category === NEW_CATEGORY

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const chosen = creating ? newCategory.trim() : category
    onAdd({ description: description.trim(), amount: Number(amount), category: chosen, date })
    // Se mantienen categoría y fecha: lo habitual es cargar varios gastos seguidos del mismo día.
    setCategory(chosen)
    setNewCategory('')
    setDescription('')
    setAmount('')
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <div className={styles.wide}>
        <Field label="Descripción">
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ej.: factura de luz de octubre"
            required
            autoFocus
          />
        </Field>
      </div>
      <Field label="Monto">
        <input
          type="number"
          inputMode="decimal"
          min="0.01"
          step="0.01"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0,00"
          required
        />
      </Field>
      <Field label="Categoría">
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((name) => (
            <option key={name}>{name}</option>
          ))}
          <option value={NEW_CATEGORY}>+ Nueva categoría…</option>
        </select>
      </Field>
      <Field label="Fecha">
        <input type="date" value={date} onChange={(event) => setDate(event.target.value)} required />
      </Field>
      {creating && (
        <div className={styles.wide}>
          <Field label="Nueva categoría">
            <input
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
              placeholder="Ej.: Publicidad"
              required
              autoFocus
            />
          </Field>
        </div>
      )}
      <Button type="submit" className={styles.submit}>
        Agregar gasto
      </Button>
    </form>
  )
}

export default ExpenseForm
