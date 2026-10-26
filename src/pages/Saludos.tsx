import { useEffect, useState } from 'react'
import SaludoView from '../saludos/SaludoView.tsx'
import { useSaludosGuardados } from '../saludos/guardados.ts'
import { PROGRAMADOS } from '../saludos/programados.ts'
import { saludoDesdeLink, saludosDeHoy } from '../saludos/saludos.ts'
import YaMiPc from './YaMiPc.tsx'
import styles from './Saludos.module.css'

const ROTACION_MS = 10 * 1000

const DEL_LINK = saludoDesdeLink(window.location.search)

// Un saludo en el link tiene prioridad; si no hay, salen los guardados y los programados para hoy.
function Saludos() {
  const { saludos: guardados } = useSaludosGuardados()
  const saludos = DEL_LINK ? [DEL_LINK] : [...guardados, ...saludosDeHoy(PROGRAMADOS)]
  const [turno, setTurno] = useState(0)
  const actual = saludos.length ? turno % saludos.length : 0

  useEffect(() => {
    if (saludos.length < 2) return
    const id = setInterval(() => setTurno((i) => i + 1), ROTACION_MS)
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
