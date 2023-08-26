import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

//
const Home = ({
  values,
  setValues,
  title,
  setTitle,
  visibleLogin,
  setVisibleLogin,
  state,
  setState,
  // sortDirection,
  // setSortDirection,
}) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  let queryString = "";
  if (title) queryString += `?title=${title}`;
  if (values) {
    if (!queryString) queryString += `?priceMin=${values[0]}`;
    else queryString += `&priceMin=${values[0]}`;
  }

  if (values) {
    if (!queryString) queryString += `?priceMax=${values[1]}`;
    else queryString += `&priceMax=${values[1]}`;
  }

  if (!state) {
    if (!queryString) queryString += `?sort=price-asc`;
    else queryString += `&sort=price-asc`;
  } else {
    if (!queryString) queryString += `?sort=price-desc`;
    else queryString += `&sort=price-desc`;
  }

  console.log(queryString);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        // `http://localhost:3000/offer${queryString}`
        // "https://lereacteur-vinted-api.herokuapp.com/offers"
        // `https://lereacteur-vinted-api.herokuapp.com/offers?${
        //   title && `title=${title}`
        // }${values.min && `&priceMin=${values.min}`}${
        //   values.max && `&priceMax=${values.max}`
        // }`
        `https://lereacteur-vinted-api.herokuapp.com/offers${queryString}`
      );

      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchData();
  }, [title, values, state]);

  // const navigate = useNavigate();
  // const offerDetailsRoute = (path) => {
  //   navigate(path);
  // };

  return isLoading ? (
    "Loading ..."
  ) : (
    <>
      <div className="hero">
        <div>
          <p>Commencez à faire du tri dans vos placards ?</p>
          <button
            onClick={() => {
              setVisibleLogin(!visibleLogin);
            }}
          >
            Commencer à vendre
          </button>
        </div>
        <img
          src="https://www.repstatic.it/content/nazionale/img/2021/01/22/062940409-8153b63b-d426-4cca-b735-17e115109660.jpg?webp"
          alt=""
        />
        {/* <img src={data.offers[0].product_image.secure_url} alt="" /> */}
        {/* <img src={data.offers[0].product_pictures[0].secure_url} alt="" /> */}
        {/* <img
          src="https://www.repstatic.it/content/nazionale/img/2021/01/22/062940409-8153b63b-d426-4cca-b735-17e115109660.jpg?webp"
          alt=""
        /> */}
      </div>
      <main>
        <div className="main-container container">
          {data.offers.map((offer, index) => {
            return (
              <div key={offer._id} className="card-offer">
                {/* <p>{offer.product_name}</p> */}
                <p
                  onClick={() => {
                    alert("Go to user profile !");
                  }}
                >
                  {offer.owner.account.username}
                </p>
                <Link to={`/offers/${offer._id}`}>
                  <div
                  // onClick={() => {
                  //   offerDetailsRoute(`/offer/${offer._id}`);
                  // }}
                  >
                    <img
                      src={offer.product_image.secure_url}
                      alt={offer.product_name}
                    />
                    <p>{offer.product_price} €</p>
                    {offer.product_details.map((detail, index) => {
                      if (detail.TAILLE || detail.ÉTAT) {
                        return (
                          <p key={index}>{detail.TAILLE || detail.ÉTAT}</p>
                        );
                      } else {
                        return null;
                      }
                    })}
                  </div>
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
