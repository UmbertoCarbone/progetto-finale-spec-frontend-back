import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalProvider } from "./contexts/GlobalContext";
import Homepage from "./pages/Hompeage"

export default function App() {
  return (
    /* 1. Avvolgiamo tutto col Provider così ProductList può leggere i dati */
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotta principale con la lista prodotti */}
          <Route path="/" element={<Homepage />} />

          {/* Rotta dettaglio (la attiveremo quando creerai il componente) */}
          {/* <Route path="/product/:id" element={<SingleProduct />} /> */}
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}