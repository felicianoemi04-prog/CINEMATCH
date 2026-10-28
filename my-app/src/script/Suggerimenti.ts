type Film = {
  nome: string;
  generi: number[];
  id: number;
  url: string;
};

type CalcoloProps = {
  film: Film[];
  preferenza: number[];
  filmvisti: Film[];
};
function distanza(v1: number[], v2: number[]): number {
  const d2 = v1.map((f, i) => f - v2[i]);
  const d = Math.sqrt(d2.reduce((a, b) => a + b ** 2, 0));
  return d;
}
export default function Calcolo({
  film,
  preferenza,
  filmvisti,
}: CalcoloProps): Film | undefined {
  const filmvistiid = filmvisti.map((f) => f.id);
  const filmnuovi = film.filter((f) => !filmvistiid.includes(f.id));
  if (filmnuovi.length === 0) {
    return undefined;
  }
  filmnuovi.sort(
    (a, b) => distanza(a.generi, preferenza) - distanza(b.generi, preferenza),
  );
  return filmnuovi[0];
}
