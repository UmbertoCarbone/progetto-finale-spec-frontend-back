import ComparisonCard from "./ComparisonCard.jsx";

// Componente che mostra l'offcanvas per il confronto prodotti
export default function Comparison({ selectedIds, setSelectedIds }) {
  const isOpen = selectedIds.length > 0; // L'offcanvas è aperto se c'è almeno un prodotto selezionato

  return (
    <div
      className={`offcanvas offcanvas-start ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none", // Mostra/nasconde l'offcanvas
        visibility: isOpen ? "visible" : "hidden", // Gestisce la visibilità
        width: "350px", // Larghezza fissa
        maxWidth: "90vw", // Larghezza massima su schermi piccoli
      }}
    >
      {/* Header dell'offcanvas con titolo e bottone di chiusura */}
      <div className="offcanvas-header border-bottom">
        <h5 className="offcanvas-title">Confronto ({selectedIds.length}/2)</h5>
        <button
          type="button"
          className="btn-close"
          onClick={() => setSelectedIds([])} // Svuota la selezione e chiude l'offcanvas
        ></button>
      </div>
      {/* Corpo dell'offcanvas: mostra una ComparisonCard per ogni prodotto selezionato */}
      <div className="offcanvas-body">
        <div className="row justify-content-center">
          {selectedIds.map((id) => (
            <div key={id} className="col-12 mb-3">
              <ComparisonCard
                productId={id}
                onRemove={
                  (id) => setSelectedIds((prev) => prev.filter((i) => i !== id)) // Rimuove il prodotto dal confronto
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
