import { useState, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ProductFilters from "./ProductFilters";

export default function ProductList() {
  //prodotti e fetch da useContext
  const { products, fetchProducts } = useContext(GlobalContext);
  //ricerca titolo,ricerca categoria,ricerca per ordine presi da ProductFilters.
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [order, setOrder] = useState("");

  //fetch di tutti i prodotti
  useEffect(() => {
    fetchProducts();
  }, []);
  // filtro per cercare il gioco esatto
  const filterBySearch = (p) =>
    (p.title || "").toLowerCase().startsWith(search.trim().toLowerCase());

  const filterByCategory = (p) => !category || p.category === category;

  const sortByOrder = (a, b) =>
    order === "asc"
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);

  const filteredProducts = products
    .filter(filterBySearch) //  solo titolo
    .filter(filterByCategory) //  categoria se selezionata
    .sort(sortByOrder); // ordine alfabetico

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
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={p.imageUrl || "https://via.placeholder.com/250"}
                  className="card-img-top"
                  alt={p.title}
                  style={{ height: "250px", objectFit: "cover" }}
                />
                <div className="card-body d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{p.title}</h5>
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
                    <button className="btn btn-primary w-100">Dettagli</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
