import { useEffect } from "react";

const DetectEscapeKey = ({ setVisibleLogin, setVisibleSignup }) => {
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key.toLowerCase() === "escape") {
        setVisibleLogin(false);
        setVisibleSignup(false);
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
    // return function cleanup() {
    //   document.removeEventListener("keydown", handleKeyPress);
    // };
  }, [setVisibleLogin, setVisibleSignup]);

  return <div></div>;
};
export default DetectEscapeKey;
