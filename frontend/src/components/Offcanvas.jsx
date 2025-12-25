import { useOffcanvasContext } from "../contexts/useOffcanvasContext";
import forzahorizon from "../assets/forzahorizon.jpg";


export default function Offcanvas() {
  const { isOpen, setIsOpen, selectedProducts } = useOffcanvasContext();

  const handleClose = () => setIsOpen(false);

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
        <div className="row">
          {selectedProducts.length === 0 && (
            <div className="col-12 text-center">Nessun prodotto selezionato.</div>
          )}
          {selectedProducts.map((product) => (
            <div className="col-12 col-md-6 mb-3" key={product.id}>
              <div className="row align-items-center">
                <div className="col-4 text-center">
                  <img
                    src={product.imageUrl || forzahorizon}
                    alt={product.title}
                    className="img-fluid rounded"
                    style={{ maxHeight: "120px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-8">
                  <h5 className="card-title">{product.title}</h5>
                  <ul className="list-unstyled mb-1">
                    <li><strong>Categoria:</strong> {product.category}</li>
                    <li><strong>Piattaforma:</strong> {product.platform || "N/A"}</li>
                    <li><strong>Prezzo:</strong> {product.price !== undefined ? `${product.price} €` : "N/A"}</li>
                    <li><strong>Rating:</strong> {product.rating !== undefined ? product.rating : "N/A"}</li>
                    <li><strong>Anno:</strong> {product.releaseYear || "N/A"}</li>
                  </ul>
                  <div style={{ fontSize: "0.95em" }}>
                    <strong>Descrizione:</strong> {product.description || "Nessuna descrizione"}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}