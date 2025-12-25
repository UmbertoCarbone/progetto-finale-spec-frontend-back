import { useOffcanvasContext } from "../contexts/useOffcanvasContext";
import forzahorizon from "../assets/forzahorizon.jpg";
import { useEffect, useState, useMemo } from "react";

export default function Offcanvas() {
  const { isOpen, setIsOpen, selectedProducts } = useOffcanvasContext();
  const [detailedProducts, setDetailedProducts] = useState([]);

  const handleClose = () => setIsOpen(false);

  // Ogni volta che cambia l'elenco dei prodotti selezionati per il confronto,
  // questo effetto recupera i dettagli completi di ciascun prodotto tramite una fetch API
  // e aggiorna lo stato detailedProducts, così da mostrare sempre tutte le informazioni aggiornate nell'offcanvas.
  useEffect(() => {
    async function fetchDetails() {
      const url = import.meta.env.VITE_REACT_APP_URL_JSON;
      const details = [];
      for (const singleID of selectedProducts) {
        const res = await fetch(`${url}/${singleID.id}`);
        const data = await res.json();
        details.push(data.product);
      }
      setDetailedProducts(details);
    }
    fetchDetails();
  }, [selectedProducts]);

  // Memoizzazione delle card prodotto per ottimizzare il rendering
  const productCards = useMemo(() => {
    if (detailedProducts.length === 0) {
      return (
        <div className="col-12 text-center">Nessun prodotto selezionato.</div>
      );
    }
    return detailedProducts.map((product) => (
      <div className="col-12 col-md-6 mb-3" key={product.id}>
        <div className="row align-items-center">
          <div className="col-4 text-center">
            <img
              src={product?.imageUrl || forzahorizon}
              alt={product?.title || ""}
              className="img-fluid rounded"
              style={{ maxHeight: "120px", objectFit: "cover" }}
            />
          </div>
          <div className="col-8">
            <h5 className="card-title">{product?.title || "Caricamento..."}</h5>
            <ul className="list-unstyled mb-1">
              <li>
                <strong>Categoria:</strong> {product?.category || "N/A"}
              </li>
              <li>
                <strong>Piattaforma:</strong> {product?.platform || "N/A"}
              </li>
              <li>
                <strong>Prezzo:</strong>{" "}
                {product?.price !== undefined ? `${product.price} €` : "N/A"}
              </li>
              <li>
                <strong>Rating:</strong>{" "}
                {product?.rating !== undefined ? product.rating : "N/A"}
              </li>
              <li>
                <strong>Anno:</strong> {product?.releaseYear || "N/A"}
              </li>
            </ul>
            <div style={{ fontSize: "0.95em" }}>
              <strong>Descrizione:</strong>{" "}
              {product?.description || "Nessuna descrizione"}
            </div>
          </div>
        </div>
      </div>
    ));
  }, [detailedProducts]);

  return (
    <div
      className={`offcanvas offcanvas-bottom${isOpen ? " show" : ""}`}
      tabIndex="-1"
      id="offcanvasBottom"
      aria-labelledby="offcanvasBottomLabel"
      style={{ visibility: isOpen ? "visible" : "hidden" }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasBottomLabel">
          Confronto prodotti
        </h5>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={handleClose}
        ></button>
      </div>
      <div className="offcanvas-body small">
        <div className="row">{productCards}</div>
      </div>
    </div>
  );
}
