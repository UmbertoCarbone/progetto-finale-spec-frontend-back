import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import Homepage from "./pages/Hompeage";
import SingleProduct from "./pages/SingleProduct";

export default function App() {
  return (
    /* 1. Avvolgiamo tutto col Provider così ProductList può leggere i dati */
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotta principale con la lista prodotti */}
          <Route path="/" element={<Homepage />} />

          <Route path="/product/:id" element={<SingleProduct />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}
