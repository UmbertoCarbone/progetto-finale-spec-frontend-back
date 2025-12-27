import { Link, useParams } from "react-router-dom";
import useProductFetch from "../contexts/useProductFetch.jsx";

export default function SingleProduct() {
  const { id } = useParams();
  const item = useProductFetch(id);

  if (!item) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-secondary">
          Caricamento prodotto in corso...
        </h2>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div
            className="card border-0 shadow-lg p-4"
            style={{ borderRadius: "2rem" }}
          >
            <div className="row g-4">
              <div className="col-md-6 d-flex align-items-stretch">
                <div className="w-100 h-100 bg-light rounded overflow-hidden d-flex">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="img-fluid w-100 h-100"
                    style={{ objectFit: "cover", borderRadius: "1rem" }}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <h1 className="fw-bold mb-3 lh-1">{item.title}</h1>
                <div className="mb-3 d-flex flex-wrap gap-2">
                  <span className="badge bg-primary">{item.category}</span>
                  {item.platform && (
                    <span className="badge bg-info text-dark">
                      {item.platform}
                    </span>
                  )}
                  {item.releaseYear && (
                    <span className="badge bg-dark">{item.releaseYear}</span>
                  )}
                </div>
                {item.price !== undefined && (
                  <div className="mb-2 fs-5">
                    <strong className="text-primary">
                      <i className="bi bi-cash-stack me-1"></i>Prezzo:
                    </strong>{" "}
                    <span className="fw-bold">{item.price}€</span>
                  </div>
                )}
                {item.rating !== undefined && (
                  <div className="mb-2 fs-5">
                    <strong>
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      Valutazione:
                    </strong>{" "}
                    <span className="fw-bold">{item.rating}</span>
                  </div>
                )}
                {item.description && (
                  <div className="mb-2">
                    <strong>Descrizione:</strong>
                    <div className="text-muted fst-italic">
                      {item.description}
                    </div>
                  </div>
                )}
                <Link
                  to="/"
                  className="btn btn-primary btn-lg mt-4 rounded-pill px-4"
                >
                  Torna alla Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
