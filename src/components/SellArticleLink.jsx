import { Link, Navigate } from "react-router-dom";

const SellArticleLink = ({
  token,
  requestPublish,
  buttonTitle,
  setRequestPublish,
  visibleLogin,
  setVisibleLogin,
  setVisibleSignup,
}) => {
  /* Nested ternary : redirect user to publish page after having having requested "publish" without being logged in. */
  // This component is re-usable for the hero button

  return token && requestPublish ? (
    <>
      <Navigate to="/publish" />
      <button>{buttonTitle}</button>
      {setRequestPublish(false)}
    </>
  ) : token ? (
    <Link to={"/publish"}>
      <button
        onClick={() => {
          // setRequestPublish(true);
          setVisibleLogin(!visibleLogin);
          // setVisibleSignup(false);
        }}
      >
        {buttonTitle}
      </button>
    </Link>
  ) : (
    <button
      onClick={() => {
        setRequestPublish(true);
        setVisibleLogin(!visibleLogin);
        setVisibleSignup(false);
      }}
    >
      {buttonTitle}
    </button>
  );
};

export default SellArticleLink;
