import Calcolo from "./script/Suggerimenti"
import { Catalogo } from "./data/catalogo_5000_film"
import { AggGusti, } from "./script/Suggerimenti"


export default function Reducer(state, action) {
  switch (action.type) {
    case 'like': {
      const cor = state.corrente;
      const nuovipreferiti = [...state.preferiti, cor];
      const nuovigusti: number[] = AggGusti(state.gusti, cor, "+");
      const nuovocorrente = Calcolo(Catalogo, nuovigusti, state.visti, state.piattaforme);

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
      const nuovocorrente = Calcolo(Catalogo, nuovigusti, state.visti, state.piattaforme)

      return {
        ...state,
        dispreferiti: nuovidispreferiti,
        gusti: nuovigusti,
        corrente: nuovocorrente,
      }
    }
    case "visto":
      const cor = state.corrente;
      const nuovivisti = [...state.visti, cor];
      const nuovocorrente = Calcolo(Catalogo, state.gusti, state.visti, state.piattaforme);
      return {
        ...state,
        visti: nuovivisti,
        corrente: nuovocorrente,
      }
    case "vedi":
      return state
    case "agg_piattaforma":
      const nuovepiattaforme = [...state.piattaforme, action.piattaforma]
      return {
        ...state,
        piattaforme: nuovepiattaforme
      }

    case "agg_gusti":
      const nuovigeneri = [...state.generiscelti, action.value]
      return {
        ...state,
        generiscelti: nuovigeneri
      }
     }
  }
}
