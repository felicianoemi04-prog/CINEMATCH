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
  trailer?: string;
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
    url: "https://www.rakuten.tv/it/?content_type=movies&from=gmaction&uuid=111158&content_id=maurice", //gratis qua ce su prime pero per noleggio https://www.primevideo.com/-/it/detail/0G0ZB6D4887H0PNRHG0HOBDV4Z
    piattaforma: "Prime Video",
    anno: 1987,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama, romance, LGBTQ relationships, emotional teen and coming of age, heartfelt
    lingua: "Inglese", 
  }, 

  {
    id: 4,
    nome: "J'ai tué ma mère",
    regista: "Xavier Dolan",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.e2b7a443-17f6-f9ab-03b1-2e6a3dcbf42f?ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2009,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama, moving relationship, coming-of-age, emotional and heartfelt
    lingua: "Francese", 
  },

    {
    id: 5,
    nome: "La Vampire Nue",
    regista: "Jean Rollin",
    tipologia: "film",
    url: "https://www.youtube.com/watch?v=FsCIuXD4VU0",
    piattaforma: "Youtube",
    anno: 1970,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → science fiction, horror
    lingua: "Francese", //ma su youtube è in inglese penso
    //{fix piattaforma, url 
  },

  {
    id: 6,
    nome: "Maliglutit", //searchers (non so se mettere il tittolo in originale, inglese o italiano?)
    regista: "Zacharias Kunuk",
    tipologia: "film",
    url: "https://tv.apple.com/it/movie/ricercatori/umc.cmc.zb6x1c5dlqsa898m0j4dbrwl",
    piattaforma: "Apple TV",
    anno: 2016,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → action, drama, history
    lingua: "Inuktitut", // ?
  
  },

   {
    id: 7,
    nome: "Pieces of April", 
    regista: "Peter Hedges",
    tipologia: "film",
    url: "https://www.primevideo.com/-/it/detail/0N2S0MLTPAVDW9MIWDIBOMTGAU", //magari non funziona
    piattaforma: "Prime Video",
    anno: 2016,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → comedy, drama, moving relationship stories
    lingua: "Inglese",
  },

    {
    id: 8,
    nome: "I Was a Teenage Girl", 
    regista: "Augustine Frizzell",
    tipologia: "corto",
    url: "https://vimeo.com/87329515?turnstile=1.5xNhzvRAt-PKvuBl5Xy5ypw_flGZmk6bbUYh0wvo7QbUWl_h3ODTn0gcOwK0RykSjHuG2WplK61x28xxuCuDys0EzGnX8KXeBEvzhjJtPZ38UKipHGUo5gxta8NBkIM6CwWziqTLACmKGp53M5LjG0iHS5OD2UGXTLHpJ9RPpiXYtloMRgkmfIhKD5rgoEfvDYJOnrrCQK2uwQeTX5UU41p5ROeWfEFYkAyx0aArcKdztJASpdyiT5X0SY83xBtHqUDKev98wFHyQU1pYcZ_5xMcevdH1-x4A2bcEMqqvmD8OftMHWIYKuRE4xbHKsQ47NMBMEKZKJzTOIZWyLhQh6wC4tcAuyKYKjq2tm7cchaPcJ2Qbr7a2Ba_xC7naclUSjEEWaPO_rSN_a7A9Ct16CnN8r5YUQ_mp59YN1bBN0NVu4TDnNV37ss2faE5wm34JyDP5GiF9fDAsGhwlw74DyQhll2TNQEVCzNSZ72fJjEpY--mj_fAhHy7ALWVSrDUMDEZJue1iJZi3FvvL6sVa8pyKSJWGFe1vqy8v3oOr-Mbi3piSHzlFfGSEeSl7l64YD-IIMY-BpSB_n80C4jKac0LxIY8JqJsU3FIRQ9N33rth3K5cpSuXQST7jAy9AhW19_P1hJ1gLHpTQYmLdRU5A.zI4W7JOj8fPunbgB00oLEQ.fe8d70a562223247a8c11f1823c93c8b0d0b387e89fba0fa66958bd0115c5968",
    piattaforma: "Vimeo",
    anno: 2014,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → drama
    lingua: "Inglese",
  },

  {
    id: 9,
    nome: "Jongens", 
    regista: "Mischa Kamp",
    tipologia: "film",
    url: "https://www.primevideo.com/dp/amzn1.dv.gti.66ad208b-b0f8-4dd6-98c6-985589dc7a28?autoplay=0&ref_=atv_cf_strg_wb",
    piattaforma: "Prime Video",
    anno: 2014,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → TV movie, drama, romance, lgbt
    lingua: "Olandese",
    
  },


  {
    id: 10,
    nome: "Kiss of the Rabbit God", 
    regista: "Andrew Huang",
    tipologia: "corto",
    url: "https://www.youtube.com/watch?v=bmCw-e72zs8",
    piattaforma: "Youtube",
    anno: 2019,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → fantasy, romance
    lingua: "Cinese",
  },

  {
    id: 11,
    nome: "The Daytrippers", 
    regista: "Greg Mottola",
    tipologia: "film",
    url: "https://www.primevideo.com/-/it/detail/0OJRN7F2RZLV5Q7NM0UC8R9ZUV",
    piattaforma: "Prime Video",
    anno: 1996,
    generi: [0.5, 1, 0.7, 0, 0, 1,
    0, 0, 0.2, 0, 0, 0, 0,
    0, 0, 0, 1, 0, 0,
    0, 0, 0, 0], //fix values per genre → comedy, drama
    lingua: "Inglese",
  },
];


