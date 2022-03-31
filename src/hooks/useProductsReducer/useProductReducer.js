import { useReducer } from "react";
import { ACTION_TYPE } from "./filterActions";

function getDiscountedPrice(originalPrice, discountPercentage) {
  originalPrice = Number(originalPrice);
  discountPercentage = Number(discountPercentage);
  return originalPrice - (discountPercentage / 100) * originalPrice;
}

function filterProductsForDisplay(state, action) {
  let displayedProducts = state.allProducts;

  // Filtering based on categories
  displayedProducts = displayedProducts.filter(
    (product) =>
      action.selectedCategories.length === 0 ||
      action.selectedCategories.includes(product.genre)
  );

  // Filtering based on features
  displayedProducts = displayedProducts.filter(
    (product) =>
      action.selectedFeatures.length === 0 ||
      action.selectedFeatures.filter(
        (feature) =>
          Object.hasOwn(product, feature) && product[feature] === true
      ).length > 0
  );

  // Filtering based on price
  displayedProducts = displayedProducts.filter(
    (product) =>
      (product.on_discount
        ? getDiscountedPrice(product.price, product.discount_percentage)
        : Number(product.price)) <= action.selectedPrice
  );

  // Filtering based on rating
  displayedProducts = displayedProducts.filter(
    (product) => product.rating >= action.selectedRating
  );

  // Sorting products based on user selected criteria
  if (action.selectedSortingType === "price-low-to-high")
    displayedProducts.sort((previousProduct, nextProduct) => {
      if (previousProduct.price < nextProduct.price) return -1;

      if (previousProduct.price > nextProduct.price) return 1;

      return 0;
    });

  console.log("DISPLAYED PRODUCTS", displayedProducts);

  return displayedProducts;
}

export function productsReducer(state, action) {
  console.log("STATE IN REDUCER: ", state);
  console.log("ACTION IN REDICER: ", action);
  switch (action.actionType) {
    case ACTION_TYPE.INITIALISE_PRODUCTS:
      return {
        ...state,
        actionType: action.actionType,
        allProducts: action.allProducts,
        displayedProducts: action.allProducts,
      };

    case ACTION_TYPE.INITIALISE_CATEGORIES:
      return {
        ...state,
        actionType: action.actionType,
        allCategories: action.allCategories,
      };

    case ACTION_TYPE.INITIALISE_FEATURES:
      return {
        ...state,
        selectedFeatures: [],
      };

    case ACTION_TYPE.CATEGORY_FILTER:
      return {
        ...state,
        selectedCategories: action.selectedCategories,
        actionType: action.actionType,
        displayedProducts: filterProductsForDisplay(state, action),
      };
    case ACTION_TYPE.RATING_FILTER:
      return {
        ...state,
        selectedRating: action.selectedRating,
        actionType: action.actionType,
        displayedProducts: filterProductsForDisplay(state, action),
      };
    case ACTION_TYPE.SORTING_FILTER:
      return {
        ...state,
        actionType: action.actionType,
        selectedSortingType: action.selectedSortingType,
        displayedProducts: filterProductsForDisplay(state, action),
      };
    case ACTION_TYPE.PRICE_FILTER:
      return {
        ...state,
        actionType: action.actionType,
        selectedPrice: action.selectedPrice,
        displayedProducts: filterProductsForDisplay(state, action),
      };
    case ACTION_TYPE.FEATURE_FILTER:
      return {
        ...state,
        selectedFeatures: action.selectedFeatures,
        actionType: action.actionType,
        displayedProducts: filterProductsForDisplay(state, action),
      };
    case ACTION_TYPE.NO_FILTER:
      return state;
  }
}

// products, selectedRating, selectedCategories, selectedPrice, selectedSortingType, filterType

export const initialState = {
  allProducts: [],
  allCategories: [],
  displayedProducts: [],
  selectedRating: 1,
  selectedPrice: Number.MAX_SAFE_INTEGER,
  selectedCategories: [],
  selectedFeatures: [],
  selectedSortingType: "",
  actionType: ACTION_TYPE.NO_FILTER,
};

export const useProductsReducer = () => {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  return [state, dispatch];
};
