import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import SinglePage from "./pages/SinglePage";
import { GlobalProvider } from "./contexts/GlobalContext";

function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="product/:id" element={<SinglePage />} />
        </Routes>
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;