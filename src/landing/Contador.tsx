import { useEffect, useState } from 'react'
import { useVisible } from './efectos.ts'

const DURACION_MS = 1600

/** Un número que cuenta desde cero hasta su valor cuando aparece en pantalla. */
function Contador({ hasta, prefijo = '', sufijo = '' }: { hasta: number; prefijo?: string; sufijo?: string }) {
  const { ref, visible } = useVisible<HTMLSpanElement>(0.5)
  const [valor, setValor] = useState(0)

  useEffect(() => {
    if (!visible) return
    // Sin animaciones, el primer cuadro ya muestra el valor final.
    const duracion = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 1 : DURACION_MS
    const inicio = performance.now()
    let id = 0
    const cuadro = (ahora: number) => {
      const t = Math.min(1, (ahora - inicio) / duracion)
      // Arranca rápido y frena al final.
      setValor(Math.round(hasta * (1 - Math.pow(1 - t, 3))))
      if (t < 1) id = requestAnimationFrame(cuadro)
    }
    id = requestAnimationFrame(cuadro)
    return () => cancelAnimationFrame(id)
  }, [visible, hasta])

  return (
    <span ref={ref}>
      {prefijo}
      {valor.toLocaleString('es-AR')}
      {sufijo}
    </span>
  )
}

export default Contador
