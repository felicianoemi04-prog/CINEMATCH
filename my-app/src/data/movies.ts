type Film = {
  nome: string;
  regista: string;
  tipologia: "film" | "serie"| "corto";
  generi: number[];
  piattaforma: string;
  id: number;
  url: string;
  anno: number;
  lingua: string;
};

export const generi: string[] = [
    "Azione", "Commedia", "Drammatico", "Fantascienza", "Horror", "Thriller",
    "Animazione", "Romantico", "Avventura", "Documentario", "Fantasy", "Giallo", "Western",
    "Biografico", "Storico", "Musical", "Crime", "Noir", "Post-apocalittico",
    "Spionaggio", "Famiglia", "Catastrofico", "Mockumentary"
  ];

  export function creaVettorePreferenze(generiSelezionati: string[]): number[] {
  return generi.map((genere) => (generiSelezionati.includes(genere) ? 1 : 0));
}

export const LISTA_FILM: Film[] = [
  {
    id: 1,
    nome: "I Don't Feel at Home in This World Anymore",
    regista: "Macon Blair",
    tipologia: "film",
    url: "https://www.netflix.com/title/80100937",
    piattaforma: "Netflix",
    anno: 2017,
    lingua: "inglese",
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0]

    },

  {
    id: 2,
    nome: "La montaña sagrada",
    regista: "Alejandro Jodorowsky",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 1973,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre
    lingua: "Spagnolo", 
    //{/* ##in prime video it is in italiano e cè un altro posto dove guardare gratis */}
  },

  {
    id: 3,
    nome: "Maurice",
    regista: "James Ivory",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 1987,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama, romance, LGBTQ relationships, emotional teen and coming of age, heartfelt
    lingua: "Spagnolo", 
    //fix lingua, piattaforma, url
  }, 

  {
    id: 4,
    nome: "J'ai tué ma mère",
    regista: "Xavier Dolan",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2009,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama, moving relationship, coming-of-age, emotional and heartfelt
    lingua: "Francese", 
    //{fix piattaforma, url 
  },

    {
    id: 5,
    nome: "La Vampire Nue",
    regista: "Jean Rollin",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 1970,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → science fiction, horror
    lingua: "Francese", 
    //{fix piattaforma, url 
  },

  {
    id: 6,
    nome: "Maliglutit", //searchers (non so se mettere il tittolo in originale, inglese o italiano?)
    regista: "Zacharias Kunuk",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 1970,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → action, drama, history
    lingua: "Inuktitut", // ?
    //{fix piattaforma, url , anno 
  },

   {
    id: 7,
    nome: "Pieces of April", 
    regista: "Peter Hedges",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 1970,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → comedy, drama, moving relationship stories
    lingua: "Inglese", // ?
    //{fix piattaforma, url, anno
  },

    {
    id: 8,
    nome: "I Was a Teenage Girl", 
    regista: "Augustine Frizzell",
    tipologia: "corto",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2014,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama
    lingua: "Inglese",
    //{fix piattaforma, url 
  },

  {
    id: 9,
    nome: "Jongens", 
    regista: "Mischa Kamp",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2014,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → TV movie, drama, romance, lgbt
    lingua: "Dutch",
    //{fix piattaforma, url, lingua
  },


  {
    id: 10,
    nome: "Kiss of the Rabbit God", 
    regista: "Andrew Huang",
    tipologia: "corto",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.16b12dd2-31a6-d751-444c-2a7ae4efbf6c?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2019,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → fantasy, romance
    lingua: "Cinese",
    //{fix piattaforma, url
  },

];


