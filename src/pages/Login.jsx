import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(email, password);
    try {
      const response = await axios.post(
        // "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        "http://localhost:3000/user/login",
        {
          email: email,
          password: password,
        }
      );
      console.log(response.data);
      Cookies.set("token", response.data.token, { expires: 7 });

      setToken(response.data.token);
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (error) {
      if (error.response.status === 400) {
        console.log(error.response.data.message);
        setResponseMessage({
          ...responseMessage,
          message: error.response.data.message,
          success: false,
        });
      }
      console.log(error.message, "\n", error.response);
    }
  };
  return (
    <div className="container signup-container">
      <h1>Se connecter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={email}
          name="email"
          id="email"
          placeholder="Adresse email"
          onChange={(event) => {
            setEmail(event.target.value);
            setResponseMessage({
              ...responseMessage,
              message: "",
              success: false,
            });
          }}
          required
        />
        <input
          type="password"
          value={password}
          name="password"
          id="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
            setResponseMessage({
              ...responseMessage,
              message: "",
              success: false,
            });
          }}
          required
        />
        <button type="submit">Se connecter</button>
        <p>Pas encore de compte ? Inscris toi !</p>
      </form>
      {responseMessage.message && (
        <textarea
          name="message"
          id="message"
          style={{ color: responseMessage.success ? "green" : "red" }}
          value={responseMessage.message}
          onChange={() => {}}
        ></textarea>
      )}
    </div>
  );
};

export default Login;
