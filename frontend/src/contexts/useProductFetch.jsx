import { useState, useEffect } from "react";

export default function useProductFetch(productId) {
  const [data, setData] = useState(null);
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;

  useEffect(() => {
    // Se non c'è l'ID (magari in una fase di caricamento), non facciamo nulla
    if (!productId) return;

    fetch(`${url}/${productId}`)
      .then((res) => res.json())
      .then((resData) => {
        // Accediamo alla proprietà .product come visto nel tuo JSON
        const finalData = resData.product ? resData.product : resData;
        setData(finalData);
      })
      .catch((err) => {
        console.error("Errore nel fetch dedicato:", err);
        setData(null);
      });
  }, [productId, url]);

  return data;
}