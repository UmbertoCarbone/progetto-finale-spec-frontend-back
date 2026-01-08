//TODO (search,setSearch) = passati a  PRODUCTLIST.JSX
export default function ProductFilters({ search, dispatch }) {
  return (
    <div className="p-3 bg-light border rounded">
      <input
        type="text"
        className="form-control"
        placeholder="Cerca titolo..."
        value={search}
        // Spediamo solo il testo, la logica la fa il reducer sopra
        onChange={(e) => dispatch({ type: "SEARCH", payload: e.target.value })}
      />
    </div>
  );
}
