import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import OrderDetails from "./OrderDetails";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "../api/client";

// const backendURL = "https://site--vinted-backend--25428jw7g85y.code.run";
const endpoint = "/payment";

const CheckoutForm = ({ state }) => {
  const costShipping = 0.2;
  const costProtection = 0.1;
  const totalPrice = state.price + costProtection + costShipping;
  const priceDetail = {
    totalPrice: totalPrice,
    costProtection: costProtection,
    costShipping: costShipping,
  };
  const navigate = useNavigate();
  const [completed, setCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();

      setIsLoading(true);

      // retrieve user bank details
      const cardElement = elements.getElement(CardElement);

      // creation of token by Stripe API to be sent to backend
      const stripeResponse = await stripe.createToken(cardElement, {
        name: state.name,
      });

      const stripeToken = stripeResponse.token.id;

      const response = await apiClient.post(endpoint, {
        stripeToken: stripeToken,
        price: totalPrice.toFixed(2),
        description: state.description,
      });

      if (response.data.status === "succeeded") {
        setCompleted(true);
        setIsLoading(false);

        setTimeout(() => {
          setCompleted(false);
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <section className="payment-body">
        <OrderDetails state={state} priceDetail={priceDetail} />
        <form
          className="payment-container payment-form"
          onSubmit={handleSubmit}
        >
          <CardElement />
          {!completed ? (
            <button type="submit" disabled={isLoading}>
              Pay
            </button>
          ) : (
            <p
              style={{ color: "green", fontSize: "20px", textAlign: "center" }}
            >
              Paiement réussi ! Retour à la page d'accueil.
            </p>
          )}
        </form>
      </section>
    </>
  );
};

export default CheckoutForm;
