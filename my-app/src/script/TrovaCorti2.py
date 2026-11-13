Here is the complete script. It includes the expanded page limit and broader discovery settings so you can easily reach your target of 100 shorts, extracts the YouTube ID when available, and treats `youtube_id` as strictly optional (omitting the key entirely if it's not a YouTube link):

```python
import json
import time
import requests

API_KEY = "3b2c29a3b0d77aa319c73ebac1027584"
COUNTRY_CODE = "IT"
TARGET_SHORT_COUNT = 100

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
            return "Indipendente"
        crew = res.json().get("crew", [])
        for member in crew:
            if member.get("job") == "Director":
                return member.get("name")
    except requests.RequestException:
        pass
    return "Indipendente"


def get_direct_watch_link(movie_id, details):
    """Cerca un link di visione diretto (YouTube, Homepage video o Streaming) e scarta i fallback di TMDB."""
    homepage = details.get("homepage")
    if homepage and (
        "youtube.com" in homepage
        or "youtu.be" in homepage
        or "vimeo.com" in homepage
    ):
        return homepage

    url = f"https://api.themoviedb.org/3/movie/{movie_id}/videos"
    params = {"api_key": API_KEY}
    try:
        res = session.get(url, params=params, timeout=10)
        if res.status_code == 200:
            videos = res.json().get("results", [])
            for v in videos:
                if v.get("site") == "YouTube":
                    key = v.get("key")
                    return f"https://www.youtube.com/watch?v={key}"
    except requests.RequestException:
        pass

    w_url = f"https://api.themoviedb.org/3/movie/{movie_id}/watch/providers"
    try:
        w_res = session.get(w_url, params={"api_key": API_KEY}, timeout=10)
        if w_res.status_code == 200:
            results = w_res.json().get("results", {}).get(COUNTRY_CODE, {})
            link = results.get("link")
            if link:
                return link
    except requests.RequestException:
        pass

    return None


def generate_tmdb_shorts_ts():
    catalogo = []
    page = 1
    id_progressivo = 1

    print(
        "Estrazione corti con link di visione diretto (senza pagine di"
        " fallback)..."
    )

    while len(catalogo) < TARGET_SHORT_COUNT:
        url = "https://api.themoviedb.org/3/discover/movie"
        params = {
            "api_key": API_KEY,
            "language": "it-IT",
            "page": page,
            "with_runtime.lte": 35,
            "sort_by": "primary_release_date.desc",
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

            runtime = details.get("runtime", 0)
            if not runtime or runtime < 2 or runtime > 35:
                continue

            url_guardare = get_direct_watch_link(movie_id, details)
            if not url_guardare:
                continue

            youtube_id = ""
            if "youtube.com/watch?v=" in url_guardare:
                youtube_id = url_guardare.split("v=")[1].split("&")[0]
            elif "youtu.be/" in url_guardare:
                youtube_id = url_guardare.split("youtu.be/")[1].split("?")[0]

            regista = get_director(movie_id)
            release_date = m.get("release_date", "")
            anno = (
                release_date.split("-")[0] if release_date else "Sconosciuto"
            )

            nazionalita_list = [
                c.get("name") for c in details.get("production_countries", [])
            ]
            paese = (
                nazionalita_list[0] if nazionalita_list else "Sconosciuto"
            )
            generi = [g.get("name") for g in details.get("genres", [])]

            short_entry = {
                "id": id_progressivo,
                "nome": m.get("title"),
                "paese": paese,
                "regista_creatore": regista,
                "anno": anno,
                "durata_minuti": runtime,
                "piattaforme": ["YouTube / Web"],
                "generi": generi,
                "url_guardare": url_guardare,
            }

            # Aggiunge youtube_id solo se è stato estratto un ID valido
            if youtube_id:
                short_entry["youtube_id"] = youtube_id

            catalogo.append(short_entry)
            id_progressivo += 1
            time.sleep(0.05)

        print(
            f"Estratti {len(catalogo)} / {TARGET_SHORT_COUNT} corti con link"
            f" diretto (Pagina {page})..."
        )
        page += 1
        if page > 500:
            break

    ts_content = f"""// File generato automaticamente dallo script Python (TMDB Direct Short Films)
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
    youtube_id?: string;
}}

export const INDIE_SHORT_FILMS: ShortFilm[] = {json.dumps(catalogo, ensure_ascii=False, indent=4)};
"""

    with open("catalogoCortiIndie.ts", "w", encoding="utf-8") as f:
        f.write(ts_content)

    print(
        "File 'catalogoCortiIndie.ts' aggiornato con soli link di visione"
        " diretti!"
    )

if __name__ == "__main__":
    generate_tmdb_shorts_ts()