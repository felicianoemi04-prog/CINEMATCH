import json
import time
import requests

# INSERISCI QUI IL TUO ACCESS TOKEN DI VIMEO
VIMEO_ACCESS_TOKEN = "13c8d7292aa595b2d5a0d96bd755eb8b"
TARGET_SHORT_COUNT = 50

session = requests.Session()
session.headers.update({
    "Authorization": f"bearer {VIMEO_ACCESS_TOKEN}",
    "Accept": "application/vnd.vimeo.*+json;version=3.4",
})


def generate_vimeo_shorts_ts():
  catalogo = []
  page = 1
  id_progressivo = 1

  print("Estrazione di cortometraggi da Vimeo (metodo sicuro)...")

  while len(catalogo) < TARGET_SHORT_COUNT:
    # Usiamo l'endpoint generale dei video ordinati per data, evitando restrizioni di categoria
    url = "https://api.vimeo.com/videos"
    params = {
        "query": "short film",
        "sort": "date",
        "direction": "desc",
        "filter": "embedgable",
        "per_page": 50,
        "page": page,
    }

    try:
      response = session.get(url, params=params, timeout=10)
      if response.status_code != 200:
        print(f"Errore API Vimeo: {response.status_code} - {response.text}")
        break
      data = response.json()
    except Exception as e:
      print(f"Errore di connessione: {e}")
      time.sleep(2)
      continue

    videos = data.get("data", [])
    print(f"Pagina {page}: trovati {len(videos)} video.")

    if not videos:
      print("Fine dei risultati.")
      break

    for v in videos:
      if len(catalogo) >= TARGET_SHORT_COUNT:
        break

      duration_seconds = v.get("duration", 0)
      durata_minuti = round(duration_seconds / 60)

      # Filtriamo per cortometraggi (da 1 a 40 minuti)
      if durata_minuti < 1 or durata_minuti > 40:
        continue

      created_time = v.get("created_time", "")
      anno = created_time.split("-")[0] if created_time else "Sconosciuto"

      nome = v.get("name")
      url_guardare = v.get("link")

      user = v.get("user", {})
      regista = user.get("name") or "Indipendente"
      paese = user.get("location") or "Sconosciuto"

      tags = [tag.get("name") for tag in v.get("tags", [])]
      generi = tags[:3] if tags else ["Independent", "Short"]

      short_entry = {
          "id": id_progressivo,
          "nome": nome,
          "paese": paese,
          "regista_creatore": regista,
          "anno": anno,
          "durata_minuti": durata_minuti,
          "piattaforme": ["Vimeo"],
          "generi": generi,
          "url_guardare": url_guardare,
      }

      catalogo.append(short_entry)
      id_progressivo += 1

    print(
        f"Totale corti validi estratti finora: {len(catalogo)} /"
        f" {TARGET_SHORT_COUNT}"
    )
    page += 1
    time.sleep(0.1)

  ts_content = f"""// File generato automaticamente dallo script Python (Vimeo Short Films)
export interface ShortFilm {{
    id: number;
    nome: string;
    paese?: string | null;
    regista_creatore: string;
    anno: string;
    durata_minuti: number;
    piattaforme: string[];
    generi: string[];
    url_guardare: string;
}}

export const VIMEO_SHORT_FILMS: ShortFilm[] = {json.dumps(catalogo, ensure_ascii=False, indent=4)};
"""

  with open("catalogoVimeoCorti.ts", "w", encoding="utf-8") as f:
    f.write(ts_content)

  print(
      "Operazione completata! File TypeScript 'catalogoVimeoCorti.ts'"
      " generato con successo."
  )


if __name__ == "__main__":
  generate_vimeo_shorts_ts()