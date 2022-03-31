import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { ProductsAndFiltersDataProvider } from "./context/ProductsAndFiltersContext/ProductsAndFilterContext";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ProductsAndFiltersDataProvider>
        <App />
      </ProductsAndFiltersDataProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
