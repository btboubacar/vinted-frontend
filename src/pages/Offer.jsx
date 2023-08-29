import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

// api client
import apiClient from "../api/client";
//const endpoint = "/offer"; // LeReacteur route => no "s"
const endpoint = "/offers";

const Offer = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get(`${endpoint}/${id}`);

        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <progress value={null} />
  ) : (
    // return (
    <>
      {/* <Header /> */}
      <article className="offer-container">
        <div className="inner-offer-container">
          <div className="offer-image">
            <img src={data.product_image.secure_url} alt={data.product_name} />

            {data.product_pictures &&
              data.product_pictures.length > 0 &&
              data.product_pictures.map((picture, index) => (
                <img
                  key={index}
                  src={picture[0].secure_url}
                  alt={data.product_name}
                />
              ))}
          </div>
          <div className="offer-details">
            <div className="offer-details-product">
              <p>{data.product_price} €</p>
              {data.product_details.map((detail) => {
                const objKey = Object.keys(detail);

                return (
                  <p className="offer-text" key={objKey}>
                    {detail[objKey[0]] !== "undefined" && detail[objKey[0]] && (
                      <>
                        <span>{objKey}</span> <span>{detail[objKey[0]]}</span>{" "}
                      </>
                    )}
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
                {data.owner.account.avatar && (
                  <img
                    src={data.owner.account.avatar.secure_url}
                    alt="avatar"
                  />
                )}
                <p>{data.owner.account.username}</p>
              </div>
            </div>

            <button
              onClick={() => {
                navigate("/payment", {
                  state: {
                    price: data.product_price,
                    description: data.product_description || data.product_name,
                    name: data.owner.account.username,
                  },
                });
              }}
            >
              Acheter
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
export default Offer;
