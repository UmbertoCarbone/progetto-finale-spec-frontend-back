import { useParams } from "react-router-dom";
import useProductFetch from "../contexts/useProductFetch.jsx";

export default function SingleProduct() {
  // 1. Recuperiamo l'ID dall'URL
  const { id } = useParams();

  // 2. Usiamo l'hook che abbiamo creato per scaricare i dati con l'immagine
  const item = useProductFetch(id);

  // 3. Gestione del caricamento (molto importante per non avere errori)
  if (!item) {
    return (
      <div className="container mt-5">
        <h2>Caricamento prodotto in corso...</h2>
      </div>
    );
  }

  // 4. Mostriamo solo i dati presenti nel tuo JSON (come visto in Postman)
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          {/* Qui finalmente vedi l'immagine grazie al fetch per ID */}
          <img
            src={item.imageUrl}
            alt={item.title}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h1>{item.title}</h1>
          <p className="badge bg-secondary">{item.category}</p>
          <p className="mt-4">{item.description}</p>
          <h3 className="text-primary mt-4">{item.price}€</h3>
        </div>
      </div>
    </div>
  );
}
