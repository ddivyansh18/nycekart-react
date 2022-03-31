import { Routes, Route } from "react-router-dom";

import { ProductsPage } from "./pages/ProductsPage";
import "./styles.css";

function App() {
  return (
    <>
      <Routes>
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </>
  );
}

export default App;
