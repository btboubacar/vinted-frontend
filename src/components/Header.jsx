import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/logo.jpg";

const Header = () => {
  return (
    <header>
      <div className="container header-container">
        <div className="img-logo">
          <img src={logo} alt="Logo vinted" />
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon="magnifying-glass" className="glass" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Recherche des articles"
          />
        </div>
        <nav className="nav-buttons">
          <div>
            <button>s'inscrire</button>
            <button>Se connecter</button>
          </div>
          <button>Vends tes articles</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
