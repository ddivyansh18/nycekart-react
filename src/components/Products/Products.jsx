import { useProductsAndFiltersData } from "../../context/ProductsAndFiltersContext/ProductsAndFilterContext";
import { Product } from "../Product/Product";
import "./products.css"

export const Products = () => {

    const {state} = useProductsAndFiltersData(); 

    return (
        <div className="products-container">
            {/* <div> {isLoading && "Loading"}</div>
            <div> {isError && "Error"}</div> */}
            {state.displayedProducts && state.displayedProducts.map((productInfo) => <Product {...productInfo} key={productInfo._id} />)}
        </div>
    )
}