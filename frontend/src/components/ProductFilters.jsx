import { useState } from "react";
import AllCard from "./AllCard";

export default function ProductFilters({ products }) {
  const [inputTitle, setInputTitle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [order, setOrder] = useState("");

  // Estrai le categorie uniche dai prodotti per il filtro "evita duplicati"
  const uniqueCategories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) acc.push(product.category);
    return acc;
  }, []);

  // Filtra i prodotti in base all'input
  const filteredProducts = products.filter(
    (product) =>
      product.title.toUpperCase().includes(inputTitle.toUpperCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  // Ordina i prodotti
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (order === "title-asc") {
      return a.title.localeCompare(b.title);
    } else if (order === "title-desc") {
      return b.title.localeCompare(a.title);
    } else if (order === "category-asc") {
      return a.category.localeCompare(b.category);
    } else if (order === "category-desc") {
      return b.category.localeCompare(a.category);
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="mb-4 row justify-content-center text-center">
        {/* Input ricerca titolo */}
        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <label className="form-label fw-bold">Cerca Titolo</label>
          <input
            type="text"
            value={inputTitle}
            onChange={(e) => setInputTitle(e.target.value)}
            placeholder="Cerca titolo..."
            className="form-control"
          />
        </div>
        {/* Select categoria */}
        <div className="col-12 col-md-3 mb-2 mb-md-0">
          <label className="form-label fw-bold">Cerca Categoria</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Tutte le categorie</option>
            {uniqueCategories.map((cat, i) => (
              <option key={i} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        {/* Select ordinamento */}
        <div className="col-12 col-md-3 mb-2 mb-md-0 ">
          <label className="form-label fw-bold">Cerca per ordine</label>
          <select
            className="form-select"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="">Nessun ordinamento</option>
            <option value="title-asc">Titolo A-Z</option>
            <option value="title-desc">Titolo Z-A</option>
            <option value="category-asc">Categoria A-Z</option>
            <option value="category-desc">Categoria Z-A</option>
          </select>
        </div>
      </div>
      <AllCard products={sortedProducts} />
    </>
  );
}
