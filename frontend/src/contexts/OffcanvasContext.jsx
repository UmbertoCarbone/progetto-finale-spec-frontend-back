import { createContext, useState } from "react";

const OffcanvasContext = createContext();

const OffcanvasProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Aggiunge un prodotto al confronto (massimo 2 prodotti alla volta)
  // Se il prodotto è già selezionato, non fa nulla
  // Se c'è spazio, lo aggiunge
  // Se ci sono già 2 prodotti, sostituisce il più vecchio con quello nuovo
  const addProductToCompare = (product) => {
    setSelectedProducts((prev) => {
      if (prev.find((p) => p.id === product.id)) return prev; // già presente
      if (prev.length < 2) return [...prev, product]; // aggiungi se c'è spazio
      return [prev[1], product]; // sostituisci il più vecchio
    });
    setIsOpen(true); // apre l'offcanvas
  };

  // Rimuove un prodotto dal confronto
  const removeProductFromCompare = (id) => {
    setSelectedProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Svuota il confronto
  const clearCompare = () => setSelectedProducts([]);

  return (
    <OffcanvasContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedProducts,
        addProductToCompare,
        removeProductFromCompare,
        clearCompare,
      }}
    >
      {children}
    </OffcanvasContext.Provider>
  );
};

export { OffcanvasContext, OffcanvasProvider };
