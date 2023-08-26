import { useState, useEffect } from "react";

// api client
import apiClient from "../api/client";
const endpoint = "/user/signup";

const Signup = ({
  visibleLogin,
  setVisibleLogin,
  setVisibleSignup,
  token,
  handleToken,
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
      const response = await apiClient.post(endpoint, {
        username: username,
        email: email,
        password: password,
        newsletter: newsletter,
      });
      handleToken(response.data.token);
      setResponseMessage({
        ...responseMessage,
        message: "Account successfully created !",
        success: true,
      });

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
    if (token) setVisibleSignup(false);
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
