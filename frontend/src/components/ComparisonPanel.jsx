import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../contexts/GlobalContext";

export default function ComparisonPanel() {
  const { compareList, toggleCompare } = useContext(GlobalContext);
  //controllo canvas "X"
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    setShowPanel(compareList.length > 0);
  }, [compareList]);

  if (!showPanel) return null;

  return (
    <>
      <div className={`comparison-sidebar open`}>
        <div className="d-flex justify-content-between align-items-center border-bottom border-secondary pb-3 mb-3">
          <h4 className="mb-0 fw-bold text-white">
            Confronto ({compareList.length}/2)
          </h4>
          <button
            className="btn-close btn-close-white"
            onClick={() => setShowPanel(false)}
          ></button>
        </div>

        <div className="">
          {compareList.map((product) => (
            <div
              key={product.id}
              className="card bg-dark border-secondary text-white mb-3 shadow-sm overflow-hidden"
            >
              <div className="card-body p-3">
                <div className="d-flex justify-content-between align-items-start">
                  <h5
                    className="fw-bold mb-2 text-truncate"
                    style={{ maxWidth: "85%" }}
                  >
                    {product.title}
                  </h5>
                  <button
                    className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                    onClick={() => toggleCompare(product)}
                    style={{ width: "24px", height: "24px", fontSize: "10px" }}
                  >
                    ✕
                  </button>
                </div>

                <img
                  src={product.imageUrl || "https://via.placeholder.com/150"}
                  alt={product.title}
                  className="img-fluid rounded mb-2 w-100"
                  style={{ height: "120px", objectFit: "cover" }}
                />

                <div className="d-flex gap-2 mb-2">
                  <span className="badge bg-warning text-dark">
                    ⭐ {product.rating}
                  </span>
                  <span className="badge bg-info text-dark">
                    {product.platform}
                  </span>
                </div>

                <p>{product.description}</p>

                <div className="border-top border-secondary pt-2 mt-2">
                  <p className="mb-1 small text-secondary">
                    Genere: {product.category}
                  </p>
                  <p className="mb-1 small text-secondary">
                    Anno: {product.releaseYear}
                  </p>
                  <h5 className=" fw-bold">{product.price}€</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
