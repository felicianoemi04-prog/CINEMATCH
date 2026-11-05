import { useState } from "react";
import Box_pag1 from "./Box_pag1";

type Pag3Props = {
  onIndietro: () => void;
  onProsegui: (tipologiaScelta: string) => void;
};

export default function Pag_3({ onIndietro, onProsegui }: Pag3Props) {
  const tipologie = [
    { id: "film", nome: "Film" },
    { id: "serie", nome: "Serie" },
    { id: "corto", nome: "Cortometraggio" },
  ];

  // Assuming single selection for tipologia, or use string[] if they can pick multiple
  const [selezionata, setSelezionata] = useState<string>("");

  return (
    <main>
      <h1>COSA VUOI GUARDARE?</h1>

      <div className="griglia-opzioni">
        {tipologie.map((t) => (
          <Box_pag1
            key={t.id}
            nome={t.nome}
            selezionato={selezionata === t.id}
            onToggle={() => setSelezionata(t.id)}
          />
        ))}
      </div>

      <div className="barra-azioni">
        <button type="button" onClick={onIndietro}>
          INDIETRO
        </button>
        <button 
          type="button" 
          disabled={!selezionata} 
          onClick={() => onProsegui(selezionata)}
        >
          PROSEGUI
        </button>
      </div>
    </main>
  );
}