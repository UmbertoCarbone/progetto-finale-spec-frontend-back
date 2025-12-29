import useProductFetch from "../contexts/useProductFetch.jsx";

// Componente che mostra l'offcanvas dei preferiti
export default function FavoritesOffcanvas({
  favorites, // Array di ID dei prodotti preferiti
  setFavorites, // Funzione per aggiornare la lista dei preferiti
  isOpen, // Booleano: l'offcanvas è aperto?
  onClose, // Funzione per chiudere l'offcanvas
}) {
  // Rimuove un prodotto dai preferiti
  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f !== id);
    setFavorites(updated);
    if (updated.length === 0) onClose(); // Chiude l'offcanvas se la lista è vuota
  };

  return (
    <>
      {/* Backdrop scuro che chiude l'offcanvas al click */}
      {isOpen && (
        <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
      )}

      {/* Offcanvas laterale a destra */}
      <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
        style={{
          display: isOpen ? "block" : "none",
          visibility: isOpen ? "visible" : "hidden",
          width: "350px",
          maxWidth: "90vw",
        }}
      >
        {/* Header blu con titolo e bottone di chiusura */}
        <div className="offcanvas-header bg-primary text-white">
          <h5 className="offcanvas-title">
            I miei Preferiti ({favorites.length})
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            onClick={onClose}
          ></button>
        </div>
        {/* Corpo dell'offcanvas: lista dei preferiti e bottone per svuotare */}
        <div className="offcanvas-body">
          {favorites.map((id) => (
            <FavoriteRow key={id} productId={id} onRemove={removeFavorite} />
          ))}
          {favorites.length > 0 && (
            <button
              className="btn btn-outline-primary w-100 mt-3"
              onClick={() => {
                setFavorites([]);
                onClose();
              }}
            >
              Svuota Lista
            </button>
          )}
        </div>
      </div>
    </>
  );
}

// Componente che mostra una riga per ogni prodotto preferito
function FavoriteRow({ productId, onRemove }) {
  const item = useProductFetch(productId); // Recupera i dati del prodotto
  if (!item)
    return (
      <div className="d-flex align-items-center mb-2 p-2 border rounded shadow-sm">
        <span className="me-auto small">Caricamento...</span>
      </div>
    );

  return (
    <div className="d-flex align-items-center mb-2 p-2 border rounded shadow-sm">
      <img
        src={item.imageUrl}
        style={{ width: "45px", height: "45px", objectFit: "cover" }}
        className="me-2 rounded"
        alt={item.title}
      />
      <span className="me-auto small fw-bold">{item.title}</span>
      <button
        className="btn btn-sm text-danger fs-5"
        onClick={() => onRemove(productId)}
      >
        &times;
      </button>
    </div>
  );
}
