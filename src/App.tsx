import ClimaFull from './pages/ClimaFull.tsx'
import ClimaSmall from './pages/ClimaSmall.tsx'
import Dolar from './pages/Dolar.tsx'
import Landing from './landing/Landing.tsx'
import Marea from './pages/Marea.tsx'
import Panel from './pages/Panel.tsx'
import Reloj from './pages/Reloj.tsx'
import Saludos from './pages/Saludos.tsx'
import YaMiPc from './pages/YaMiPc.tsx'

function App() {
  const path = window.location.pathname

  if (path === '/climasmall') return <ClimaSmall />
  if (path === '/climafull') return <ClimaFull />
  if (path === '/marea') return <Marea />
  if (path === '/reloj') return <Reloj />
  if (path === '/dolar') return <Dolar />
  if (path === '/yamipc') return <YaMiPc />
  if (path === '/saludos') return <Saludos />
  if (path === '/panel') return <Panel />
  return <Landing />
}

export default App
