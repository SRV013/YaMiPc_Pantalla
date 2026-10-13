import ClimaFull from './pages/ClimaFull.tsx'
import ClimaSmall from './pages/ClimaSmall.tsx'
import Home from './pages/Home.tsx'

function App() {
  const path = window.location.pathname

  if (path === '/climasmall') return <ClimaSmall />
  if (path === '/climafull') return <ClimaFull />
  return <Home />
}

export default App
