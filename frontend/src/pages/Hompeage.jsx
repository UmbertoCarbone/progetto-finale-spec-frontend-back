import ProductList from "../components/ProductList";
import HeroSection from "../components/HeroSection";
import Footer from "../components/Footer";
import ComparisonPanel from "../components/ComparisonPanel";
import FavoritesPanel from "../components/FavoritesPanel";
export default function Homepage() {
  return (
    <>
      <HeroSection />
      <ProductList />
      <ComparisonPanel />
      <Footer />
      <FavoritesPanel />
    </>
  );
}
