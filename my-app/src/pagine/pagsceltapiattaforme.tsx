import { useNavigate } from "react-router-dom";
import Selector from "./Botton";
import { ContestoReduce } from "../Contestoreduce"; // Usiamo il contesto del dispatch
import { useContext, useState } from "react";
import { Generiammessi } from "../script/Suggerimenti";
import { ContestoStato } from "../Contestostato";
import { Piattaforme } from "../data/data";

export default function Pagsceltapiat() {
  const [piatscelti, setpiatscelti] = useState<string[]>([]);
  const dispatch = useContext(ContestoReduce);
  const navigate = useNavigate();
  function togglepiat(id: string) {
    if (piatscelti.includes(id)) {
      setpiatscelti(piatscelti.filter((g) => g != id));
    } else {
      setpiatscelti([...piatscelti, id]);
    }
  }
  function prosegui() {
    dispatch({ type: "agg_piat", value: piatscelti });
    dispatch({ type: "agg_corrente" });
    console.log(piatscelti);
    navigate("/esplora");
  }
  return (
    <>
      {Piattaforme.map((g) => (
        <Selector id={g} key={g} func={() => togglepiat(g)}></Selector>
      ))}
      <button onClick={() => prosegui()}>Avanti</button>
    </>
  );
}
