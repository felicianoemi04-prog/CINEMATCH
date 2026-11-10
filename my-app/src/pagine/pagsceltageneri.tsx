import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import Selector from "./Botton";
import { ContestoReduce } from "../Contestoreduce";
import { ContestoStato } from "../Contestostato";
import { Generiammessi } from "../script/Suggerimenti";

export default function Pagsceltageneri() {
  const [genscelti, setgenscelti] = useState<string[]>([]);
  const dispatch = useContext(ContestoReduce);
  const navigate = useNavigate();
  const stato = useContext(ContestoStato);
  function toggleGeneri(id: string) {
    if (genscelti.includes(id)) {
      setgenscelti(genscelti.filter((g) => g != id));
    } else {
      setgenscelti([...genscelti, id]);
    }
  }
  function prosegui() {
    dispatch({ type: "agg_gusti", value: genscelti });
    console.log(stato);
    console.log(genscelti);
    navigate("/esplora/sceglipiattaforma");
  }
  return (
    <>
      {Generiammessi.map((g) => (
        <Selector id={g} key={g} func={() => toggleGeneri(g)}></Selector>
      ))}
      <button onClick={() => prosegui()}>Avanti</button>
    </>
  );
}
