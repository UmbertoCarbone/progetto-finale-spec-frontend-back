import { useGlobalContext } from "../contexts/useGlobalContext.jsx";
import { useState } from "react";
import InputTitle from "../components/InputTitle.jsx";
import AllCard from "../components/AllCard.jsx";
import HeaderHomepage from "../components/HeaderHomepage.jsx";

export default function Homepage() {
  const { products } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  
// Estrai le categorie uniche dai prodotti
  const uniqueCategories = products.reduce((acc, product) => {
    if (!acc.includes(product.category)) acc.push(product.category);
    return acc;
  }, []);

  // Filtra i prodotti in base all'input
  const filteredProducts = products.filter(
    (product) =>
      product.title.toUpperCase().includes(search.toUpperCase()) &&
      (selectedCategory === "" || product.category === selectedCategory)
  );

  return (
    <div className="">
      <HeaderHomepage />
      <div className="container">
        <h1 className="text-center p-5">Titolo del momento</h1>
        <InputTitle
          onSearch={setSearch}
          categories={uniqueCategories}
          onCategoryChange={setSelectedCategory}
        />
        <AllCard products={filteredProducts} />
      </div>
    </div>
  );
}
