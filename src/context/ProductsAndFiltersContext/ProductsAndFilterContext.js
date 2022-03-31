import axios from "axios";

import { useState, useEffect, useContext, createContext } from "react";
import { useProductsReducer } from "../../hooks/useProductsReducer/useProductReducer";
import { ACTION_TYPE } from "../../hooks/useProductsReducer/filterActions";
import { BACKEND_URL } from "../../env";

const ProductsAndFiltersContext = createContext();

const ProductsAndFiltersDataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [state, dispatch] = useProductsReducer();

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      const receivedProducts = await axios.get(`${BACKEND_URL}/products`);
      dispatch({
        actionType: ACTION_TYPE.INITIALISE_PRODUCTS,
        allProducts: receivedProducts.data,
      });
    })();
    setIsLoading(false);
  }, []);

  console.log("GLOBAL STATE: ", state);

  return (
    <ProductsAndFiltersContext.Provider
      value={{ state, dispatch, isLoading, setIsLoading }}
    >
      {children}
    </ProductsAndFiltersContext.Provider>
  );
};

const useProductsAndFiltersData = () => useContext(ProductsAndFiltersContext);

export { useProductsAndFiltersData, ProductsAndFiltersDataProvider };
