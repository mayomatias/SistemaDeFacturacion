import { useState } from 'react'
import FormularioDeFacturacion from './components/FormularioDeFacturacion/FormularioDeFacturacion'
import FormularioDeFacturacionBeta from './components/FormularioDeFacturacionBeta/FormularioDeFacturacionBeta'

function App() {
  const [count, setCount] = useState(0)

  return (
      <FormularioDeFacturacionBeta />
  )
}

export default App
