from json import JSONDecodeError
import json
import time
import requests

API_KEY = "3b2c29a3b0d77aa319c73ebac1027584"
COUNTRY_CODE = "IT"
TARGET_MOVIE_COUNT = 100

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
      return "Non disponibile"
    results = res.json().get("results", {}).get(COUNTRY_CODE, {})
    for category in ["flatrate", "rent", "buy"]:
      if category in results and results[category]:
        return results[category][0].get("provider_name")
  except requests.RequestException:
    pass
  return "Non disponibile"


def get_trailer_key(movie_id):
  url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"
  params = {"api_key": API_KEY}
  try:
    res = session.get(url, params=params, timeout=10)
    if res.status_code != 200:
      return None
    videos = res.json().get("results", [])

    for v in videos:
      if v.get("site") == "YouTube" and v.get("type") == "Trailer":
        return v.get("key")

    for v in videos:
      if v.get("site") == "YouTube":
        return v.get("key")
  except requests.RequestException:
    pass
  return None


def extract_year(release_date):
  try:
    return int(release_date.split("-")[0])
  except (AttributeError, ValueError):
    return 0


def generate_catalog():
  catalogo = []
  page = 1
  id_progressivo = 1

  print(
      "Inizio estrazione: rimozione URL e inserimento key trailer di YouTube..."
  )

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

      details = get_movie_details(movie_id_ufficiale)

      # Controllo rigoroso del budget (1$ - 5.000.000$)
      budget_reale = details.get("budget", 0)
      if not (1 <= budget_reale <= 5000000):
        continue

      regista = get_director(movie_id_ufficiale)
      piattaforma = get_watch_providers(movie_id_ufficiale)
      trailer_key = get_trailer_key(movie_id_ufficiale)

      generi = [g.get("name") for g in details.get("genres", [])]

      paesi = details.get("production_countries", [])
      paese = paesi[0].get("name") if paesi else "Sconosciuto"

      durata = details.get("runtime", 0) or 0

      # Struttura dati aggiornata senza 'url' e con 'trailer'
      film_entry = {
          "nome": m.get("title", ""),
          "paese": paese,
          "regista": regista,
          "anno": extract_year(m.get("release_date")),
          "durata": durata,
          "piattaforma": piattaforma,
          "generi": generi,
          "id": id_progressivo,
          "trailer": trailer_key
          if trailer_key
          else "",  # Key di YouTube o stringa vuota
      }

      catalogo.append(film_entry)
      id_progressivo += 1

      time.sleep(0.05)

    print(
        f"Estratti {len(catalogo)} / {TARGET_MOVIE_COUNT} film validi (Pagina"
        f" {page})..."
    )
    page += 1

    if page > 500:
      print("Raggiunto il limite massimo di pagine esplorabili.")
      break

  with open("catalogo_film_trailer.json", "w", encoding="utf-8") as f:
    json.dump(catalogo, f, ensure_ascii=False, indent=4)

  print("Operazione completata! File 'catalogo_film_trailer.json' generato.")


if __name__ == "__main__":
  generate_catalog()