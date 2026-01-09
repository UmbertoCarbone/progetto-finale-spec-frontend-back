import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ProductFilters from "./ProductFilters";
import { Link } from "react-router-dom";

export default function ProductList() {
  // 1. Estrazione dati dal GlobalContext
  const { products, fetchProducts, compareList, toggleCompare } = useContext(GlobalContext);

  // 2. Stati per i filtri
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  // 3. Fetch iniziale
  useEffect(() => {
    fetchProducts();
  }, []);

  // --- FUNZIONI DI UTILITY ---

  // Controllo se il prodotto è già in lista confronto
  const checkIsInCompare = (p) => compareList.some((item) => item.id === p.id);

  // Gestione click sul bottone confronto (blocca il Link e attiva il toggle)
  const handleCompareClick = (e, product) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  // --- LOGICA FILTRAGGIO ---
  const filterBySearch = (p) =>
    (p.title || "").toLowerCase().startsWith(search.trim().toLowerCase());

  const filterByCategory = (p) => !category || p.category === category;

  const sortByOrder = (a, b) =>
    order === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);

  const filteredProducts = products
    .filter(filterBySearch)
    .filter(filterByCategory)
    .sort(sortByOrder);

  return (
    <div className="container mt-5">
      <ProductFilters
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        order={order}
        setOrder={setOrder}
        products={products}
      />

      {filteredProducts.length === 0 ? (
        <div
          className="col-12 d-flex justify-content-center align-items-center"
          style={{ minHeight: "300px" }}
        >
          <h3 className="text-center">NESSUN GIOCO DISPONIBILE! RIPROVA</h3>
        </div>
      ) : (
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mt-3">
          {filteredProducts.map((p) => (
            <div key={p.id} className="col">
              <Link to={`/product/${p.id}`} className="text-decoration-none">
                <div className="card h-100 shadow-sm border-0 position-relative">
                  {/* BOTTONE CONFRONTO */}
                  <button
                    className={`btn btn-sm position-absolute top-0 end-0 m-2 z-3 shadow-sm ${
                      checkIsInCompare(p)
                        ? "btn-success"
                        : "btn-dark opacity-75"
                    }`}
                    onClick={(e) => handleCompareClick(e, p)}
                  >
                    {checkIsInCompare(p) ? "✓ In confronto" : "+ Confronta"}
                  </button>

                  <img
                    src={p.imageUrl || "https://via.placeholder.com/250"}
                    className="card-img-top"
                    alt={p.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />

                  <div className="card-body d-flex flex-column">
                    <div className="d-flex justify-content-between align-items-start mb-2">
                      <h5 className="card-title mb-0 text-dark">{p.title}</h5>
                      {p.rating && (
                        <span className="badge bg-warning text-dark">
                          ⭐ {p.rating}
                        </span>
                      )}
                    </div>

                    <div className="mb-2">
                      <span className="badge bg-secondary me-2">
                        {p.category}
                      </span>
                      {p.platform && (
                        <span className="badge bg-info text-dark">
                          {p.platform}
                        </span>
                      )}
                    </div>

                    <p className="card-text text-muted small">
                      {p.description || "Descrizione non disponibile"}
                    </p>

                    <div className="mt-auto">
                      <p className="card-text mb-2">
                        <small className="text-body-secondary">
                          Anno: {p.releaseYear || "N/A"}
                        </small>
                      </p>
                      <p className="text-primary fw-bold fs-5">
                        {p.price ? `${p.price}€` : "Prezzo non disponibile"}
                      </p>
                      <button className="btn btn-primary w-100">
                        Dettagli
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
