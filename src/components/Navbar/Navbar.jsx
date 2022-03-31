import {Link} from "react-router-dom"
import './navbar.css'

export const Navbar = () => {
    return (
        <nav
      className="navigation navigation-shadow black-bg white-color fixed-position width-100-percent z-index-2"
    >
      <Link to='/products' className="no-default-styles">
        <div className="navigation-title-container white-color">
          <div className="material-icons-outlined md-36">shopping_cart</div>
          <h1>NyceKart</h1>
        </div>
      </Link>

      <div
        className="input-icon-container white-bg black-color search-bar-container"
      >
        <div className="material-icons-outlined input-icon white-border">
          search
        </div>
        <input
          type="search"
          className="grey-border white-bg search-bar white-border"
        />
      </div>

      <ul className="navigation-links-container">
        <li className="navigation-link-item">
          <Link to='/products'>
            <button className="button pillbox-button white-bg black-color">
              Log In
            </button>
          </Link>
        </li>
        <li className="navigation-link-item">
          <Link to='/products'>
            <div className="badge-container">
              <span className="material-icons-outlined md-36">
                favorite_border
              </span>
              <span className="icon-badge white-bg black-border"> </span>
            </div>
          </Link>
        </li>
        <li className="navigation-link-item">
          <Link to='/products'>
            <div className="badge-container">
              <span className="material-icons-outlined md-36"> shopping_bag </span>
              <span className="icon-badge white-bg black-border"> </span>
            </div>
          </Link>
        </li>
      </ul>
    </nav>
    )
}