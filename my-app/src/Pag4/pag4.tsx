import YtCard from "./YtCard";
import { ContestoStato } from "../Contestostato";
import { ContestoReduce } from "../Contestoreduce";
import { useContext } from "react";
export default function Pag_4() {
  function vedi() {
    dispatch({ type: "visto" });
    window.open(state.url, "blank");
  }
  const dispatch = useContext(ContestoReduce);
  const state = useContext(ContestoStato);
  return (
    <>
      <header>
        <h1>My film collection</h1>
      </header>
      <main>
        {state.corrente != null ? (
          <>
            <YtCard videoId={state.corrente.trailer} />
            <button onClick={() => dispatch({ type: "like" })}>like</button>
            <button onClick={() => dispatch({ type: "dislike" })}>
              dislike
            </button>
            <button onClick={() => dispatch({ type: "visto" })}>visto</button>
            <button onClick={() => vedi()}>vedi</button>
          </>
        ) : (
          <p>Hai finito i film</p>
        )}
        <div>{JSON.stringify(state, null, 2)}</div>;
      </main>
    </>
  );
}
