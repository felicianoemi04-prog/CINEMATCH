import Calcolo from "./script/Suggerimenti";
import { Catalogo } from "./data/catalogo_5000_film";
import { AggGusti } from "./script/Suggerimenti";
import { converti } from "./script/Suggerimenti";
type action =
  | { type: "like" }
  | { type: "dislike" }
  | { type: "visto" }
  | { type: "visto" }
  | { type: "vedi" }
  | { type: "agg_gusti"; value: string[] }
  | { type: "agg_piat"; value: string[] }
  | { type: "agg_corrente" };

export default function Reducer(state, action: action) {
  switch (action.type) {
    case "like": {
      const cor = state.corrente;
      const nuovipreferiti = [...state.preferiti, cor];
      const nuovigusti: number[] = AggGusti(state.gusti, cor, "+");
      const nuovocorrente = Calcolo(
        Catalogo,
        nuovigusti,
        state.visti,
        state.piattaforme,
      );

      return {
        ...state,
        preferiti: nuovipreferiti,
        gusti: nuovigusti,
        corrente: nuovocorrente,
      };
    }
    case "dislike": {
      const cor = state.corrente;
      const nuovidispreferiti = [...state.dispreferiti, cor];
      const nuovigusti = AggGusti(state.gusti, cor, "-");
      const nuovocorrente = Calcolo(
        Catalogo,
        nuovigusti,
        state.visti,
        state.piattaforme,
      );

      return {
        ...state,
        dispreferiti: nuovidispreferiti,
        gusti: nuovigusti,
        corrente: nuovocorrente,
      };
    }
    case "visto":
      const cor = state.corrente;
      const nuovivisti = [...state.visti, cor];
      const nuovocorrente = Calcolo(
        Catalogo,
        state.gusti,
        nuovivisti,
        state.piattaforme,
      );
      return {
        ...state,
        visti: nuovivisti,
        corrente: nuovocorrente,
      };
    case "vedi":
      return state;
    case "agg_piat":
      return {
        ...state,
        piattaforme: action.value,
      };

    case "agg_gusti":
      const nuovigusti = converti(action.value);
      console.log(nuovigusti);
      return {
        ...state,
        gusti: nuovigusti,
      };
    case "agg_corrente": {
      const nuovocorrente = Calcolo(
        Catalogo,
        state.gusti,
        state.visti,
        state.piattaforme,
      );
      return {
        ...state,
        corrente: nuovocorrente,
      };
    }
  }
}
