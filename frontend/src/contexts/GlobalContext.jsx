import { createContext, useState } from "react";

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_REACT_APP_URL_JSON;

const GlobalProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // 1. Fetch della lista e arricchimento dati con Promise.all
  async function fetchProducts() {
    const response = await fetch(apiUrl);
    const list = await response.json();

    const promises = list.map(async (item) => {
      const res = await fetch(`${apiUrl}/${item.id}`);
      const data = await res.json();
      // Restituiamo direttamente l'oggetto scompattato
      return data.product;
    });

    const fullData = await Promise.all(promises);
    setProducts(fullData);
  }

  // 2. Fetch singolo per la pagina di dettaglio
  async function fetchProductById(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const data = await response.json();
    return data.product;
  }

  return (
    <GlobalContext.Provider
      value={{
        products,
        setProducts,
        fetchProducts,
        fetchProductById,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };