import ComparisonCard from "./ComparisonCard.jsx";

export default function Comparison({ selectedIds, setSelectedIds }) {
  const isOpen = selectedIds.length > 0;

  return (
    <div
      className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        visibility: isOpen ? "visible" : "hidden",
        width: "350px", // larghezza offcanvas
        maxWidth: "90vw",
      }}
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Confronto ({selectedIds.length}/2)</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setSelectedIds([])}
        ></button>
      </div>
      <div className="offcanvas-body">
        <div className="row justify-content-center">
          {selectedIds.map((id) => (
            <div key={id} className="col-12 mb-3">
              <ComparisonCard
                productId={id}
                onRemove={(id) =>
                  setSelectedIds((prev) => prev.filter((i) => i !== id))
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
