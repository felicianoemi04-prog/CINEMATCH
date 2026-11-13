import Calcolo, { type Stato } from "./script/Suggerimenti";
import { Catalogo } from "./data/catalogo_5000_film";
import { AggGusti } from "./script/Suggerimenti";
import { converti } from "./script/Suggerimenti";
type action =
  | { type: "like"; payload: number }
  | { type: "dislike"; payload: number }
  | { type: "visto"; payload: number }
  | { type: "vedi"; payload: number }
  | { type: "agg_gusti"; value: string[] }
  | { type: "agg_piat"; value: string[] }
  | { type: "set_corrente" };

export default function Reducer(state: Stato, action: action) {
  switch (action.type) {
    case "like": {
      const cor = state.corrente;
      const nuovipreferiti = [...state.preferiti, cor.id];
      const nuovigusti: number[] = AggGusti(state.gusti, cor, "+");
      const nuovocorrente = Calcolo(
        Catalogo,
        nuovigusti,
        state.visti,
        state.piattaforme,
        nuovipreferiti,
        state.dispreferiti,
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
      const nuovidispreferiti = [...state.dispreferiti, cor.id];
      const nuovigusti = AggGusti(state.gusti, cor, "-");
      const nuovocorrente = Calcolo(
        Catalogo,
        nuovigusti,
        state.visti,
        state.piattaforme,
        state.preferiti,
        nuovidispreferiti,
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
        state.preferiti,
        state.dispreferiti,
      );
      return {
        ...state,
        visti: nuovivisti,
        corrente: nuovocorrente,
      };
    case "vedi": {
      const p = state.corrente.piattaforma;
      const query = encodeURIComponent(state.corrente.nome);
      let url = "";

      if (p.includes("netflix")) {
        url = `https://www.netflix.com/search?q=${query}`;
      } else if (
        p.includes("amazon prime video") ||
        p.includes("amazon video")
      ) {
        url = `https://www.amazon.com/s?k=${query}&i=instant-video`;
      } else if (p.includes("apple tv store")) {
        url = `https://tv.apple.com/it/search?term=${query}`;
      } else if (p.includes("disney plus")) {
        url = `https://www.disneyplus.com/search/${query}`;
      } else if (p.includes("sky go")) {
        url = `https://skygo.sky.it/`;
      } else if (p.includes("crunchyroll")) {
        url = `https://www.crunchyroll.com/search?q=${query}`;
      } else if (p.includes("mubi")) {
        url = `https://mubi.com/it/search/films?query=${query}`;
      } else if (p.includes("timvision")) {
        url = `https://www.timvision.it/search/${query}`;
      } else if (p.includes("rakuten tv")) {
        url = `https://rakuten.tv/it/search?q=${query}`;
      } else if (p.includes("midnight factory")) {
        url = `https://www.amazon.com/s?k=${query}&i=instant-video`; // Canale Prime Video
      } else if (p.includes("anime generation")) {
        url = `https://www.amazon.com/s?k=${query}&i=instant-video`; // Canale Prime Video
      } else if (p.includes("hbo max")) {
        url = `https://www.max.com/search?q=${query}`;
      } else if (p.includes("lionsgate+")) {
        url = `https://www.amazon.com/s?k=${query}&i=instant-video`;
      } else if (p.includes("cg tv streaming")) {
        url = `https://www.cgtv.it/`;
      } else if (p.includes("mymovies one")) {
        url = `https://www.mymovies.it/ondemand/one/`;
      } else if (p === "non disponibile") {
        url = null; // Film non disponibile su piattaforme di streaming indicate
      }
      return {
        ...state,
        url: url,
      };
    }
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
    case "set_corrente": {
      const nuovocorrente = Calcolo(
        Catalogo,
        state.gusti,
        state.visti,
        state.piattaforme,
        state.preferiti,
        state.dispreferiti,
      );
      return {
        ...state,
        corrente: nuovocorrente,
      };
    }
  }
}
