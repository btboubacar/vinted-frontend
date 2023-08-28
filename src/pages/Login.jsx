import { useState, useEffect } from "react";

// api client
import apiClient from "../api/client";
const endpoint = "/user/login";

const Login = ({
  token,
  handleToken,
  setVisibleLogin,
  visibleSignup,
  setVisibleSignup,
  setRequestPublish,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(email, password);
    try {
      const response = await apiClient.post(endpoint, {
        email: email,
        password: password,
      });
      handleToken(response.data.token);

      setEmail("");
      setPassword("");
    } catch (error) {
      if (
        error.response.status === 400 ||
        error.response.status === 401 ||
        error.response.data.message.includes("Unauthorized")
      ) {
        setResponseMessage({
          ...responseMessage,
          message:
            "Erreur de login : mauvaise combinaison d'email et mot de passe",
          success: false,
        });
      }
      console.log(error.message, "\n", error.response);
    }
  };

  useEffect(() => {
    if (token) setVisibleLogin(false);
  }, [token, setVisibleLogin]);

  return (
    <div
      className="signup-container"
      onClick={() => {
        setVisibleLogin(false);
        setRequestPublish(false);
      }}
    >
      <div
        className="modal-container"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <button
          onClick={() => {
            setVisibleLogin(false);
            setRequestPublish(false);
          }}
          className="modal-button"
        >
          X
        </button>
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
          <p
            onClick={() => {
              setVisibleSignup(!visibleSignup);
              setVisibleLogin(false);
              setRequestPublish(false);
            }}
          >
            Pas encore de compte ? Inscris toi !
          </p>
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
    </div>
  );
};

export default Login;
