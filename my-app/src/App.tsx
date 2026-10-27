{/*
import './App.css'
import Pag_1 from './Pag_1'
import Pag_2 from "./Pag_2";

function App() {

  return (
    <>
      <Pag_1> 

      </Pag_1>
    </>
  )
}

export default App





import './App.css'
import Pag1_gemini from './Pag1_gemini'
import Pag2_gemini from './Pag2_gemini'


{/*
function App() {

  return (
    <>
      <Pag1_gemini> 
      
      </Pag1_gemini>
    </>
)
}

export default App
*/}

import { useState } from 'react'
import './App.css'
import Pag1_gemini from './Pag1_gemini'
import Pag2_gemini from './Pag2_gemini'

function App() {
  const [pagina, setPagina] = useState(1)

  return (
    <>
      {pagina === 1 && <Pag1_gemini onProsegui={() => setPagina(2)} />}
      {pagina === 2 && (<Pag2_gemini onIndietro={() => setPagina(1)}onProsegui={() => setPagina(3)} />)}
    </>
  )
}

export default App