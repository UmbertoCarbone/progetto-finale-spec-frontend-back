import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalProvider from "./contexts/GlobalContext";
import Homepage from "./pages/Homepage";
import SingleProduct from "./pages/SingleProduct";

export default function App() {
  return (
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/product/:id" element={<SingleProduct />} />
          {/* Aggiungeremo la SinglePage nel prossimo step */}
        </Routes>
      </GlobalProvider>
    </BrowserRouter>
  );
}