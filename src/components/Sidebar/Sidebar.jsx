import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useProductsAndFiltersData } from '../../context/ProductsAndFiltersContext/ProductsAndFilterContext';
import { ACTION_TYPE } from '../../hooks/useProductsReducer/filterActions'
import { BACKEND_URL } from '../../env';
import './sidebar.css'

const ratings = [1, 2, 3 ,4];
const sortingCriterias = ['price-low-to-high', 'price-high-to-low']
// {
//   products, selectedRating, selectedCategories, selectedPrice, selectedSortingType, filterType
// }

function getUpdatedStateBasedOnCategory(state, eventTargetId, checked) {
  let updatedCategories = state.selectedCategories;
  const newCategory = eventTargetId.toLowerCase();
  
  if(checked)
  updatedCategories.push(newCategory);
  else
  updatedCategories.splice(updatedCategories.indexOf(newCategory), 1);

  return {
    ...state,
    selectedCategories : updatedCategories,
    actionType: ACTION_TYPE.CATEGORY_FILTER
  };
}

function getUpdatedStateBasedOnFeatures(state, eventTargetId, checked) {
  console.log("RECIEVED STATE: ", state)

  let updatedFeatures = state.selectedFeatures;
  const newFeature = eventTargetId;
  
  if(checked)
  updatedFeatures.push(newFeature);
  else
  updatedFeatures.splice(updatedFeatures.indexOf(newFeature), 1);


  return {
    ...state,
    selectedFeatures : updatedFeatures,
    actionType: ACTION_TYPE.FEATURE_FILTER
  };
}

function getDiscountedPrice(originalPrice, discountPercentage) {
  originalPrice = Number(originalPrice);
  discountPercentage = Number(discountPercentage);
  return originalPrice - (discountPercentage / 100) * originalPrice;
}

function getMinimumProductPrice(products) {

  if(products && products.length === 0) 
  return 0;

  return products.reduce((previousProductPrice, {on_discount, discount_percentage, price}) => {
    const currentProductPrice = on_discount ? getDiscountedPrice(price, discount_percentage) : price;
    return previousProductPrice > currentProductPrice ? currentProductPrice : previousProductPrice;
  }, products[0].price)
}

function getMaximumProductPrice(products) {

  if(products && products.length === 0) 
  return 0;

  return products.reduce((previousProductPrice, {on_discount, discount_percentage, price}) => {
    const currentProductPrice = on_discount ? getDiscountedPrice(price, discount_percentage) : price;
    return previousProductPrice < currentProductPrice ? currentProductPrice : previousProductPrice;
  }, products[0].price)
}

const featureValueToFeatureName = feature => feature.split('_').map(word => word[0].toUpperCase() + word.substr(1)).join(' ')

const sortingCriteriaValueToSortingCriteriaName = (sortingCriteria) => {
  const sortingCriteriaName = sortingCriteria.split('-').map(word => word[0].toUpperCase() + word.substr(1));
  sortingCriteriaName[0] = sortingCriteriaName[0] + ":";
  return sortingCriteriaName.join(' ');
}

export const Sidebar = () => {

    const [categories, setCategories] = useState();
    const [features, setFeatures] = useState();
    const {state, dispatch} = useProductsAndFiltersData()


    useEffect(() => {
      console.log(state);
      (async() => {
        const recievedCategories = await axios.get(`${BACKEND_URL}/categories`);
        setCategories(recievedCategories.data);
        
        const recievedFeatures = await axios.get(`${BACKEND_URL}/features`);
        setFeatures(recievedFeatures.data);
      })();
    },[])

    const maximumProductPrice = Math.ceil(getMaximumProductPrice(state.allProducts));
    const minimumProductPrice = Math.floor(getMinimumProductPrice(state.allProducts));
    const averageProductPrice = Math.floor(minimumProductPrice + (maximumProductPrice - minimumProductPrice) / 2.0);
    const priceSliderRef = useRef();

    console.log(minimumProductPrice, maximumProductPrice)

    
    return (
        <aside className="sidebar-container fixed-position">
        <div className="filters-heading-container row-container">
          <h3>Clear Filters</h3>
        </div>

        <h2 className="sidebar-heading">Price</h2>
        <div className="price-slider">
          <div className="price-range-values-container width-100-percent">
            <h3>{minimumProductPrice}</h3>
            <h3>{averageProductPrice}</h3>
            <h3>{maximumProductPrice}</h3>
          </div>
          <input
            type="range"
            min={minimumProductPrice}
            max={maximumProductPrice}
            defaultValue={maximumProductPrice}
            id="price-slider"
            className="slider width-100-percent"
            ref={priceSliderRef}
            onChange={
              (event) => {
                dispatch({
                  ...state,
                  actionType: ACTION_TYPE.PRICE_FILTER,
                  selectedPrice: event.target.value
                })
              }
            }
          />
        </div>

        <p>Displying products upto <strong>{`₹ ${priceSliderRef.current && priceSliderRef.current.value || maximumProductPrice}`}</strong></p>
        <p>Found <strong>{state.displayedProducts.length} products</strong> satisfying current criterias.</p>
        
        <h2 className="sidebar-heading">Category</h2>
        
        <div className="categories-container">
        {categories && categories.map(({_id,category}) => 
              <div key={_id}>
              <input
                type="checkbox"
                id={category}
                // name="category"
                // value="Category"
                onChange= {
                  (event) => {
                    dispatch(getUpdatedStateBasedOnCategory(state, event.target.id, event.target.checked));
                  }
                }
              />
            
              <label htmlFor={category}> {category} </label>
            </div>)}
        </div>
          

        <h2 className="sidebar-heading">Features</h2>
        <div className="categories-container">
        {features && features.map(({_id, feature}) => 
            <div key={_id}>
              <input
                type="checkbox"
                id={feature}
                // name="feature"
                // value="Feature"
                onChange= {
                  (event) => {
                    console.log(event.target.id, event.target.checked);
                    dispatch(getUpdatedStateBasedOnFeatures(state, event.target.id, event.target.checked));
                  }
                }
              />
              <label htmlFor={feature}> {featureValueToFeatureName(feature)} </label>
          </div>
        )}
        </div>

        <h2 className="sidebar-heading">Rating</h2>
        <div className="categories-container">
        {ratings.map((rating) => 
          <div className="row-container" key={rating}>
            <input
              type="radio"
              name="rating-filter"
              id={`${rating}-stars-and-above`}
              value={rating}
              onChange={
                (event) => {
                  dispatch({
                    ...state,
                    actionType: ACTION_TYPE.RATING_FILTER,
                    selectedRating: event.target.value
                  })
                }
              }
            />
            <label htmlFor={`${rating}-stars-and-above`}> {`${rating} star(s) and above`}</label>
          </div>
          )}
        </div>


          <h2 className="sidebar-heading">Sort By</h2>
          <div className="column-container width-100-percent">
            {
              sortingCriterias.map((sortingCriteria) => 
              <div className="row-container width-100-percent" key={sortingCriteria}>
            <input
              type="radio"
              name="sorting-criteria"
              id={sortingCriteria}
              value={sortingCriteria}
              onChange={
                (event) => {
                  dispatch({
                  ...state,
                  actionType: ACTION_TYPE.SORTING_FILTER,
                  selectedSortingType: event.target.id
                })
                }
              }
            />
            <label htmlFor={sortingCriteria}> {sortingCriteriaValueToSortingCriteriaName(sortingCriteria)}</label>
          </div>)
            }
          </div>
      </aside>)
}