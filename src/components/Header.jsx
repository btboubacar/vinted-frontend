import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
import logo from "../assets/img/logo.jpg";

// Adapted from external components
import PriceSlider from "./PriceSlider";
import SliderSwitch from "./SliderSwitch";

const Header = ({
  token,
  handleToken,
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
  values,
  setValues,
  title,
  setTitle,
  sortDirection,
  setSortDirection,
}) => {
  const location = useLocation();

  useEffect(() => {
    if (visibleLogin || visibleSignup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [visibleLogin, visibleSignup, title]);

  return (
    <header>
      <div className="container header-container">
        <div className="img-logo">
          <Link
            to={"/"}
            onClick={() => {
              setVisibleSignup(false);
              setVisibleLogin(false);
            }}
          >
            <img src={logo} alt="Logo vinted" />
          </Link>
        </div>
        <div className="search-bar">
          <FontAwesomeIcon icon="magnifying-glass" className="glass" />
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Recherche des articles"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          {location.pathname === "/" && (
            <div className="sort-bloc">
              <div className="sort-direction">
                <span>Trier par prix: </span>{" "}
                <SliderSwitch
                  sortDirection={sortDirection}
                  setSortDirection={setSortDirection}
                />
              </div>
              <div className="sort-price">
                <span>Prix entre : </span>{" "}
                <PriceSlider values={values} setValues={setValues} />
              </div>
            </div>
          )}
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
                  handleToken(null);
                }}
              >
                Se deconnecter
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={() => {
                  setVisibleSignup(!visibleSignup);
                  setVisibleLogin(false);
                }}
              >
                s'inscrire
              </button>

              <button
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                  setVisibleSignup(false);
                }}
              >
                Se connecter
              </button>
            </div>
          )}

          <button
            onClick={() => {
              setVisibleLogin(!visibleLogin);
            }}
          >
            Vends tes articles
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
