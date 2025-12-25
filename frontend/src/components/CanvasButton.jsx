import { useOffcanvasContext } from "../contexts/useOffcanvasContext";

export default function CanvasButton({ product }) {
  const { addProductToCompare } = useOffcanvasContext();

  return (
    <button
      className="btn btn-sm btn-outline-primary"
      onClick={() => addProductToCompare(product)}
      title="Aggiungi al confronto"
    >
      <i className="bi bi-columns-gap"></i> {/* icona Bootstrap opzionale */}
    </button>
  );
}