type SelectorProps = {
  id: string;
  func: () => void;
};
export default function Selector({ id, func }: SelectorProps) {
  return (
    <button id={id} onClick={func}>
      {id}
    </button>
  );
}
