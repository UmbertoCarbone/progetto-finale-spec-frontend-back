import useSingleFetchID from "../hooks/useSingleFetchID";
import forzahorizon from "../assets/forzahorizon.jpg";
import Footer from "../components/Footer";
import CanvasButton from "../components/CanvasButton";
export default function SinglePage() {
  const product = useSingleFetchID();

  return (
    <>
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow" style={{ maxWidth: "600px", width: "100%" }}>
        <div className="row g-0">
          <div className="col-md-5 d-flex align-items-center">
            <img
              src={product?.imageUrl || forzahorizon}
              className="img-fluid rounded-start w-100"
              alt={product?.title || "Nessuna immagine"}
              style={{ objectFit: "cover", height: "100%" }}
            />
          </div>
          <div className="col-md-7">
            <div className="card-body">
              <h3 className="card-title mb-3">
                {product?.title || "Prodotto non trovato"}
              </h3>
              <ul className="list-unstyled mb-2">
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
                  <strong>Anno di rilascio:</strong>{" "}
                  {product?.releaseYear || "N/A"}
                </li>
              </ul>
              <p className="card-text">
                <strong>Descrizione:</strong> <br />
                {product?.description || "Nessuna descrizione disponibile."}
              </p>
              <CanvasButton product={product} />
            </div>
          </div>
        </div>
      </div>
    </div>
     <Footer />
     </>
  );
}
