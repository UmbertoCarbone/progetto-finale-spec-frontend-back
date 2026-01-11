import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();
const apiUrl = import.meta.env.VITE_REACT_APP_URL_JSON;

const GlobalProvider = ({ children }) => {
  // Array di prodotti
  const [products, setProducts] = useState([]);

  // Stato per i Preferiti (con localStorage)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("my_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [isFavOpen, setIsFavOpen] = useState(false);

  // Stato per il Confronto (senza localStorage)
  const [compareList, setCompareList] = useState([]);

  // useEffect per salvare solo i PREFERITI quando cambiano
  useEffect(() => {
    localStorage.setItem("my_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle Preferiti
  const toggleFavorite = (product) => {
    setFavorites((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (!exists) setIsFavOpen(true);
      return exists
        ? prev.filter((p) => p.id !== product.id)
        : [...prev, product];
    });
  };

  // Toggle Confronto
  const toggleCompare = (product) => {
    setCompareList((list) => {
      const exists = list.some((p) => p.id === product.id);
      if (exists) return list.filter((p) => p.id !== product.id);
      if (list.length >= 2) return list;
      return [...list, product];
    });
  };

  // 1. Fetch della lista completa
  async function fetchProducts() {
    try {
      const response = await fetch(apiUrl);
      const list = await response.json();

      const promises = list.map(async (item) => {
        const res = await fetch(`${apiUrl}/${item.id}`);
        const data = await res.json();
        return data.product;
      });

      const fullData = await Promise.all(promises);
      setProducts(fullData);
    } catch (err) {
      console.error("Errore fetch:", err);
    }
  }

  // 2. Fetch singolo per dettaglio
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
        favorites,
        toggleFavorite,
        isFavOpen,
        setIsFavOpen,
        compareList,
        toggleCompare,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContext, GlobalProvider };
