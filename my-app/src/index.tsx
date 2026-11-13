import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Reducer from "./Reducer";
import { useReducer } from "react";
import "./index.css";
import Pag_iniziale from "./pagine/Pag_iniziale";
import Pagsceltageneri from "./pagine/pagsceltageneri";
import Pagsceltapiat from "./pagine/pagsceltapiattaforme";
import Pag_4 from "./Pag4/pag4";
import PagControllo from "./Pagcontrollo";
import { ContestoStato } from "./Contestostato";
import { ContestoReduce } from "./Contestoreduce";
import { Generiammessi, type Stato } from "./script/Suggerimenti";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Pag_iniziale></Pag_iniziale>,
  },
  {
    path: "/esplora/sceltageneri",
    element: <Pagsceltageneri />,
  },
  {
    path: "/esplora/sceglipiattaforma",
    element: <Pagsceltapiat />,
  },
  {
    path: "/esplora",
    element: <Pag_4 />,
  },
]);
export default function Provider() {
  const giniziali = Generiammessi.map((f) => 0);
  const initialState: Stato = {
    corrente: null,
    preferiti: [],
    dispreferiti: [],
    visti: [],
    gusti: giniziali,
    piattaforme: [],
  };
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <ContestoReduce.Provider value={dispatch}>
      <ContestoStato.Provider value={state}>
        <RouterProvider router={router} />
      </ContestoStato.Provider>
    </ContestoReduce.Provider>
  );
}
