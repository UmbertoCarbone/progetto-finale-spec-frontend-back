import { useState } from "react";

export default function InputTitle({ onSearch }) {
  const [inputTitle, setInputTitle] = useState("");

  function handleInput(lettera) {
    setInputTitle(lettera.toUpperCase());
    onSearch(lettera.toUpperCase());
  }

  return (
    <div className="mb-4 d-flex justify-content-center">
      <input
        type="text"
        value={inputTitle}
        onChange={(e) => handleInput(e.target.value)}
        placeholder="Cerca titolo..."
        className="form-control w-50"
      />
    </div>
  );
}
