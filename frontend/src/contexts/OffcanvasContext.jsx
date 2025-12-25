import { createContext, useState } from "react";

const OffcanvasContext = createContext();

const OffcanvasProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Qui aggiungeremo le funzioni per aprire/chiudere l'offcanvas

  return (
    <OffcanvasContext.Provider
      value={{
        isOpen,
        setIsOpen,
        selectedProduct,
        setSelectedProduct,
      }}
    >
      {children}
    </OffcanvasContext.Provider>
  );
};

export { OffcanvasContext, OffcanvasProvider };
