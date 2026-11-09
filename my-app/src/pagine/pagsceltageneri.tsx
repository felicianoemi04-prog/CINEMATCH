import { Link } from "react-router-dom";
import { useState } from "react";
export default function Pagsceltageneri(){
  const [stato,setstato()]=useState([])
  function nuovostato(){

  }
  return (
    <>
    <p>Qui scegli il genere</p>
    <button onToggle{()=>setstato}
    <Link to="/esplora/sceglipiattaforma">Avanti</Link>
    </>
  )
}
