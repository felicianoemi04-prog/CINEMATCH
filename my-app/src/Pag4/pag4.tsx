import YtCard from "./YtCard";
import { useReducer,  } from "react";
import Reducer from "../Reducer";
import Calcolo from "../script/Suggerimenti";
import { Catalogo } from "../data/catalogo_5000_film";
const primofilm=Calcolo(Catalogo,preferenza,[])
const initialState = {
  corrente : primofilm,
  preferiti :[],
  dispreferiti:[],
  visti :[],
  gusti:preferenza

}
export default function App() {
  const [state, dispatch] =useReducer(Reducer, initialState);
  return (
    <>
      <header>
        <h1>My film collection</h1>
      </header>
      <main>
        <YtCard videoId={ state.corrente.id } />
        <button onClick={() =>  dispatch({ type: 'like' }) } >like</button>
        <button onClick={() =>  dispatch({ type: 'dislike' }) } >dislike</button>
        <button onClick={() =>  dispatch({ type: 'visto' }) } >visto</button>
        <button onClick={() =>  dispatch({ type: 'vedi' }) } >vedi</button>
      </main>
    </>
  );
}
