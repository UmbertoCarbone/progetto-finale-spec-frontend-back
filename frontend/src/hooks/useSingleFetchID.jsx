import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function useSingleFetchID() {
  const { id } = useParams();
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    async function fetchByID() {
      try {
        console.log(
          "%cFETCH SINGOLO PRODOTTO: URL →",
          "color: #00bfff; font-weight: bold;",
          `${url}/${id}`
        );
        const res = await fetch(`${url}/${id}`);
        if (!res.ok) {
          console.error(
            "%cERRORE HTTP:",
            "color: #ff3333; font-weight: bold;",
            res.status
          );
          throw new Error(`Errore HTTP: ${res.status}`);
        }
        const data = await res.json();
        console.log(
          "%cDati ricevuti dal fetch per ID:",
          "color: #00bfff; font-weight: bold;",
          id
        );
        const prod = data.product ? data.product : data;
        if (!prod || Object.keys(prod).length === 0) {
          console.warn(
            "%cNessun prodotto trovato!",
            "color: orange; font-weight: bold;"
          );
          setProduct(null);
        } else {
          setProduct(prod);
        }
      } catch (error) {
        console.error(
          "%cErrore fetch per ID:",
          "color: #00bfff; font-weight: bold;",
          error
        );
        setProduct(null);
      }
    }
    if (id) fetchByID();
  }, [url, id]);

  return product;
}