import { useState } from 'react'
import Card from '../components/Card.tsx'
import CardGrid from '../components/CardGrid.tsx'
import Modal from '../components/Modal.tsx'
import base from '../landing/Landing.module.css'
import Nav from '../landing/sections/Nav.tsx'
import SaludoForm from '../saludos/SaludoForm.tsx'
import styles from './Panel.module.css'

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
    icon: '🖥️',
    name: 'YaMiPc',
    description: '1152×384 px · publicidad de YaMiPc Computación',
    path: '/yamipc',
  },
]

function Panel() {
  const [abierto, setAbierto] = useState<'widgets' | 'saludos' | null>(null)
  const cerrar = () => setAbierto(null)

  return (
    <div className={`${base.landing} ${styles.panel}`}>
      <Nav />
      <main className={`${base.container} ${base.section}`}>
        <p className={base.eyebrow}>Administración</p>
        <h1 className={base.heading}>Panel YaMiPc</h1>
        <p className={base.lead}>Widgets para la pantalla y administración.</p>

        <div className={styles.cards}>
          <CardGrid>
            <Card
              icon="🧩"
              title="Widgets"
              description="Módulos listos para mostrar en pantalla"
              onClick={() => setAbierto('widgets')}
            />
            <Card icon="💸" title="Gastos" description="Gastos de la pantalla" soon />
            <Card icon="🤝" title="Sponsors" description="Anunciantes de la pantalla" soon />
          </CardGrid>
        </div>

        <Modal open={abierto === 'widgets'} title="Widgets" onClose={cerrar}>
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
            {/* Saludos no abre directo: primero se arma el saludo en su formulario. */}
            <Card
              icon="🎉"
              title="Saludos"
              description="1152×384 px · cumpleaños, aniversarios y más"
              onClick={() => setAbierto('saludos')}
            />
          </CardGrid>
        </Modal>

        <Modal open={abierto === 'saludos'} title="Nuevo saludo" onClose={cerrar}>
          <SaludoForm />
        </Modal>
      </main>
    </div>
  )
}

export default Panel
