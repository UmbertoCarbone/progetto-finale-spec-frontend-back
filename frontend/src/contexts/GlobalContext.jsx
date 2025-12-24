import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(url);

        // Controllo status HTTP
        if (!res.ok) {
          throw new Error(`Errore HTTP: ${res.status}`);
        }

        const data = await res.json();
        console.log("Dati ricevuti dal fetch:", data);

        // Controllo se data è un array
        if (!Array.isArray(data)) {
          throw new Error("I dati ricevuti non sono un array!");
        }

        // Controllo se l'array è vuoto
        if (data.length === 0) {
          console.warn("Nessun prodotto trovato!");
        }

        setProducts(data);
      } catch (err) {
        console.error("Errore fetch:", err);
        setProducts([]); // opzionale: svuota prodotti in caso di errore
      }
    }
    fetchProducts();
  }, [url]);

  return (
    <GlobalContext.Provider value={{ products, setProducts }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
