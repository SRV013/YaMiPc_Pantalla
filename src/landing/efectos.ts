import { useEffect, useRef, useState } from 'react'

/**
 * Progreso del scroll a través de una sección alta con contenido fijo (sticky): 0 cuando la
 * sección llega arriba (o, con `desdeQueAsoma`, cuando entra por abajo) y 1 cuando termina de pasar. Lo deja en la variable CSS --p de la sección,
 * así los estilos animan sin volver a dibujar React en cada cuadro. Con `pasos`, devuelve además
 * en qué tramo está (0, 1, 2…), para cambiar de texto o de foto.
 */
export function useProgreso<T extends HTMLElement>(pasos = 0, desdeQueAsoma = false) {
  const ref = useRef<T>(null)
  const [paso, setPaso] = useState(0)

  useEffect(() => {
    const seccion = ref.current
    if (!seccion) return
    let id = 0

    const medir = () => {
      id = 0
      const caja = seccion.getBoundingClientRect()
      // Con `desdeQueAsoma`, el avance empieza apenas la sección entra por abajo de la pantalla.
      const inicio = desdeQueAsoma ? window.innerHeight : 0
      const recorrido = caja.height - window.innerHeight + inicio
      const p = recorrido > 0 ? Math.min(1, Math.max(0, (inicio - caja.top) / recorrido)) : caja.top < window.innerHeight ? 1 : 0
      seccion.style.setProperty('--p', p.toFixed(4))
      if (pasos) setPaso(Math.min(pasos - 1, Math.floor(p * pasos)))
    }
    const pedir = () => {
      if (!id) id = requestAnimationFrame(medir)
    }

    medir()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
      cancelAnimationFrame(id)
    }
  }, [pasos, desdeQueAsoma])

  return { ref, paso }
}

/** true la primera vez que el elemento entra en pantalla. */
export function useVisible<T extends HTMLElement>(umbral = 0.2) {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return
    const observador = new IntersectionObserver(
      ([entrada]) => {
        if (entrada.isIntersecting) {
          setVisible(true)
          observador.disconnect()
        }
      },
      { threshold: umbral },
    )
    observador.observe(elemento)
    return () => observador.disconnect()
  }, [umbral])

  return { ref, visible }
}

/** true en pantallas de celular (hasta 760 px de ancho), y se actualiza si cambia. */
export function useEsCelular() {
  const consulta = '(max-width: 760px)'
  const [celular, setCelular] = useState(() => typeof window !== 'undefined' && window.matchMedia(consulta).matches)

  useEffect(() => {
    const mq = window.matchMedia(consulta)
    const cambiar = () => setCelular(mq.matches)
    cambiar()
    mq.addEventListener('change', cambiar)
    return () => mq.removeEventListener('change', cambiar)
  }, [])

  return celular
}

/**
 * Pasa de foto con el gesto de costado del touchpad (o Shift + rueda) mientras el mouse está
 * encima. Un gesto = una foto. El gesto vertical no se toca: la página sigue bajando normal.
 */
export function useRuedaLateral<T extends HTMLElement>(onPaso: (sentido: 1 | -1, elemento: T) => void) {
  const ref = useRef<T>(null)
  const pasoRef = useRef(onPaso)
  useEffect(() => {
    pasoRef.current = onPaso
  })

  useEffect(() => {
    const elemento = ref.current
    if (!elemento) return
    let bloqueado = false
    let id = 0
    const rueda = (e: WheelEvent) => {
      // Shift + rueda del mouse llega como vertical en algunos navegadores.
      const dx = e.shiftKey && !e.deltaX ? e.deltaY : e.deltaX
      if (Math.abs(dx) <= Math.abs(e.shiftKey ? 0 : e.deltaY)) return
      // Evita que el gesto de costado vuelva a la página anterior del navegador.
      e.preventDefault()
      if (bloqueado || Math.abs(dx) < 4) return
      bloqueado = true
      pasoRef.current(dx > 0 ? 1 : -1, elemento)
      // El touchpad sigue mandando eventos un rato después del gesto: se esperan antes de otro paso.
      clearTimeout(id)
      id = window.setTimeout(() => (bloqueado = false), 700)
    }
    elemento.addEventListener('wheel', rueda, { passive: false })
    return () => {
      elemento.removeEventListener('wheel', rueda)
      clearTimeout(id)
    }
  }, [])

  return ref
}
