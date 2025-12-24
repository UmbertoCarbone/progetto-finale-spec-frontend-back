import { createContext, useState, useEffect } from "react";

const GlobalContext = createContext();

function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Errore fetch:", err));
  }, [url]);

  return (
    <GlobalContext.Provider value={{ products, setProducts }}>
      {children}
    </GlobalContext.Provider>
  );
}

export { GlobalContext, GlobalProvider };
