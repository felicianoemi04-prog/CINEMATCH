import json
import time
import requests

TARGET_SHOW_COUNT = 1000
session = requests.Session()

FAMOUS_NETWORKS = {
    "Netflix",
    "HBO",
    "Amazon Prime Video",
    "Apple TV+",
    "Disney+",
    "Hulu",
    "CBS",
    "NBC",
    "ABC",
    "Fox",
    "The CW",
    "AMC",
    "FX",
    "Showtime",
    "Starz",
    "BBC One",
    "BBC Two",
    "ITV",
    "Channel 4",
    "Paramount+",
    "Peacock",
    "Sky",
}

API_KEY_TMDB = "3b2c29a3b0d77aa319c73ebac1027584" 

def get_trailer_key(imdb_id):
  """Cerca il trailer su TMDB usando l'ID IMDb e restituisce solo l'ID YouTube (es. 'dQw4w9WgXcQ')."""
  if not imdb_id:
    return None

  find_url = f"https://api.themoviedb.org/3/find/{imdb_id}"
  params = {"api_key": API_KEY_TMDB, "external_source": "imdb_id"}
  try:
    res = session.get(find_url, params=params, timeout=10)
    if res.status_code == 200:
      data = res.json()
      tv_results = data.get("tv_results", [])
      if tv_results:
        tmdb_id = tv_results[0].get("id")

        videos_url = f"https://api.themoviedb.org/3/tv/{tmdb_id}/videos"
        v_res = session.get(
            videos_url, params={"api_key": API_KEY_TMDB}, timeout=10
        )
        if v_res.status_code == 200:
          videos = v_res.json().get("results", [])
          for v in videos:
            if v.get("site") == "YouTube" and v.get("type") in [
                "Trailer",
                "Teaser",
            ]:
              return v.get("key")
  except requests.RequestException:
    pass
  return None

def get_show_details(show_id):
  """Ottiene informazioni dettagliate, compresi i link esterni e web channel."""
  url = f"https://api.tvmaze.com/shows/{show_id}"
  try:
    res = session.get(url, timeout=10)
    if res.status_code == 200:
      data = res.json()
      premiered = data.get("premiered")
      anno = premiered.split("-")[0] if premiered else "Sconosciuto"

      network = data.get("network")
      web_channel = data.get("webChannel")
      paese = None
      if network and network.get("country"):
        paese = network.get("country").get("name")
      elif web_channel and web_channel.get("country"):
        paese = web_channel.get("country").get("name")

      # Cerca un link specifico per guardare lo show (es. officialSite o externals)
      official_site = data.get("officialSite")

      return {
          "anno": anno,
          "paese": paese,
          "official_site": official_site,
          "network": network,
          "web_channel": web_channel,
      }
  except requests.RequestException:
    pass
  return {
      "anno": "Sconosciuto",
      "paese": None,
      "official_site": None,
      "network": None,
      "web_channel": None,
  }


def get_show_episodes_count(show_id):
  url = f"https://api.tvmaze.com/shows/{show_id}/episodes"
  try:
    res = session.get(url, timeout=10)
    if res.status_code == 200:
      return len(res.json())
  except requests.RequestException:
    pass
  return 0


def get_show_crew(show_id):
  url = f"https://api.tvmaze.com/shows/{show_id}/crew"
  try:
    res = session.get(url, timeout=10)
    if res.status_code != 200:
      return "Sconosciuto"
    crew = res.json()
    for member in crew:
      if member.get("type") in ["Creator", "Producer"]:
        return member.get("person", {}).get("name")
  except requests.RequestException:
    pass
  return "Sconosciuto"


def generate_ts_catalog():
  catalogo = []
  page = 0
  id_progressivo = 1

  print(
      "Estrazione in corso di serie TV indipendenti, di nicchia e senza"
      " colossi TV..."
  )

  while len(catalogo) < TARGET_SHOW_COUNT:
    url = f"https://api.tvmaze.com/shows?page={page}"

    try:
      response = session.get(url, timeout=10)
      if response.status_code == 404:
        break
      if response.status_code != 200:
        time.sleep(2)
        continue
      shows = response.json()
    except Exception:
      time.sleep(2)
      continue

    if not shows:
      break

    for show in shows:
      if len(catalogo) >= TARGET_SHOW_COUNT:
        break

      network = show.get("network")
      web_channel = show.get("webChannel")
      weight = show.get("weight", 0)

      network_name = network.get("name") if network else None
      web_name = web_channel.get("name") if web_channel else None

      # FILTRO ANTIGIGANTI (esclude se appartiene a un network famoso)
      if network_name and network_name in FAMOUS_NETWORKS:
        continue
      if web_name and web_name in FAMOUS_NETWORKS:
        continue

      # O non ha network TV oppure ha un peso inferiore a 25
      is_independent_or_niche = (network is None) or (weight < 25)
      if not is_independent_or_niche:
        continue

      show_id = show.get("id")
      details = get_show_details(show_id)
      num_episodi = get_show_episodes_count(show_id)
      creatore = get_show_crew(show_id)

      piattaforma = web_name if web_name else (network_name or "Indipendente")

      # URL della piattaforma o del sito ufficiale della serie
      url_piattaforma = details["official_site"] or show.get("url")

      externals = show.get("externals", {})
      imdb_id = externals.get("imdb")

      # Ottiene solo l'ID di YouTube (es. "iLR3gZrU2Xo")
      trailer_id = get_trailer_key(imdb_id)

      show_entry = {
          "id": id_progressivo,
          "nome": show.get("name"),
          "paese": details["paese"],
          "regista_creatore": creatore,
          "anno": details["anno"],
          "numero_episodi": num_episodi,
          "piattaforme": [piattaforma],
          "generi": show.get("genres", []),
          "trailer_id": trailer_id,  # Salva solo la stringa ID (es. "iLR3gZrU2Xo")
          "url_piattaforma": url_piattaforma,
      }
      
      catalogo.append(show_entry)
      id_progressivo += 1
      time.sleep(0.05)

    print(
        f"Estratte {len(catalogo)} / {TARGET_SHOW_COUNT} serie indie reali"
        f" (Scansionata pagina {page})..."
    )
    page += 1

  # Scrittura del file TypeScript (.ts)
  ts_content = f"""// File generato automaticamente dallo script Python
export interface TVShow {{
    id: number;
    nome: string;
    paese?: string | null;
    regista_creatore: string;
    anno: string;
    numero_episodi: number;
    piattaforme: string[];
    generi: string[];
    trailer_id?: string | null;
    url_piattaforma?: string | null;
}}

export const INDIE_TV_SHOWS: TVShow[] = {json.dumps(catalogo, ensure_ascii=False, indent=4)};
"""

  with open("catalogoSerieIndie.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

  print(
      "Operazione completata! File TypeScript 'catalogoSerieIndie.ts'"
      " aggiornato correttamente senza serie mainstream."
  )


if __name__ == "__main__":
  generate_ts_catalog()