import useProductFetch from "../contexts/useProductFetch.jsx";

// Componente che mostra i dettagli di un prodotto selezionato per il confronto
export default function ComparisonCard({ productId, onRemove }) {
  const item = useProductFetch(productId); // Recupera i dati del prodotto tramite l'ID

  // Mostra un placeholder durante il caricamento dei dati
  if (!item) return <div className="text-center p-5">Caricamento...</div>;

  return (
    <div
      className="card shadow-sm border-0 position-relative mb-3"
      style={{ maxWidth: 340 }}
    >
      {/* Bottone per rimuovere il prodotto dal confronto */}
      <button
        className="btn-close position-absolute top-0 end-0 m-2"
        onClick={() => onRemove(productId)}
        aria-label="Rimuovi"
      ></button>
      {/* Immagine del prodotto */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="card-img-top rounded-top"
        style={{ objectFit: "cover", height: "180px", width: "100%" }}
      />
      <div className="card-body">
        {/* Titolo del prodotto */}
        <h5 className="card-title fw-bold mb-2">{item.title}</h5>
        {/* Categoria del prodotto */}
        <span className="badge bg-secondary mb-2">{item.category}</span>
        {/* Prezzo del prodotto */}
        <div className="mb-2">
          <strong>Prezzo:</strong>{" "}
          <span className="text-success">{item.price}€</span>
        </div>
        {/* Descrizione del prodotto */}
        <div>
          <strong>Descrizione:</strong>
          <div className="text-muted small">{item.description}</div>
        </div>
      </div>
    </div>
  );
}