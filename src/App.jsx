import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
  const [token, setToken] = useState("");
  const [visibleSignup, setVisibleSignup] = useState(false);
  const [visibleLogin, setVisibleLogin] = useState(false);

  return (
    <Router>
      <Header
        token={token}
        setToken={setToken}
        visibleSignup={visibleSignup}
        setVisibleSignup={setVisibleSignup}
        visibleLogin={visibleLogin}
        setVisibleLogin={setVisibleLogin}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/offers/:id" element={<Offer />} />
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setToken={setToken} />} /> */}
      </Routes>
      {visibleSignup && (
        <Signup
          token={token}
          setToken={setToken}
          setVisibleSignup={setVisibleSignup}
          visibleLogin={visibleLogin}
          setVisibleLogin={setVisibleLogin}
        />
      )}
      {visibleLogin && (
        <Login
          token={token}
          setToken={setToken}
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
