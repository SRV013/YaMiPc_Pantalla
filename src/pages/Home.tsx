import { useState } from 'react'
import Card from '../components/Card.tsx'
import CardGrid from '../components/CardGrid.tsx'
import Hero from '../components/Hero.tsx'
import Modal from '../components/Modal.tsx'
import ExpenseForm from '../expenses/ExpenseForm.tsx'
import ExpenseList from '../expenses/ExpenseList.tsx'
import { useExpenses } from '../expenses/expenses.ts'
import SponsorList from '../sponsors/SponsorList.tsx'
import { SAMPLE_SPONSORS } from '../sponsors/sponsors.ts'
import styles from './Home.module.css'

const widgets = [
  {
    icon: '🌤️',
    name: 'Clima small',
    description: '1152×384 px · hora y clima actual',
    path: '/climasmall',
  },
  {
    icon: '🌦️',
    name: 'Clima full',
    description: '1152×384 px · más datos y próximos días',
    path: '/climafull',
  },
  {
    icon: '🌊',
    name: 'Marea',
    description: '1152×384 px · marea, viento y olas',
    path: '/marea',
  },
  {
    icon: '🕒',
    name: 'Reloj',
    description: '1152×384 px · hora y fecha en grande',
    path: '/reloj',
  },
  {
    icon: '💵',
    name: 'Dólar',
    description: '1152×384 px · cotizaciones del día',
    path: '/dolar',
  },
  {
    icon: '📰',
    name: 'Efemérides y feriados',
    description: '1152×384 px · un día como hoy y próximo feriado',
    path: '/resumen',
  },
  {
    icon: '🖥️',
    name: 'YaMiPc',
    description: '1152×384 px · publicidad de YaMiPc Computación',
    path: '/yamipc',
  },
]

type ModalName = 'widgets' | 'gastos' | 'sponsors'

function Home() {
  const [openModal, setOpenModal] = useState<ModalName | null>(null)
  const { expenses, categories, add, remove } = useExpenses()
  const close = () => setOpenModal(null)

  return (
    <main className={styles.home}>
      <header className={styles.brand}>
        {/* En tema oscuro se usa la versión con "COMPUTACION" en gris claro. */}
        <picture>
          <source srcSet="/yamipc-dark.svg" media="(prefers-color-scheme: dark)" />
          <img className={styles.logo} src="/yamipc.svg" alt="YaMiPc Computación" />
        </picture>
      </header>

      <Hero
        title="Panel YaMiPc"
        subtitle="Widgets para la pantalla y control de gastos."
      />

      <CardGrid>
        <Card
          icon="🧩"
          title="Widgets"
          description="Módulos listos para mostrar en pantalla"
          onClick={() => setOpenModal('widgets')}
        />
        <Card
          icon="💸"
          title="Gastos"
          description="Cargá y consultá los gastos"
          onClick={() => setOpenModal('gastos')}
        />
        <Card
          icon="🤝"
          title="Sponsors"
          description="Anunciantes de la pantalla"
          onClick={() => setOpenModal('sponsors')}
        />
      </CardGrid>

      <Modal open={openModal === 'widgets'} title="Widgets" onClose={close}>
        <CardGrid>
          {widgets.map((widget) => (
            <Card
              key={widget.path}
              icon={widget.icon}
              title={widget.name}
              description={widget.description}
              href={widget.path}
            />
          ))}
        </CardGrid>
      </Modal>

      <Modal open={openModal === 'gastos'} title="Agregar gasto" onClose={close}>
        <ExpenseForm categories={categories} onAdd={add} />
        <ExpenseList expenses={expenses} onRemove={remove} />
      </Modal>

      <Modal open={openModal === 'sponsors'} title="Sponsors" onClose={close}>
        <SponsorList sponsors={SAMPLE_SPONSORS} />
      </Modal>
    </main>
  )
}

export default Home
