const OfferItemCard = ({ offer }) => {
  return (
    <div>
      <img src={offer.product_image.secure_url} alt={offer.product_name} />
      <p>{offer.product_price} €</p>
      {offer.product_details.map((detail, index) => {
        if (
          (detail.TAILLE && detail.TAILLE !== "undefined") ||
          (detail.ÉTAT && detail.ÉTAT !== "undefined")
        ) {
          return <p key={index}>{detail.TAILLE || detail.ÉTAT}</p>;
        } else {
          return null;
        }
      })}
    </div>
  );
};

export default OfferItemCard;
