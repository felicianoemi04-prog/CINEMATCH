import YtCard from "./YtCard";
import { ContestoStato } from "../Contestostato";
import { ContestoReduce } from "../Contestoreduce";
import { useContext } from "react";
export default function Pag_4() {
  const dispatch=useContext(ContestoReduce)
  const state=useContext(ContestoStato)
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
