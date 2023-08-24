import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

// import Header from "./Header";

const Offer = () => {
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
          // `https://lereacteur-vinted-api.herokuapp.com/offer/64b5153b528a43ef1c118aa9`
        );
        // const response = await axios.get(
        //   "https://lereacteur-vinted-api.herokuapp.com/offers"
        // );

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    "Loading"
  ) : (
    // return (
    <>
      {/* <Header /> */}
      <article className="offer-container">
        <div className="inner-offer-container">
          <div className="offer-image">
            <img src={data.product_image.secure_url} alt={data.product_name} />
          </div>
          <div className="offer-details">
            <div className="offer-details-product">
              <p>{data.product_price} €</p>
              {data.product_details.map((detail) => {
                const objKey = Object.keys(detail);

                return (
                  <p key={objKey}>
                    {objKey} : {detail[objKey[0]]}
                  </p>
                );
              })}
            </div>
            <div>
              <p>{data.product_name}</p>
              {/* {data.product_details.map((detail) => {
                const objKey = Object.keys(detail);
                if (objKey[0] === "ÉTAT")
                  return <p key={objKey}>{detail[objKey]}</p>;
              })} */}
              <p>{data.product_description}</p>
              <div>
                <img src={data.owner.account.avatar.secure_url} alt="avatar" />
                <p>{data.owner.account.username}</p>
              </div>
            </div>

            <button>Acheter</button>
          </div>
        </div>
      </article>
    </>
  );
};
export default Offer;
