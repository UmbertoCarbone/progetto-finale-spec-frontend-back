import { useEffect, useContext, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalContext } from "../contexts/GlobalContext";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";

export default function SingleProduct() {
  const { id } = useParams();
  //
  const { fetchProductById } = useContext(GlobalContext);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    // Funzione async per gestire la chiamata API
    async function loadProduct() {
      try {
        // Chiama l'API per ottenere il prodotto con l'id specifico
        const data = await fetchProductById(id);

        // Salva i dati del prodotto nello stato locale (setProduct)
        setProduct(data);
      } catch (error) {
        // Gestisce eventuali errori durante il fetch
        console.error("Errore nel caricamento del prodotto:", error);
      } finally {
        // Conferma che il fetch è stato eseguito
        console.log(`fetch con id "${id}" corretto`);
      }
    }

    // Esegue la funzione di caricamento
    loadProduct();
  }, []);

  return (
    <>
      <HeroSection />

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card shadow-sm border-0">
              <div className="row g-0">
                <div className="col-md-5">
                  <img
                    src={product.imageUrl || "https://via.placeholder.com/400"}
                    className="img-fluid rounded-start"
                    alt={product.title}
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                </div>
                <div className="col-md-7">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-start mb-3">
                      <h2 className="card-title">{product.title}</h2>
                      {product.rating && (
                        <span className="badge bg-warning text-dark fs-6">
                          ⭐ {product.rating || "Nessuna recensione"}
                        </span>
                      )}
                    </div>
                    <div className="mb-3">
                      <span className="badge bg-secondary me-2">
                        {product.category}
                      </span>
                      {product.platform && (
                        <span className="badge bg-info text-dark">
                          {product.platform}
                        </span>
                      )}
                    </div>
                    <p className="card-text">
                      {product.description || "Descrizione non disponibile"}
                    </p>
                    <p className="text-muted mb-3">
                      <strong>Anno:</strong> {product.releaseYear || "N/A"}
                    </p>
                    <p className="text-primary fw-bold fs-3 mb-0">
                      {product.price
                        ? `${product.price}€`
                        : "Prezzo non disponibile"}
                    </p>
                    <Link to="/" className="btn btn-primary mb-3">
                      ← Torna alla lista
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}
