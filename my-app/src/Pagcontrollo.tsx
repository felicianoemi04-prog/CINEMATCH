import { useContext } from "react";
import { ContestoStato } from "./Contestostato";

export default function PagControllo() {
  // Se lo stato è undefined, significa che il Provider non avvolge questa pagina
  const state = useContext(ContestoStato);
  if (!state) {
    return (
      <div style={{ padding: "20px", color: "red", fontFamily: "sans-serif" }}>
        <h2>Errore: Contesto non trovato!</h2>
        <p>
          Il valore di `ContestoStato` è undefined. Assicurati che il Provider
          sia posizionato nel punto più alto dell'applicazione (es. in
          `main.tsx` o `App.tsx`).
        </p>
      </div>
    );
  }

  return <div>{JSON.stringify(state, null, 2)}</div>;
}
