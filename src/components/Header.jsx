import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

//
import logo from "../assets/img/logo.jpg";

// Adapted from external components
import PriceSlider from "./PriceSlider";
import SliderSwitch from "./SliderSwitch";
import SellArticleLink from "./SellArticleLink";

const Header = ({
  token,
  handleToken,
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
  values,
  setValues,
  search,
  setSearch,
  sortDirection,
  setSortDirection,
  requestPublish,
  setRequestPublish,
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (visibleLogin || visibleSignup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [visibleLogin, visibleSignup, search]);

  return (
    <header>
      <div className="container top-container inner-header">
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
              setSearch(event.target.value);
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
                  setRequestPublish(false);
                  navigate("/");
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
                  setRequestPublish(false);
                }}
              >
                s'inscrire
              </button>

              <button
                onClick={() => {
                  setVisibleLogin(!visibleLogin);
                  setVisibleSignup(false);
                  setRequestPublish(false);
                }}
              >
                Se connecter
              </button>
            </div>
          )}
          <SellArticleLink
            token={token}
            requestPublish={requestPublish}
            setRequestPublish={setRequestPublish}
            buttonTitle="Vends tes articles"
            visibleLogin={visibleLogin}
            setVisibleLogin={setVisibleLogin}
            setVisibleSignup={setVisibleSignup}
          />
        </nav>
      </div>
    </header>
  );
};

export default Header;
