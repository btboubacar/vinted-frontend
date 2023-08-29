const OrderDetails = ({ state, priceDetail }) => {
  return (
    <div className="payment-container">
      <h3>Résumé de la commande</h3>
      <div>
        <p>
          <span>Commande</span> <span>{state.price} €</span>
        </p>
        <p>
          <span>Frais protection acheteur</span>{" "}
          <span>{priceDetail.costProtection} €</span>
        </p>
        <p>
          <span>Frais de port</span> <span>{priceDetail.costShipping} €</span>
        </p>
      </div>
      <p>
        <span>Total</span> <span>{priceDetail.totalPrice.toFixed(2)} €</span>
      </p>

      <p>
        Il ne vous reste plus qu'un étape pour vous offrir {state.name}. Vous
        allez payer{" "}
        {(
          state.price +
          priceDetail.costProtection +
          priceDetail.costShipping
        ).toFixed(2)}{" "}
        € (frais de protection et frais de port inclus).
      </p>
    </div>
  );
};

export default OrderDetails;
