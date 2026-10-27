import { useState } from "react";
import Box1_gemini from "./Box1_gemini";

type Pag1Props = {
  onProsegui?: (generiScelti: string[]) => void;
};

export default function Pag1_gemini({ onProsegui }: Pag1Props) {
  const generi = [
    "Azione", "Commedia", "Drammatico", "Fantascienza", "Horror", "Thriller",
    "Animazione", "Romantico", "Avventura", "Documentario", "Fantasy", "Giallo", "Western",
    "Biografico", "Storico", "Musical", "Crime", "Bellico", "Noir", "Post-apocalittico",
    "Spionaggio", "Erotico", "Famiglia", "Grottesco", "Catastrofico", "Mockumentary"
  ];

  // Stato per memorizzare i generi selezionati
  const [selezionati, setSelezionati] = useState<string[]>([]);

  const toggleGenere = (genere: string) => {
    setSelezionati((prev) =>
      prev.includes(genere)
        ? prev.filter((g) => g !== genere) // deseleziona se già presente
        : [...prev, genere]                 // aggiunge se non presente
    );
  };

  const handleContinua = () => {
    if (onProsegui) {
      onProsegui(selezionati);
    } else {
      console.log("Generi scelti:", selezionati);
      alert(`Hai selezionato: ${selezionati.join(", ") || "Nessun genere"}`);
    }
  };

  return (
    <main
      style={{
        maxWidth: "960px",
        margin: "0 auto",
        padding: "40px 24px 80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        boxSizing: "border-box",
        position: "relative",
      }}
    >
      {/* Intestazione */}
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "800",
          letterSpacing: "-0.5px",
          color: "#2b2622",
          marginBottom: "8px",
          textAlign: "center",
        }}
      >
        COSA TI PIACEREBBE GUARDARE?
      </h1>
      <p
        style={{
          fontSize: "0.95rem",
          color: "#726659",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        Seleziona uno o più generi per iniziare a personalizzare il tuo feed
      </p>

      {/* Griglia delle opzioni */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
          gap: "12px",
          marginBottom: "40px",
        }}
      >
        {generi.map((f) => (
          <Box1_gemini
            key={f}
            nome={f}
            selezionato={selezionati.includes(f)}
            onToggle={() => toggleGenere(f)}
          />
        ))}
      </div>

      {/* Barra inferiore con pulsante Prosegui */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "16px",
          marginTop: "auto",
        }}
      >
        <span style={{ fontSize: "0.85rem", color: "#8a7e70" }}>
          {selezionati.length} {selezionati.length === 1 ? "selezionato" : "selezionati"}
        </span>

        <button
          type="button"
          onClick={handleContinua}
          disabled={selezionati.length === 0}
          style={{
            padding: "12px 28px",
            backgroundColor: selezionati.length === 0 ? "#c9c0b5" : "#b83a2c",
            color: "#ffffff",
            border: "none",
            borderRadius: "12px",
            fontSize: "1rem",
            fontWeight: "700",
            cursor: selezionati.length === 0 ? "not-allowed" : "pointer",
            transition: "all 0.2s ease",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            boxShadow: selezionati.length === 0 ? "none" : "0 4px 14px rgba(184, 58, 44, 0.35)",
          }}
        >
          PROSEGUI <span>→</span>
        </button>
      </div>
    </main>
  );
}