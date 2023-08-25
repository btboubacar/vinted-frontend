import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
// import { Link } from "react-router-dom";

const Signup = ({
  visibleLogin,
  setVisibleLogin,
  setVisibleSignup,
  token,
  setToken,
}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [responseMessage, setResponseMessage] = useState({
    message: "",
    success: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(username, email, password, newsletter);
    try {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        // "http://localhost:3000/user/signup",
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );
      Cookies.set("token", response.data.token, { expires: 7 });

      setResponseMessage({
        ...responseMessage,
        message: "Account successfully created !",
        success: true,
      });

      setToken(response.data.token);

      setUsername("");
      setEmail("");
      setPassword("");
      setNewsletter(false);
    } catch (error) {
      if (
        error.response.status === 409 ||
        error.response.data.message.includes("already")
      ) {
        console.log("Email already exists !");
        setResponseMessage({
          ...responseMessage,
          message: "Email est déja utilisé: veuillez en instruire un autre ",
          success: false,
        });
      }
      console.log(error.message, "\n", error.response);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (token) setVisibleSignup(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [token, setVisibleSignup]);

  return (
    <div
      className="signup-container"
      onClick={() => {
        setVisibleSignup(false);
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
            setVisibleSignup(false);
          }}
          className="modal-button"
        >
          X
        </button>
        <h1>S'inscrire</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={username}
            name="username"
            id="username"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setUsername(event.target.value);
              setResponseMessage({
                ...responseMessage,
                message: "",
                success: false,
              });
            }}
            required
          />
          <input
            type="text"
            value={email}
            name="email"
            id="email"
            placeholder="Email"
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
          <div className="check">
            <div>
              <input
                type="checkbox"
                name="checkbox"
                onChange={() => {
                  setNewsletter(!newsletter);
                }}
              />
              <h2>S'inscrire à notre newsletter</h2>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>

          <p
            onClick={() => {
              setVisibleLogin(!visibleLogin);
              setVisibleSignup(false);
            }}
          >
            Tu as déjà un compte ? connecte-toi !
          </p>
        </form>
        {responseMessage.message && (
          <textarea
            name="message"
            id="message"
            defaultValue={responseMessage.message}
            style={{ color: responseMessage.success ? "green" : "red" }}
          ></textarea>
        )}
      </div>
    </div>
  );
};

export default Signup;
