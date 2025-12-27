import useProductFetch from "../contexts/useProductFetch.jsx";

export default function ComparisonCard({ productId, onRemove }) {
  const item = useProductFetch(productId);

  if (!item) return <div className="text-center p-5">Caricamento...</div>;

  return (
    <div className="card shadow-sm border-0 position-relative mb-3" style={{ maxWidth: 340 }}>
      <button
        className="btn-close position-absolute top-0 end-0 m-2"
        onClick={() => onRemove(productId)}
        aria-label="Rimuovi"
      ></button>
      <img
        src={item.imageUrl}
        alt={item.title}
        className="card-img-top rounded-top"
        style={{ objectFit: "cover", height: "180px", width: "100%" }}
      />
      <div className="card-body">
        <h5 className="card-title fw-bold mb-2">{item.title}</h5>
        <span className="badge bg-secondary mb-2">{item.category}</span>
        <div className="mb-2">
          <strong>Prezzo:</strong>{" "}
          <span className="text-success">{item.price}€</span>
        </div>
        <div>
          <strong>Descrizione:</strong>
          <div className="text-muted small">{item.description}</div>
        </div>
      </div>
    </div>
  );
}