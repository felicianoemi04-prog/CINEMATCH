import { useState } from "react";
import Box2_gemini from "./Box2_gemini";

type Pag2Props = {
  onIndietro: () => void;
  onProsegui: (piattaformeScelte: string[]) => void;
};

export default function Pag2_gemini({ onIndietro, onProsegui }: Pag2Props) {
  const piattaforme = [
    { nome: "Netflix", icona: "🍿" },
    { nome: "Prime Video", icona: "📦" },
    { nome: "Disney+", icona: "✨" },
    { nome: "Apple TV+", icona: "🍏" },
    { nome: "Paramount+", icona: "⭐" },
    { nome: "NOW", icona: "📺" },
    { nome: "RaiPlay", icona: "🔵" },
    { nome: "Mediaset Infinity", icona: "🔶" },
    { nome: "MUBI", icona: "🎞️" },
    { nome: "YouTube", icona: "▶️" },
    { nome: "Crunchyroll", icona: "🍜" },
    { nome: "Altro / Nessuno", icona: "🌐" },
  ];

  const [selezionati, setSelezionati] = useState<string[]>([]);

  const togglePiattaforma = (nome: string) => {
    setSelezionati((prev) =>
      prev.includes(nome)
        ? prev.filter((item) => item !== nome)
        : [...prev, nome]
    );
  };

  const handleContinua = () => {
    onProsegui(selezionati);
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
      }}
    >
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
        A COSA SEI ABBONATO?
      </h1>
      <p
        style={{
          fontSize: "0.95rem",
          color: "#726659",
          marginBottom: "32px",
          textAlign: "center",
        }}
      >
        Indica i servizi che utilizzi per filtrare i contenuti disponibili
      </p>

      {/* Griglia Piattaforme */}
      <div
        style={{
          width: "100%",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
          gap: "14px",
          marginBottom: "40px",
        }}
      >
        {piattaforme.map((p) => (
          <Box2_gemini
            key={p.nome}
            nome={p.nome}
            icona={p.icona}
            selezionato={selezionati.includes(p.nome)}
            onToggle={() => togglePiattaforma(p.nome)}
          />
        ))}
      </div>

      {/* Pulsanti Navigazione */}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
        }}
      >
        <button
          type="button"
          onClick={onIndietro}
          style={{
            padding: "12px 24px",
            backgroundColor: "transparent",
            color: "#726659",
            border: "1.5px solid #d4c8b8",
            borderRadius: "12px",
            fontSize: "0.95rem",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
            <button type="button" onClick={onIndietro}>
              ← Indietro
            </button>
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
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
              boxShadow: selezionati.length === 0 ? "none" : "0 4px 14px rgba(184, 58, 44, 0.35)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            PROSEGUI <span>→</span>
          </button>
        </div>
      </div>
    </main>
  );
}