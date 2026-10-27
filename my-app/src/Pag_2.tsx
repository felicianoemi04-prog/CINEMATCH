import { useState } from "react";
import Box_pag2 from "./Box_pag2";

type Pag2Props = {
  onIndietro: () => void;
  onProsegui: (piattaformeScelte: string[]) => void;
};

export default function Pag_2({ onIndietro, onProsegui }: Pag2Props) {
  const piattaforme = [
    "Netflix", "Prime Video", "Disney+", "Apple TV+", "Paramount+", 
    "NOW", "RaiPlay", "Mediaset Infinity", "MUBI", "YouTube", 
    "Crunchyroll", "Altro / Nessuno"
  ];

  const [selezionati, setSelezionati] = useState<string[]>([]);

  const togglePiattaforma = (piattaforma: string) => {
    setSelezionati((prev) =>
      prev.includes(piattaforma)
        ? prev.filter((p) => p !== piattaforma)
        : [...prev, piattaforma]
    );
  };

  return (
    <main>
      <h1>A COSA SEI ABBONATO?</h1>

      <div className="griglia-opzioni">
        {piattaforme.map((p) => (
          <Box_pag2
            key={p}
            nome={p}
            selezionato={selezionati.includes(p)}
            onToggle={() => togglePiattaforma(p)}
          />
        ))}
      </div>

      <div className="barra-azioni">
        <button type="button" onClick={onIndietro}>
          INDIETRO
        </button>
        <button 
          type="button" 
          disabled={selezionati.length === 0} 
          onClick={() => onProsegui(selezionati)}
        >
          PROSEGUI
        </button>
      </div>
    </main>
  );
}