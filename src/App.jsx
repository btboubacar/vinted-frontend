import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Offer from "./pages/Offer";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

// Components
import Header from "./components/Header";
import DetectEscapeKey from "./components/DetectEscapeKey";

// External libraries
import { library } from "@fortawesome/fontawesome-svg-core";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
library.add(faMagnifyingGlass);

function App() {
  const [token, setToken] = useState(null);
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  // sort
  const [values, setValues] = useState([5, 500]);
  const [title, setTitle] = useState("");
  const [sortDirection, setSortDirection] = useState(false);

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
        title={title}
        setTitle={setTitle}
        sortDirection={sortDirection}
        setSortDirection={setSortDirection}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              visibleLogin={visibleLogin}
              setVisibleLogin={setVisibleLogin}
              values={values}
              setValues={setValues}
              title={title}
              setTitle={setTitle}
              sortDirection={sortDirection}
              setSortDirection={setSortDirection}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
      </Routes>
      {visibleSignup && (
        <Signup
          token={token}
          handleToken={handleToken}
          setVisibleSignup={setVisibleSignup}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
      )}
      {visibleLogin && (
        <Login
          token={token}
          handleToken={handleToken}
          setVisibleLogin={setVisibleLogin}
          visibleSignup={visibleSignup}
          setVisibleSignup={setVisibleSignup}
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
