import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { Navigate, useLocation } from "react-router-dom";

const Payment = ({ token }) => {
  const location = useLocation();
  const stripePromise = loadStripe(
    "pk_test_51NkTCwHzayk09noy9q58rI6TAxRYxL9v1lSmGsAbHucU6XxmzaFoK6w3fxetZzILUcgWh9uqQa1ZY6VASyk3jMA300OMVYffhw"
  );
  return token ? (
    <Elements stripe={stripePromise}>
      <CheckoutForm state={location.state} />
    </Elements>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Payment;
