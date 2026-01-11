import { createContext, useState } from "react";

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_REACT_APP_URL_JSON;

const GlobalProvider = ({ children }) => {
  // arr di prodotti
  const [products, setProducts] = useState([]);

  // stato per i 2 giochi da confrontare
  const [compareList, setCompareList] = useState([]);

  const toggleCompare = (product) => {
    setCompareList((list) => {
      const exists = list.some((p) => p.id === product.id);
      if (exists) return list.filter((p) => p.id !== product.id);
      if (list.length >= 2) return list;
      return [...list, product];
    });
  };

  

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
    //promise.all per chiamare tutti i prodotti con async/await
    const fullData = await Promise.all(promises);
    setProducts(fullData);
    console.log("fetch eseguito", fullData);
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
        compareList,
        toggleCompare,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
