import json


# NOTA: Se il tuo catalogo è un file JSON, puoi caricarlo così:
with open('catalogo_5000_film.json', 'r', encoding='utf-8') as f:
  Catalogo = json.load(f)


def crea_generi(film_list):
  k = set()
  for f in film_list:
    # Controlla se l'oggetto ha la chiave 'generi'
    if 'generi' in f and f['generi']:
      for g in f['generi']:
        k.add(g)
  return k


# 1. Esegui la funzione
set_di_generi = crea_generi(Catalogo)

# 2. Converti il Set in una lista (i set non si salvano direttamente in JSON)
array_di_generi = list(set_di_generi)
print (array_di_generi)
