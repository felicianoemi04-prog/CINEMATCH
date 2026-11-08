import type { Film } from "./script/Suggerimenti"
import Calcolo from "./script/Suggerimenti"
import { Catalogo } from "./data/catalogo_5000_film"
import { AggGusti } from "./script/Suggerimenti"
type state = {
  corrente: Film
  preferiti:Film[]
  dispreferiti:Film[]
  visti:Film[]
  gusti:number[]
}
type action={
  type: "like" | "dislike" | "visto" | "vedi"
}
export default function Reducer(state:state,action:action) {
  switch (action.type) {
    case 'like': {
      const cor = state.corrente;
      const nuovipreferiti = [...state.preferiti, cor];
      const nuovigusti:number[] = AggGusti(state.gusti, cor, "+");
      const nuovocorrente = Calcolo(Catalogo, nuovigusti, state.visti);

      return {
        ...state,
        preferiti: nuovipreferiti,
        gusti: nuovigusti,
        corrente: nuovocorrente,
      }
    }
    case "dislike": {
      const cor = state.corrente
      const nuovidispreferiti = [...state.dispreferiti, cor]
      const nuovigusti = AggGusti(state.gusti, cor, "-")
      const nuovocorrente = Calcolo(Catalogo, nuovigusti, state.visti)

      return {
        ...state,
        dispreferiti: nuovidispreferiti,
        gusti: nuovigusti,
        corrente: nuovocorrente,
      }
    }
    case "visto":
      const cor = state.corrente;
      const nuovivisti = [...state.visti,cor];
      const nuovocorrente = Calcolo(Catalogo, state.gusti, state.visti);
      return {
            ...state,
            visti: nuovivisti,
            corrente: nuovocorrente,
          }
    case "vedi":
    return state
  }
}
