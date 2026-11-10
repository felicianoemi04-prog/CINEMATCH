import { Catalogo } from "./catalogo_5000_film";
export const Piattaforme = [...new Set(Catalogo.map((f) => f.piattaforma))];
