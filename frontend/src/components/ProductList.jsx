import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ProductFilters from "./ProductFilters";
import { Link } from "react-router-dom";

export default function ProductList() {
  // 1. Estrazione dati dal GlobalContext
  const {
    products,
    fetchProducts,
    compareList,
    toggleCompare,
    favorites,
    toggleFavorite,
    isFavOpen,
    setIsFavOpen,
    showPanel,
    setShowPanel,
  } = useContext(GlobalContext);

  // 2. Stati per i filtri
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  // Gestione click sul bottone confronto
  const handleCompareClick = (e, product) => {
    e.preventDefault();
    // evitare il redirect di tutta la card nella single page
    e.stopPropagation();
    toggleCompare(product);
  };

  // Gestione click sul bottone preferiti
  const handleFavoriteClick = (e, product) => {
    e.preventDefault();
    // evitare il redirect di tutta la card nella single page
    e.stopPropagation();
    toggleFavorite(product);
  };

  // Filtra i prodotti in base alla ricerca
  const filterBySearch = (p) =>
    (p.title || "").toLowerCase().startsWith(search.trim().toLowerCase());

  // Filtra i prodotti in base alla categoria selezionata
  const filterByCategory = (p) => !category || p.category === category;

  // Ordina i prodotti per titolo (A/Z)
  const sortByOrder = (a, b) =>
    order === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);

  // Applica filtri e ordinamento ai prodotti
  const filteredProducts = products
    .filter(filterBySearch)
    .filter(filterByCategory)
    .sort(sortByOrder);
  //log di prova

  /*  console.log("Prodotti filtrati:", filteredProducts); */

  // Controlla se il prodotto è già presente nella lista di confronto
  const checkIsInCompare = (p) => compareList.some((item) => item.id === p.id);
  // Verifica se il prodotto è tra i preferiti
  const checkIsFavorite = (p) => favorites.some((item) => item.id === p.id);

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

      <div className="d-flex justify-content-center mt-4">
        <button
          className="btn btn-outline-danger px-4 py-2 fw-semibold shadow-sm"
          onClick={() => setIsFavOpen(!isFavOpen)}
          type="button"
        >
          {isFavOpen ? "Chiudi Preferiti" : "Apri Preferiti"}
        </button>
        <button
          className="btn btn-outline-success px-4 py-2 fw-semibold shadow-sm ms-3"
          onClick={() => setShowPanel(!showPanel)}
          type="button"
        >
          {showPanel ? "Chiudi Confronto" : "Confronto Prodotti"}
        </button>
      </div>

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

                    <div className="mb-2 d-flex flex-column gap-2">
                      <div className="d-flex align-items-center">
                        <p className="mb-0 fw-semibold me-2">Piattaforma:</p>
                        <span className="badge badge-bg-info-opacity-blue text-dark d-flex align-items-center px-2 py-2 fs-6 fw-bold">
                          {p.platform}
                          <i className="bi bi-controller ms-2"></i>
                        </span>
                      </div>
                      <div className="d-flex align-items-center">
                        <p className="mb-0 fw-semibold me-2">Categoria:</p>
                        <span className="badge badge-bg-info-opacity-violet text-dark d-flex align-items-center px-2 py-2 fs-6 fw-bold">
                          {p.category}
                          <i className="bi bi-controller ms-2"></i>
                        </span>
                      </div>
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
                      <div className="d-flex align-items-center gap-2">
                        <button className="btn btn-primary z-3 shadow-sm flex-fill py-2">
                          Dettagli
                        </button>

                        <button
                          className={`btn z-3 shadow-sm flex-fill py-2 ${
                            checkIsInCompare(p)
                              ? "btn-success"
                              : "btn-dark opacity-75"
                          }`}
                          onClick={(e) => handleCompareClick(e, p)}
                        >
                          {checkIsInCompare(p)
                            ? "✓ In confronto"
                            : " Confronta"}
                        </button>

                        <button
                          className={`btn z-3 shadow-sm flex-fill py-2 ${
                            checkIsFavorite(p)
                              ? "btn-danger"
                              : "btn-outline-danger"
                          }`}
                          onClick={(e) => handleFavoriteClick(e, p)}
                        >
                          {checkIsFavorite(p) ? "Salvato ❤️‍🔥" : "Aggiungi"}
                        </button>
                      </div>
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
