import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

// Components
import Header from "./components/Header";
import DetectEscapeKey from "./components/DetectEscapeKey";

// External libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMagnifyingGlass,
  faXmark,
  faCamera,
} from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass, faXmark, faCamera);

function App() {
  const [token, setToken] = useState(Cookies.get("token") || null);
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  // sort
  const [values, setValues] = useState([0, 1000]);
  const [search, setSearch] = useState("");
  const [sortDirection, setSortDirection] = useState(false);

  // request connexion to publish offer
  const [requestPublish, setRequestPublish] = useState(false);

  // handle token
  const handleToken = (token) => {
    if (token) {
      Cookies.set("token", token, { expires: 15 });
      setToken(token);
    } else {
      Cookies.remove("token");
      setToken(null);
    }
  };

  return (
    <Router>
      <Header
        token={token}
        handleToken={handleToken}
        visibleSignup={visibleSignup}
        setVisibleSignup={setVisibleSignup}
        visibleLogin={visibleLogin}
        setVisibleLogin={setVisibleLogin}
        values={values}
        setValues={setValues}
        search={search}
        setSearch={setSearch}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
        requestPublish={requestPublish}
        setRequestPublish={setRequestPublish}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              visibleLogin={visibleLogin}
              setVisibleLogin={setVisibleLogin}
              setVisibleSignup={setVisibleSignup}
              values={values}
              search={search}
              sortDirection={sortDirection}
              requestPublish={requestPublish}
              setRequestPublish={setRequestPublish}
              token={token}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        {/* --- Redefinition of /login route if user types /login in the url */}
        <Route
          path="/login"
          element={
            <Login
              token={token}
              handleToken={handleToken}
              setVisibleLogin={setVisibleLogin}
              visibleSignup={visibleSignup}
              setVisibleSignup={setVisibleSignup}
              setRequestPublish={setRequestPublish}
            />
          }
        />
        <Route
          path="/signup"
          element={
            <Signup
              token={token}
              handleToken={handleToken}
              setVisibleSignup={setVisibleSignup}
              visibleLogin={visibleLogin}
              setVisibleLogin={setVisibleLogin}
              setRequestPublish={setRequestPublish}
            />
          }
        />
        <Route
          path="/publish"
          element={
            <Publish
              token={token}
              setVisibleLogin={setVisibleLogin}
              setRequestPublish={setRequestPublish}
            />
          }
        />
        <Route path="/payment" element={<Payment token={token} />} />
      </Routes>

      {/* ----- /login and /signup in modal forms */}
      {visibleSignup && (
        <Signup
          token={token}
          handleToken={handleToken}
          setVisibleSignup={setVisibleSignup}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
          setRequestPublish={setRequestPublish}
        />
      )}
      {visibleLogin && (
        <Login
          token={token}
          handleToken={handleToken}
          setVisibleLogin={setVisibleLogin}
          visibleSignup={visibleSignup}
          setVisibleSignup={setVisibleSignup}
          setRequestPublish={setRequestPublish}
        />
      )}
      {visibleLogin || visibleSignup ? (
        <DetectEscapeKey
          setVisibleLogin={setVisibleLogin}
          setVisibleSignup={setVisibleSignup}
        />
      ) : null}
    </Router>
  );
}

export default App;
