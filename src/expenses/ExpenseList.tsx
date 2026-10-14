import Button from '../components/Button.tsx'
import { money } from '../format.ts'
import type { Expense } from './expenses.ts'
import styles from './ExpenseList.module.css'

const dateFormat = new Intl.DateTimeFormat('es-AR', { day: 'numeric', month: 'short' })

// La fecha llega como AAAA-MM-DD; al mediodía se evita el corrimiento de día.
function formatDate(date: string) {
  return dateFormat.format(new Date(`${date}T12:00`))
}

type ExpenseListProps = {
  expenses: Expense[]
  onRemove: (id: string) => void
}

function ExpenseList({ expenses, onRemove }: ExpenseListProps) {
  if (expenses.length === 0) {
    return <p className={styles.empty}>Todavía no cargaste gastos.</p>
  }

  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <section className={styles.list}>
      <header className={styles.header}>
        <h3 className={styles.title}>Gastos cargados</h3>
        <p className={styles.total}>Total {money.format(total)}</p>
      </header>
      <ul className={styles.items}>
        {expenses.map((expense) => (
          <li key={expense.id} className={styles.item}>
            <span className={styles.date}>{formatDate(expense.date)}</span>
            <span className={styles.description}>
              {expense.description}
              <span className={styles.category}>{expense.category}</span>
            </span>
            <span className={styles.amount}>{money.format(expense.amount)}</span>
            <Button
              variant="ghost"
              aria-label={`Borrar ${expense.description}`}
              onClick={() => onRemove(expense.id)}
            >
              ✕
            </Button>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ExpenseList
