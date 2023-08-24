import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/logo.jpg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";

const Header = ({ token, setToken }) => {
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
          {token ? (
            <div>
              <button
                style={{
                  backgroundColor: "red",
                  borderColor: "red",
                  color: "white",
                }}
                onClick={() => {
                  Cookies.remove("token");
                  setToken("");
                }}
              >
                Se deconnecter
              </button>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button>s'inscrire</button>
              </Link>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </div>
          )}

          <button>Vends tes articles</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
