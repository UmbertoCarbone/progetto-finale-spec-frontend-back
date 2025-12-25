import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SinglePage from "./pages/SinglePage";
import { GlobalProvider } from "./contexts/GlobalContext";
import { OffcanvasProvider } from "./contexts/OffcanvasContext";
import Offcanvas from "./components/Offcanvas.jsx";
function App() {
  return (
    <GlobalProvider>
      <OffcanvasProvider>
        <Offcanvas />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="product/:id" element={<SinglePage />} />
          </Routes>
        </BrowserRouter>
      </OffcanvasProvider>
    </GlobalProvider>
  );
}

export default App;
