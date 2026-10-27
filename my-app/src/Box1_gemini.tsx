type BoxProps = {
  nome: string;
  selezionato: boolean;
  onToggle: () => void;
};

export default function Box1_gemini({ nome, selezionato, onToggle }: BoxProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      style={{
        padding: "14px 18px",
        borderRadius: "14px",
        fontSize: "0.95rem",
        fontWeight: "600",
        fontFamily: "inherit",
        cursor: "pointer",
        transition: "all 0.18s ease-in-out",
        border: selezionato ? "2px solid #b83a2c" : "1.5px solid #d4c8b8",
        backgroundColor: selezionato ? "#b83a2c" : "#fdfbf7",
        color: selezionato ? "#ffffff" : "#2b2622",
        boxShadow: selezionato
          ? "0 4px 12px rgba(184, 58, 44, 0.25)"
          : "0 2px 5px rgba(0, 0, 0, 0.04)",
        transform: selezionato ? "scale(1.02)" : "scale(1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        userSelect: "none",
      }}
    >
      {nome}
    </button>
  );
}