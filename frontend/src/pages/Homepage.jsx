import { useState } from "react";
import useGlobalContext from "../contexts/useGlobalContext.jsx";
import Card from "../components/Card";
import Comparison from "../components/Comparison.jsx";
import FavoritesOffcanvas from "../components/FavoritesOffcanvas.jsx";
import HeroSection from "../components/HeroSection.jsx";
import Footer from "../components/Footer.jsx";

export default function Homepage() {
  const { products } = useGlobalContext(); // Ottiene la lista prodotti dal context globale
  const [selectedIds, setSelectedIds] = useState([]); // Stato: ID dei prodotti selezionati per il confronto
  const [favorites, setFavorites] = useState([]); // Stato: ID dei prodotti preferiti
  const [isFavOpen, setIsFavOpen] = useState(false); // Stato: apertura/chiusura offcanvas preferiti

  // Gestisce la selezione/deselezione di un prodotto per il confronto (max 2)
  const toggleSelect = (id) => {
    setSelectedIds(
      (prev) =>
        prev.includes(id)
          ? prev.filter((i) => i !== id) // Se già selezionato, lo rimuove
          : prev.length < 2
          ? [...prev, id] // Se meno di 2 selezionati, lo aggiunge
          : prev // Se già 2 selezionati, non fa nulla
    );
  };

  // Gestisce l'aggiunta/rimozione di un prodotto dai preferiti
  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <>
      <HeroSection />
      <div className="container mt-5">
        {/* Tasto Flottante Preferiti (sempre visibile se ci sono preferiti) */}
        {favorites.length > 0 && (
          <button
            className="btn btn-danger position-fixed"
            style={{
              bottom: "20px",
              right: "20px",
              zIndex: 1000,
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
      <Footer />
    </>
  );
}
