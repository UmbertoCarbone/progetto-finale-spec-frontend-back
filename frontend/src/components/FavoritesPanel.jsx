import { useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function FavoritesPanel() {
  const { favorites, toggleFavorite, isFavOpen, setIsFavOpen } = useContext(GlobalContext);

  // Rimosso l'if di blocco per permettere l'animazione CSS del "left: -350px"
  return (
    <div className={`favorites-sidebar ${isFavOpen ? "open" : ""}`}>
      <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
        <h4 className="mb-0 fw-bold text-white">
          ❤️ Preferiti ({favorites.length})
        </h4>
        <button
          className="btn-close btn-close-white"
          onClick={() => setIsFavOpen(false)}
        ></button>
      </div>

      <div className="favorites-list">
        {favorites.length === 0 ? (
          <p className="text-muted text-center mt-5">La lista è vuota</p>
        ) : (
          favorites.map((product) => (
            <div key={product.id} className="card bg-dark border-secondary text-white mb-3 shadow-sm">
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <h5 className="fw-bold mb-0 text-truncate" style={{ maxWidth: "80%" }}>
                    {product.title}
                  </h5>
                  <button
                    className="btn btn-danger btn-sm rounded-circle"
                    onClick={() => toggleFavorite(product)}
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="img-fluid rounded mb-2 w-100"
                  style={{ height: "100px", objectFit: "cover" }}
                />
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-warning fw-bold">{product.price}€</span>
                  <span className="badge bg-secondary small">{product.category}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}