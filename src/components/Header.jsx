import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/logo.jpg";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useEffect } from "react";

const Header = ({
  token,
  setToken,
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
}) => {
  useEffect(() => {
    if (token) setToken(Cookies.get("token"));

    //
    if (visibleLogin || visibleSignup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [token, visibleLogin, visibleSignup]);

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
              {/* <Link to="/signup"> */}
              <button
                onClick={() => {
                  setVisibleSignup(!visibleSignup);
                }}
              >
                s'inscrire
              </button>
              {/* </Link> */}

              {/* <Link to="/login"> */}
              <button
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                }}
              >
                Se connecter
              </button>
              {/* </Link> */}
            </div>
          )}

          <button>Vends tes articles</button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
