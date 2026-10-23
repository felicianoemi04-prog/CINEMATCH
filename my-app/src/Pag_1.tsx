import Box_pag1 from "./box_pag1"
export default function Pag_1() {
const generi=[ "Azione", "Commedia", "Drammatico", "Fantascienza", "Horror", "Thriller",
     "Animazione", "Romantico", "Avventura", "Documentario", "Fantasy", "Giallo", "Western",
      "Biografico", "Storico", "Musical", "Crime", "Bellico", "Noir","Post-apocalittico", 
      "Spionaggio", "Erotico", "Famiglia", "Grottesco", "Catastrofico", "Mockumentary"]

  return (
    <>
    <head>
    <title>Cinematch</title>
    </head>
    <main>
        <h1> COSA TI PIACEREBBE GUARDARE?</h1>
        {/*
        <Box_pag1 nome= 'Azione'></Box_pag1>
        <Box_pag1 nome= 'Commedia'></Box_pag1>
        <Box_pag1 nome= 'Fantascienza'></Box_pag1>
        <Box_pag1 nome= 'Drammatico'></Box_pag1>
        <Box_pag1 nome= 'Thriller'></Box_pag1>
        <Box_pag1 nome= 'Horror'></Box_pag1>
        <Box_pag1 nome= 'Animazione'></Box_pag1>
        <Box_pag1 nome= 'Romantico'></Box_pag1>
        <Box_pag1 nome= 'Documentario'></Box_pag1>
        <Box_pag1 nome= 'Giallo'></Box_pag1>
        <Box_pag1 nome= 'Musical'></Box_pag1>
    */}
    
    {generi.map(f=><Box_pag1 nome= {f}></Box_pag1>)}
    
    </main>
    </>
  )
}