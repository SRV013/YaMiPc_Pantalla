import ClimaFull from './pages/ClimaFull.tsx'
import ClimaSmall from './pages/ClimaSmall.tsx'
import Dolar from './pages/Dolar.tsx'
import Home from './pages/Home.tsx'
import Marea from './pages/Marea.tsx'
import Reloj from './pages/Reloj.tsx'
import Resumen from './pages/Resumen.tsx'

function App() {
  const path = window.location.pathname

  if (path === '/climasmall') return <ClimaSmall />
  if (path === '/climafull') return <ClimaFull />
  if (path === '/marea') return <Marea />
  if (path === '/reloj') return <Reloj />
  if (path === '/dolar') return <Dolar />
  if (path === '/resumen') return <Resumen />
  return <Home />
}

export default App
