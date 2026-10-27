{/*
type Boxprops={
    nome: string,
}
export default function Box_pag1({nome}: Boxprops) {

  return (
    <div>{nome}</div>
  )
}
*/}


type BoxProps = {
  nome: string;
  selezionato: boolean;
  onToggle: () => void;
};

export default function Box_pag1({ nome, selezionato, onToggle }: BoxProps) {
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