export default function ProductFilters({
  search,
  setSearch,
  category,
  setCategory,
  order,
  setOrder,
  products,
})
 {

  //elimina i duplicati delle categorie grazie a new Set!!
  const categories = [...new Set(products.map((p) => p.category))];

  // log per testare la categorie
  /* console.log(categories) */

  return (
    <div className="row g-3 p-3 bg-light border rounded">
      <div className="col-md-4">
        <h3>RICERCA:</h3>
        <input
          className="form-control"
          placeholder="Cerca..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="col-md-4">
        <h3>Cerca Gioco</h3>
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-4">
        <h3>Ordine Alfabetico</h3>
        <select
          className="form-select"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="">Casuale</option>
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
}
