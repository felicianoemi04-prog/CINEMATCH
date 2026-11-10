import json
import time
import requests

API_KEY = "3b2c29a3b0d77aa319c73ebac1027584"  # La tua chiave API di TMDB
COUNTRY_CODE = "IT"  # Paese di riferimento per le piattaforme
TARGET_SHORT_COUNT = 50

session = requests.Session()


def get_movie_details(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}"
  params = {"api_key": API_KEY, "language": "it-IT"}
  try:
    res = session.get(url, params=params, timeout=10)
    return res.json() if res.status_code == 200 else {}
  except requests.RequestException:
    return {}


def get_director(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}/credits"
  params = {"api_key": API_KEY}
  try:
    res = session.get(url, params=params, timeout=10)
    if res.status_code != 200:
      return "Sconosciuto"
    crew = res.json().get("crew", [])
    for member in crew:
      if member.get("job") == "Director":
        return member.get("name")
  except requests.RequestException:
    pass
  return "Sconosciuto"


def get_watch_providers(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
  params = {"api_key": API_KEY}
  try:
    res = session.get(url, params=params, timeout=10)
    if res.status_code != 200:
      return [], None
    results = res.json().get("results", {}).get(COUNTRY_CODE, {})
    providers = []
    link = results.get("link")  # Link generale TMDB per guardare il film

    for category in ["flatrate", "rent", "buy"]:
      if category in results:
        for p in results[category]:
          providers.append(p.get("provider_name"))
    return list(set(providers)), link
  except requests.RequestException:
    return [], None


def get_trailer_key(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"
  params = {"api_key": API_KEY}
  try:
    res = session.get(url, params=params, timeout=10)
    if res.status_code != 200:
      return None
    videos = res.json().get("results", [])
    for v in videos:
      if v.get("site") == "YouTube" and v.get("type") in ["Trailer", "Teaser"]:
        return v.get("key")
  except requests.RequestException:
    pass
  return None


def generate_short_films_ts():
  catalogo = []
  page = 1
  id_progressivo = 1

  print("Estrazione in corso di cortometraggi indipendenti da TMDB...")

  while len(catalogo) < TARGET_SHORT_COUNT:
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "language": "it-IT",
        "page": page,
        "with_genres": 18,  # Genere Drammatico o specifico, oppure gestito dalla durata
        "with_runtime.lte": 40,  # Durata massima 40 minuti (definizione di cortometraggio)
        "with_budget.lte": 500000,  # Budget basso / indie
        "sort_by": "popularity.desc",
    }

    try:
      response = session.get(url, params=params, timeout=10)
      if response.status_code != 200:
        break
      data = response.json()
    except Exception:
      time.sleep(2)
      continue

    movies = data.get("results", [])
    if not movies:
      break

    for m in movies:
      if len(catalogo) >= TARGET_SHORT_COUNT:
        break

      movie_id = m.get("id")
      details = get_movie_details(movie_id)

      # Filtriamo rigorosamente per sicurezza se la durata supera i 40 minuti
      runtime = details.get("runtime", 0)
      if runtime and runtime > 40:
        continue

      regista = get_director(movie_id)
      providers, watch_link = get_watch_providers(movie_id)
      trailer_key = get_trailer_key(movie_id)

      release_date = m.get("release_date", "")
      anno = release_date.split("-")[0] if release_date else "Sconosciuto"

      nazionalita_list = [
          c.get("name") for c in details.get("production_countries", [])
      ]
      paese = nazionalita_list[0] if nazionalita_list else None

      generi = [g.get("name") for g in details.get("genres", [])]

      short_entry = {
          "id": id_progressivo,
          "nome": m.get("title"),
          "paese": paese,
          "regista_creatore": regista,
          "anno": anno,
          "durata_minuti": runtime,
          "piattaforme": providers if providers else ["Indipendente / Web"],
          "generi": generi,
          "trailer": trailer_key,  # Es. "dQw4w9WgXcQ"
          "url_piattaforma": watch_link
          or f"https://www.themoviedb.org/movie/{movie_id}",
      }

      catalogo.append(short_entry)
      id_progressivo += 1
      time.sleep(0.05)

    print(
        f"Estratti {len(catalogo)} / {TARGET_SHORT_COUNT} cortometraggi"
        f" (Pagina {page})..."
    )
    page += 1
    if page > 50:
      break

  # Scrittura del file TypeScript (.ts)
  ts_content = f"""// File generato automaticamente dallo script Python (Cortometraggi Indie)
export interface ShortFilm {{
    id: number;
    nome: string;
    paese?: string | null;
    regista_creatore: string;
    anno: string;
    durata_minuti: number;
    piattaforme: string[];
    generi: string[];
    trailer_id?: string | null;
    url_piattaforma?: string | null;
}}

export const INDIE_SHORT_FILMS: ShortFilm[] = {json.dumps(catalogo, ensure_ascii=False, indent=4)};
"""

  with open("catalogoCortiIndie.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

  print(
      "Operazione completata! File TypeScript 'catalogoCortiIndie.ts'"
      " generato con successo."
  )


if __name__ == "__main__":
  generate_short_films_ts()