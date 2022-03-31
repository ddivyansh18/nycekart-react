import './product.css'

function getDiscountedPrice(originalPrice, discountPercentage) {
    originalPrice = Number(originalPrice)
    discountPercentage = Number(discountPercentage)
    return originalPrice - ((discountPercentage/100) * originalPrice)
}


export const Product = (props) => {
    return (
        <div
          className="card card-default-shadow column-container products-grid-item"
        >
          <div className="card-extras">
            <div className={"card-badge " + (props.on_discount ? "bright-yellow-bg black-color" : "bright-red-bg white-color")}>{props.on_discount ? "SALE":"NEW"} !</div>
            <div
              className="material-icons-outlined md-36 dismiss-button bright-red-color hidden-visibility"
            >
              cancel
            </div>
          </div>
          <div className="card-image-container-column">
            <img
              src={props.img_link}
              alt={props.name}
              className="card-image-column responsive-image width-100-percent"
            />
          </div>
          <div className="text-items-container width-100-percent">
            <div className="card-title-text">{props.name}</div>
            <div className="card-subtitle-text">
              {props.description}
            </div>
            <div className="card-price-text">
              <strong>{`Rated ${props.rating} stars`}</strong>
              <span className='COD-text'>{props.cash_on_delivery && ", COD Available"}</span>
            </div>
            <div className="card-price-text">
              <s className="bright-red-color"> <strong>{props.on_discount && `₹ ${props.price}`}</strong></s>
              {props.on_discount ? <strong> {`₹ ${getDiscountedPrice(props.price, props.discount_percentage)}`} </strong> :<strong>{`₹ ${props.price}`}</strong>}
              {props.on_discount && <strong className='bright-green-color'> {`${props.discount_percentage}%  off`} </strong>}
            </div>
          </div>
          <div className="width-100-percent">
            <div className="action-buttons row-container">
              <button className="card-button pillbox-button black-bg white-color">
                ADD TO CART
              </button>
            </div>
            <div className="action-icons">
              <span className="material-icons-outlined"> favorite_border </span>
              <span className="material-icons-outlined"> share </span>
              <span className="material-icons-outlined"> more_vert </span>
            </div>
          </div>
        </div>
    )
}