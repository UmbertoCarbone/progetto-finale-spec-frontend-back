import { useState, useEffect } from "react";
import { GlobalContext } from "./useGlobalContext.jsx";

export default function GlobalProvider({ children }) {
  const [products, setProducts] = useState([]);
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;

  useEffect(() => {
    console.log("Eseguo fetch su:", url);
    fetch(url)
      .then((res) => {
        console.log("Risposta fetch:", res);
        return res.json();
      })
      .then((data) => {
        console.log("Dati ricevuti:", data);
        setProducts(data);
      })
      .catch((err) => {
        console.error("Errore fetch lista:", err);
      });
  }, [url]);

  return (
    <GlobalContext.Provider value={{ products }}>
      {children}
    </GlobalContext.Provider>
  );
}
