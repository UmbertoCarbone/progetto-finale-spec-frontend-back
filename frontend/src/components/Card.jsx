import useProductFetch from "../contexts/useProductFetch.jsx";
import { Link } from "react-router-dom";

export default function Card({
  productId, // ID del prodotto da mostrare
  onCompare, // Funzione callback per aggiungere/rimuovere dal confronto
  isCompared, // Booleano: il prodotto è già in confronto?
  onFavorite, // Funzione callback per aggiungere/rimuovere dai preferiti
  isFavorite, // Booleano: il prodotto è già nei preferiti?
}) {
  const item = useProductFetch(productId);
  // Recupera i dati del prodotto dal context
  
  if (!item)
    return <div className="col-md-4 mb-4 text-center p-5">Caricamento...</div>;
  // Mostra un placeholder mentre i dati vengono caricati.
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm position-relative">
        {/* Avvolgi immagine e titolo nel Link */}
        <Link
          to={`/product/${item.id}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <img
            src={item.imageUrl}
            className="card-img-top"
            style={{ height: "200px", objectFit: "cover" }}
            alt={item.title}
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title text-center">{item.title}</h5>
          </div>
        </Link>
        {/* Tasto Cuore (Preferiti) */}
        <button
          className="btn position-absolute top-0 end-0 m-2 shadow-sm"
          style={{
            zIndex: 10,
            borderRadius: "50%",
            backgroundColor: isFavorite ? "#ff4d4d" : "transparent",
          }}
          onClick={() => onFavorite(productId)}
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
        <div className="d-flex gap-2 mt-auto px-3 pb-3">
          <button
            className={`btn btn-sm flex-grow-1 ${
              isCompared ? "btn-success" : "btn-primary"
            }`}
            onClick={() => onCompare(productId)}
          >
            {isCompared ? "In Confronto" : "Confronta"}
          </button>
        </div>
      </div>
    </div>
  );
}
