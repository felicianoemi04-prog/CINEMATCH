import { Link } from "react-router-dom";
import { ContestoReduce } from "../Contestoreduce"; // Usiamo il contesto del dispatch
import { useContext } from "react";
import { Generiammessi } from "../script/Suggerimenti";

type BottoneProps = {
  genere: string;
}

function Bottone({ genere }: BottoneProps) {
  const dispatch = useContext(ContestoReduce) as any; // Prende il dispatch corretto

  return (
    <button onClick={() => dispatch({ type: 'agg_gusti', value: genere })}>
      {genere}
    </button>
  );
}

export default function Pagsceltapiat() {
  return (
    <>
      {/* Usiamo le parentesi tonde e aggiungiamo la key */}
      {Generiammessi.map((g) => (
        <Bottone key={g} genere={g} />
      ))}

      <p>ciao</p>
      <Link to="/esplora">Vai a esplora</Link>
    </>
  );
}
