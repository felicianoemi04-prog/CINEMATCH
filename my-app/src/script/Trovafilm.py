from json import JSONDecodeError
import json
import time
import requests

API_KEY = "3b2c29a3b0d77aa319c73ebac1027584"  # La tua chiave API di TMDB
COUNTRY_CODE = "IT"  # Paese di riferimento
TARGET_MOVIE_COUNT = 100

# Sessione requests per riutilizzare la connessione
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
      return []
    results = res.json().get("results", {}).get(COUNTRY_CODE, {})
    providers = []
    for category in ["flatrate", "rent", "buy"]:
      if category in results:
        for p in results[category]:
          providers.append({
              "piattaforma": p.get("provider_name"),
              "modalita": category,
          })
    return providers
  except requests.RequestException:
    return []


def get_trailer_key(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"
  params = {"api_key": API_KEY}
  try:
    res = session.get(url, params=params, timeout=10)
    if res.status_code != 200:
      return None
    videos = res.json().get("results", [])

    # Cerca prima un video di tipo "Trailer" su YouTube
    for v in videos:
      if v.get("site") == "YouTube" and v.get("type") == "Trailer":
        return v.get("key")

    # Se non trova un trailer ufficiale, cerca qualsiasi video su YouTube (es. Teaser)
    for v in videos:
      if v.get("site") == "YouTube":
        return v.get("key")
  except requests.RequestException:
    pass
  return None


def generate_catalog():
  catalogo = []
  page = 1
  id_progressivo = 1

  print("Inizio estrazione dei film con budget inferiore a 5.000.000 $...")

  while len(catalogo) < TARGET_MOVIE_COUNT:
    url = "https://api.themoviedb.org/3/discover/movie"
    params = {
        "api_key": API_KEY,
        "language": "it-IT",
        "page": page,
        "with_budget.gte": 1,
        "with_budget.lte": 5000000,
        "sort_by": "popularity.desc",
    }

    try:
      response = session.get(url, params=params, timeout=10)
      if response.status_code != 200:
        print(f"Errore nella risposta della pagina {page}: {response.text}")
        break
      data = response.json()
    except Exception as e:
      print(f"Errore di connessione alla pagina {page}: {e}")
      time.sleep(2)
      continue

    movies = data.get("results", [])
    if not movies:
      print("Nessun altro film trovato o fine dei risultati.")
      break

    for m in movies:
      if len(catalogo) >= TARGET_MOVIE_COUNT:
        break

      movie_id_ufficiale = m.get("id")

      # Chiamate aggiuntive (inclusi i video/trailer)
      details = get_movie_details(movie_id_ufficiale)
      regista = get_director(movie_id_ufficiale)
      dove_vederlo = get_watch_providers(movie_id_ufficiale)
      trailer_key = get_trailer_key(movie_id_ufficiale)

      generi = [g.get("name") for g in details.get("genres", [])]
      nazionalita = [
          c.get("name") for c in details.get("production_countries", [])
      ]

      film_entry = {
          "id": id_progressivo,
          "nome": m.get("title"),
          "genere": generi,
          "dovevederlo": dove_vederlo,
          "trama": m.get("overview"),
          "regista": regista,
          "nazionalita": nazionalita,
          "trailer_key": trailer_key,  # Chiave di YouTube (es. "dQw4w9WgXcQ") o None se assente
      }

      catalogo.append(film_entry)
      id_progressivo += 1

      # Pausa per evitare sovraccarico delle API
      time.sleep(0.1)

    print(
        f"Estratti {len(catalogo)} / {TARGET_MOVIE_COUNT} film (Pagina"
        f" {page})..."
    )
    page += 1

    if page > 500:
      print("Raggiunto il limite massimo di pagine esplorabili di TMDB (500).")
      break

  with open("catalogo_5000_film.json", "w", encoding="utf-8") as f:
    json.dump(catalogo, f, ensure_ascii=False, indent=4)

  print(
      "Operazione completata! File 'catalogo_5000_film.json' generato con"
      " successo."
  )


if __name__ == "__main__":
  generate_catalog()