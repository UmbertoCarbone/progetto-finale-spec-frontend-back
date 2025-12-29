import useProductFetch from "../contexts/useProductFetch.jsx";

export default function FavoritesOffcanvas({
  favorites,
  setFavorites,
  isOpen,
  onClose,
}) {
  const removeFavorite = (id) => {
    const updated = favorites.filter((f) => f !== id);
    setFavorites(updated);
    if (updated.length === 0) onClose(); // Chiudi se svuoti tutto
  };

  return (
    <>
      {isOpen && (
        <div className="offcanvas-backdrop fade show" onClick={onClose}></div>
      )}

      <div
        className={`offcanvas offcanvas-end ${isOpen ? "show" : ""}`}
        style={{
          display: isOpen ? "block" : "none",
          visibility: isOpen ? "visible" : "hidden",
          width: "350px",
          maxWidth: "90vw",
        }}
      >
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

function FavoriteRow({ productId, onRemove }) {
  const item = useProductFetch(productId);
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