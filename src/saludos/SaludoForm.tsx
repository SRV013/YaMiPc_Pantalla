import { useEffect, useRef, useState } from 'react'
import SaludoView from './SaludoView.tsx'
import { LIMITES, TIPOS, linkDeSaludo, type Saludo, type TipoSaludo } from './saludos.ts'
import styles from './SaludoForm.module.css'

const VACIO: Saludo = { tipo: 'cumpleanos', para: '', mensaje: '', de: '' }

// Escala para que el saludo de 1152 px de ancho entre en la caja de la vista previa.
function useEscala() {
  const ref = useRef<HTMLDivElement>(null)
  const [escala, setEscala] = useState(0.5)

  useEffect(() => {
    const caja = ref.current
    if (!caja) return
    const observer = new ResizeObserver(([entry]) => setEscala(entry.contentRect.width / 1152))
    observer.observe(caja)
    return () => observer.disconnect()
  }, [])

  return { ref, escala }
}

/** Arma un saludo con vista previa y da el link para abrirlo en la pantalla. */
function SaludoForm() {
  const [saludo, setSaludo] = useState(VACIO)
  const [copiado, setCopiado] = useState(false)
  const { ref, escala } = useEscala()
  const listo = saludo.para.trim() !== ''
  const link = listo ? linkDeSaludo({ ...saludo, para: saludo.para.trim() }) : ''

  function cambiar(campo: keyof Saludo, valor: string) {
    setSaludo((actual) => ({ ...actual, [campo]: valor }))
    setCopiado(false)
  }

  async function copiar() {
    try {
      await navigator.clipboard.writeText(new URL(link, window.location.origin).href)
      setCopiado(true)
    } catch {
      setCopiado(false)
    }
  }

  return (
    <div className={styles.form}>
      {/* Vista previa: el saludo real de 1152 × 384, achicado para que entre en el modal. */}
      <div ref={ref} className={styles.preview} aria-label="Vista previa del saludo">
        <div className={styles.escala} style={{ transform: `scale(${escala})` }}>
          <SaludoView saludo={{ ...saludo, para: saludo.para || 'Nombre' }} />
        </div>
      </div>

      <div className={styles.campos}>
        <label className={styles.campo}>
          <span>Tipo</span>
          <select value={saludo.tipo} onChange={(e) => cambiar('tipo', e.target.value as TipoSaludo)}>
            {Object.entries(TIPOS).map(([id, tipo]) => (
              <option key={id} value={id}>
                {tipo.nombre}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.campo}>
          <span>Para</span>
          <input
            value={saludo.para}
            maxLength={LIMITES.para}
            placeholder="Ej.: Martina"
            onChange={(e) => cambiar('para', e.target.value)}
            required
          />
        </label>
        <label className={styles.campo}>
          <span>Mensaje (opcional)</span>
          <input
            value={saludo.mensaje}
            maxLength={LIMITES.mensaje}
            placeholder="Ej.: ¡Feliz 15!"
            onChange={(e) => cambiar('mensaje', e.target.value)}
          />
        </label>
        <label className={styles.campo}>
          <span>De parte de (opcional)</span>
          <input
            value={saludo.de}
            maxLength={LIMITES.de}
            placeholder="Ej.: Tu familia"
            onChange={(e) => cambiar('de', e.target.value)}
          />
        </label>
      </div>

      <div className={styles.acciones}>
        {listo ? (
          <a className={styles.principal} href={link} target="_blank" rel="noreferrer">
            Abrir en la pantalla
          </a>
        ) : (
          <span className={styles.ayuda}>Escribí para quién es el saludo.</span>
        )}
        <button type="button" className={styles.secundario} onClick={copiar} disabled={!listo}>
          {copiado ? 'Link copiado' : 'Copiar link'}
        </button>
      </div>
    </div>
  )
}

export default SaludoForm
