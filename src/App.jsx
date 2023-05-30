import { useState } from 'react'
import FormularioDeFacturacion from './components/FormularioDeFacturacion'


function App() {
  const [count, setCount] = useState(0)

  return (
      <FormularioDeFacturacion />
  )
}

export default App
