import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import logo from "../assets/img/logo.jpg";
import Cookies from "js-cookie";
import { Link, useLocation } from "react-router-dom";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDebouncedCallback } from "use-debounce";
import PriceSlider from "./PriceSlider";
import SliderSwitch from "./SliderSwitch";

const Header = ({
  token,
  setToken,
  visibleSignup,
  setVisibleSignup,
  visibleLogin,
  setVisibleLogin,
  values,
  setValues,
  title,
  setTitle,
  state,
  setState,
  // sortDirection,
  // setSortDirection,
}) => {
  const location = useLocation();

  console.log(location);

  useEffect(() => {
    if (token) setToken(Cookies.get("token"));

    //
    if (visibleLogin || visibleSignup) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "scroll";
  }, [token, visibleLogin, visibleSignup, title]);

  // const debounced = useDebouncedCallback((value) => {
  //   setPriceRange({ ...priceRange, max: value }, 2000);
  // });
  // const debouncedMin = useDebouncedCallback((value) => {
  //   setPriceRange({ ...priceRange, min: value }, 2000);
  // });

  return (
    <header>
      <div className="container header-container">
        <div className="img-logo">
          <Link to={"/"}>
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
                <SliderSwitch state={state} setState={setState} />
                {/* <input
                type="checkbox"
                checked={sortDirection}
                onChange={() => {
                  setSortDirection(!sortDirection);
                }}
              /> */}
              </div>
              <div className="sort-price">
                <span>Prix entre : </span>{" "}
                <PriceSlider values={values} setValues={setValues} />
                {/* <form>
                <input
                  type="text"
                  value={priceRange.min}
                  name="minPrice"
                  onChange={
                    (event) => debouncedMin(event.target.value)
                    // console.log(event);
                    // setPriceRange({ ...priceRange, min: event.target.value });
                  }
                />{" "}
                <input
                  type="text"
                  value={priceRange.max}
                  name="maxPrice"
                  onChange={
                    (event) => debounced(event.target.value)
                    // setPriceRange({ ...priceRange, max: event.target.value });
                  }
                />
              </form> */}
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
