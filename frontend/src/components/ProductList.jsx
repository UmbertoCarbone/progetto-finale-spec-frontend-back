import { useReducer, useEffect, useContext } from "react";
import { GlobalContext } from "../contexts/GlobalContext";
import ProductFilters from "./ProductFilters";

export default function ProductList() {
  const { products, fetchProducts } = useContext(GlobalContext);

  const initialValue = { search: "", filtered: products };

  function reducer(state, action) {
    switch (action.type) {
      case "SEARCH":
        return {
          search: action.payload,
          filtered: products.filter((p) =>
            p.title.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, initialValue);

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <>
      <ProductFilters state={state} dispatch={dispatch} />
      <div className="container mt-5">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {state.filtered.map((p) => (
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

                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="text-primary fw-bold fs-5">
                        {p.price ? `${p.price}€` : "Prezzo non disponibile"}
                      </span>
                    </div>

                    <button className="btn btn-primary w-100">Dettagli</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
