import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import imageHero from "../assets/img/hero.jpg";

// Components
import OfferItemCard from "../components/OfferItemCard";
import SellArticleLink from "../components/SellArticleLink";

// api client
import apiClient from "../api/client";
const endpoint = "/offers";

//
const Home = ({
  values,
  search,
  visibleLogin,
  setVisibleLogin,
  setVisibleSignup,
  sortDirection,
  token,
  requestPublish,
  setRequestPublish,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let queryString = "";
  if (search) queryString += `?title=${search}`;
  if (values) {
    if (!queryString) queryString += `?priceMin=${values[0]}`;
    else queryString += `&priceMin=${values[0]}`;
  }

  if (values) {
    if (!queryString) queryString += `?priceMax=${values[1]}`;
    else queryString += `&priceMax=${values[1]}`;
  }

  if (!sortDirection) {
    if (!queryString) queryString += `?sort=price-asc`;
    else queryString += `&sort=price-asc`;
  } else {
    if (!queryString) queryString += `?sort=price-desc`;
    else queryString += `&sort=price-desc`;
  }

  const fetchData = async () => {
    try {
      const response = await apiClient.get(`${endpoint}${queryString}`);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search, values, sortDirection]);

  return isLoading ? (
    <progress value={null} />
  ) : (
    <>
      <div className="hero">
        <div>
          <p>Commencez à faire du tri dans vos placards ?</p>
          <SellArticleLink
            token={token}
            requestPublish={requestPublish}
            setRequestPublish={setRequestPublish}
            buttonTitle="Commencer à vendre"
            visibleLogin={visibleLogin}
            setVisibleLogin={setVisibleLogin}
            setVisibleSignup={setVisibleSignup}
            className={"hero-button"}
          />
        </div>
        <img
          // src="https://www.repstatic.it/content/nazionale/img/2021/01/22/062940409-8153b63b-d426-4cca-b735-17e115109660.jpg?webp"
          src={imageHero}
          alt="fonds du site"
        />
      </div>
      <main>
        <div className="main-container container">
          {data.offers.map((offer) => {
            return (
              <div key={offer._id} className="card-offer">
                <p
                  onClick={() => {
                    alert("Go to user profile !");
                  }}
                >
                  {offer.owner.account.username}
                </p>
                <Link to={`/offers/${offer._id}`}>
                  <OfferItemCard offer={offer} />
                </Link>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default Home;
