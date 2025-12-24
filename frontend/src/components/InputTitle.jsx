import { useState } from "react";

export default function InputTitle({ onSearch, categories, onCategoryChange }) {
  const [inputTitle, setInputTitle] = useState("");

  function handleInputTitle(value) {
    setInputTitle(value);
    onSearch(value);
  }

  return (
    <div className="mb-4 row justify-content-center">
      {/* Input ricerca titolo */}
      <div className="col-12 col-md-3 mb-2 mb-md-0">
        <input
          type="text"
          value={inputTitle}
          onChange={(e) => handleInputTitle(e.target.value)}
          placeholder="Cerca titolo..."
          className="form-control"
        />
      </div>
      {/* Select categoria */}
      <div className="col-12 col-md-3">
        <select
          className="form-select"
          onChange={(e) => onCategoryChange(e.target.value)}
        >
          <option value="">Tutte le categorie</option>
          {categories.map((cat,i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
