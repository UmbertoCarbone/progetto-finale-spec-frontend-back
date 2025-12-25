import { useEffect, useState } from "react";

export default function useProductDetails(id) {
  const url = import.meta.env.VITE_REACT_APP_URL_JSON;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      try {
        const res = await fetch(`${url}/${id}`);
        const data = await res.json();
        setProduct(data.product ? data.product : data);
      } catch {
        setProduct(null);
      }
    }
    fetchProduct();
  }, [id, url]);

  return product;
}