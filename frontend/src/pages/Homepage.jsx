import { useState } from "react";
import useGlobalContext from "../contexts/useGlobalContext.jsx";
import Card from "../components/Card";
import Comparison from "../components/Comparison.jsx";
import FavoritesOffcanvas from "../components/FavoritesOffcanvas.jsx";

export default function Homepage() {
  const { products } = useGlobalContext();
  const [selectedIds, setSelectedIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isFavOpen, setIsFavOpen] = useState(false); // Stato per l'apertura manuale

  const toggleSelect = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : prev.length < 2
        ? [...prev, id]
        : prev
    );
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="container mt-5">
      {/* Tasto Flottante Preferiti (sempre visibile se ci sono preferiti) */}
      {favorites.length > 0 && (
        <button
          className="btn btn-danger position-fixed"
          style={{
            bottom: "20px",
            right: "20px",
            zIndex: 2000,
            borderRadius: "50px",
            padding: "10px 20px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          }}
          onClick={() => setIsFavOpen(true)}
        >
          ❤️ Preferiti{" "}
          <span className="badge bg-white text-danger ms-2">
            {favorites.length}
          </span>
        </button>
      )}

      <div className="row">
        {products &&
          products.map((p) => (
            <Card
              key={p.id}
              productId={p.id}
              onCompare={toggleSelect}
              isCompared={selectedIds.includes(p.id)}
              onFavorite={toggleFavorite}
              isFavorite={favorites.includes(p.id)}
            />
          ))}
      </div>

      <Comparison selectedIds={selectedIds} setSelectedIds={setSelectedIds} />

      {/* Passiamo lo stato di apertura manuale */}
      <FavoritesOffcanvas
        favorites={favorites}
        setFavorites={setFavorites}
        isOpen={isFavOpen}
        onClose={() => setIsFavOpen(false)}
      />
    </div>
  );
}
