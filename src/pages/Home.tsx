import { useState } from 'react'
import Card from '../components/Card.tsx'
import CardGrid from '../components/CardGrid.tsx'
import Hero from '../components/Hero.tsx'
import Modal from '../components/Modal.tsx'
import styles from './Home.module.css'

type Section = {
  icon: string
  name: string
  description: string
  models: { icon: string; name: string; description: string; path: string }[]
}

const sections: Section[] = [
  {
    icon: '🧩',
    name: 'Widgets',
    description: 'Módulos listos para mostrar en pantalla',
    models: [
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
        name: 'Resumen general',
        description: '1152×384 px · feriado, efemérides e indicadores',
        path: '/resumen',
      },
    ],
  },
]

function Home() {
  const [selected, setSelected] = useState<Section | null>(null)
  // Se conserva la última sección para que el contenido no desaparezca mientras el modal se cierra.
  const [shown, setShown] = useState<Section>(sections[0])

  function open(section: Section) {
    setShown(section)
    setSelected(section)
  }

  return (
    <main className={styles.home}>
      <Hero
        eyebrow="YaMiPc"
        title="Proyecto Pantalla"
        subtitle="Elegí qué querés mostrar en la pantalla."
      />

      <CardGrid>
        {sections.map((section) => (
          <Card
            key={section.name}
            icon={section.icon}
            title={section.name}
            description={section.description}
            onClick={() => open(section)}
          />
        ))}
      </CardGrid>

      <Modal open={selected !== null} title={shown.name} onClose={() => setSelected(null)}>
        <CardGrid>
          {shown.models.map((model) => (
            <Card
              key={model.path}
              icon={model.icon}
              title={model.name}
              description={model.description}
              href={model.path}
            />
          ))}
        </CardGrid>
      </Modal>
    </main>
  )
}

export default Home
