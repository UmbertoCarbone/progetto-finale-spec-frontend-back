import { useGlobalContext } from "../contexts/useGlobalContext.jsx";
import ProductFilters from "../components/ProductFilters.jsx";
import HeaderHomepage from "../components/HeaderHomepage.jsx";
import Footer from "../components/Footer.jsx";

export default function Homepage() {
  const { products } = useGlobalContext();

  return (
    <div>
      <HeaderHomepage />
      <div className="container">
        <h1 className="text-center p-5">I MIGLIORI GIOCHI</h1>
        <ProductFilters products={products} />
      </div>
      <Footer />
    </div>
  );
}
 