import { useEffect, useState } from 'react'
import SaludoView from '../saludos/SaludoView.tsx'
import { PROGRAMADOS } from '../saludos/programados.ts'
import { saludoDesdeLink, saludosDeHoy } from '../saludos/saludos.ts'
import YaMiPc from './YaMiPc.tsx'
import styles from './Saludos.module.css'

const ROTACION_MS = 10 * 1000

// Un saludo en el link tiene prioridad; si no hay, salen los programados para hoy.
function saludosAMostrar() {
  const delLink = saludoDesdeLink(window.location.search)
  return delLink ? [delLink] : saludosDeHoy(PROGRAMADOS)
}

function Saludos() {
  const [saludos] = useState(saludosAMostrar)
  const [actual, setActual] = useState(0)

  useEffect(() => {
    if (saludos.length < 2) return
    const id = setInterval(() => setActual((i) => (i + 1) % saludos.length), ROTACION_MS)
    return () => clearInterval(id)
  }, [saludos.length])

  // Sin saludos para hoy, la pantalla muestra la publicidad de YaMiPc.
  if (saludos.length === 0) return <YaMiPc />

  return (
    <main className={styles.pantalla}>
      {/* La key reinicia el fundido de entrada en cada cambio. */}
      <div key={actual} className={styles.entrada}>
        <SaludoView saludo={saludos[actual]} />
      </div>
    </main>
  )
}

export default Saludos
