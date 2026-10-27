type BoxProps = {
  nome: string;
  selezionato: boolean;
  onToggle: () => void;
};

export default function Box_pag2({ nome, selezionato, onToggle }: BoxProps) {
  return (
    <button 
      type="button" 
      className={selezionato ? "box-selezionata" : "box"} 
      onClick={onToggle}
    >
      {nome}
    </button>
  );
}
