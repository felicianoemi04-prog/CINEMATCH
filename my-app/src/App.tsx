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
import Pag_2 from './Pag_2'
import Pag2_gemini from './Pag2_gemini'
import Pag_1 from './Pag_1'
import Pag_3 from './Pag_3'

function App() {
  const [pagina, setPagina] = useState(1)

  const [generiScelti, setGeneriScelti] = useState<string[]>([])
  const [piattaformeScelte, setPiattaformeScelte] = useState<string[]>([])
  const [tipologiaScelta, setTipologiaScelta] = useState<string[]>([])
  return (
    <>
      {pagina === 1 && (<Pag_1 onProsegui={(generi) => { 
        setGeneriScelti(generi) 
        setPagina(2)
        }}
         />
        )}
      {pagina === 2 && (<Pag_2 onIndietro={() => setPagina(1)}
      onProsegui={(piattaforme) => {
        setPiattaformeScelte(piattaforme)
        setPagina(3)
        }}
      />
    )}

    {pagina === 3 && (
        <Pag_3 
          onIndietro={() => setPagina(2)}
          onProsegui={(tipologia) => {
            setTipologiaScelta(tipologia)
            setPagina(4)
        }}
         />
        )}
    </>
    )
}

export default App