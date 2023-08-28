import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../api/client";
// import axios from "axios";

// Icon library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Publish = () => {
  const [picture, setPicture] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [pictureUrl, setPictureUrl] = useState([]);
  //   const [exchange, setExchange] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(
      picture,
      title,
      description,
      brand,
      size,
      color,
      condition,
      city,
      price
    );
    // const userToken = "qLrwsqGOCeJ5fZ38"; // db
    //const userToken = "5-kJ2errazCTXvj3"; // local db
    const userToken = Cookies.get("token");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("brand", brand);
    formData.append("size", size);
    formData.append("condition", condition);
    formData.append("color", color);
    formData.append("city", city);
    for (let i = 0; i < picture.length; i++) {
      formData.append("picture", picture[i]);
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${userToken}`,
      },
    };

    const postResponse = await apiClient.post(
      //   "https://site--vinted-backend--25428jw7g85y.code.run/offers",
      "http://localhost:3000/offers",
      formData,
      config
    );

    console.log(postResponse);

    // reset inputs
    setPicture([]);
    setPictureUrl([]);
    setTitle("");
    setPrice("");
    setDescription("");
    setCondition("");
    setBrand("");
    setSize("");
    setColor("");
    setCity("");

    // redirect to home
    navigate("/");

    ////
  };

  return (
    <div className="publish-body">
      <section className="top-container ">
        <div className="publish-container">
          <h1>Vends tes articles</h1>
          <div className="bloc1">
            <div
              className={`photo-zone ${
                picture.length > 0 ? `after-add-photo` : `before-add-photo`
              }`}
            >
              {pictureUrl && (
                <div className="imgBloc">
                  {pictureUrl.map((url, index) => {
                    return (
                      <div key={index}>
                        <img src={url} alt={title} />
                        <FontAwesomeIcon
                          icon="xmark"
                          className="pictureCloseIcon"
                          onClick={() => {
                            const copyPictureUrl = [...pictureUrl];
                            copyPictureUrl.splice(index, 1);
                            setPictureUrl(copyPictureUrl);

                            const copyPicture = [...picture];
                            copyPicture.splice(index, 1);
                            setPicture(copyPicture);
                          }}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
              <label htmlFor="file" className="add-photo">
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={(event) => {
                    setPictureUrl([
                      ...pictureUrl,
                      URL.createObjectURL(event.target.files[0]),
                    ]);

                    setPicture([...picture, event.target.files[0]]);
                  }}
                />
                <span>+</span> <span>Ajouter une photo</span>
              </label>
            </div>
          </div>
          <div className="bloc2">
            <div className="inner-bloc inner-bloc2-1">
              <h2>Titre</h2>
              <input
                type="text"
                value={title}
                name="title"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc2-2">
              <h2>Décris ton article</h2>
              <textarea
                name="titleText"
                value={description}
                id="titleText"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              ></textarea>
            </div>
          </div>
          <div className="bloc3">
            <div className="inner-bloc inner-bloc2-1">
              <h2>Marque</h2>
              <input
                type="text"
                value={brand}
                name="title"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc2-1">
              <h2>Taille</h2>
              <input
                type="text"
                value={size}
                name="title"
                placeholder="ex: L / 40 / 12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc2-1">
              <h2>Couleur</h2>
              <input
                type="text"
                value={color}
                name="title"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc2-1">
              <h2>Etat</h2>
              <input
                type="text"
                value={condition}
                name="title"
                placeholder="ex: Neuf avec étiquette"
                onChange={(event) => {
                  setCondition(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc2-1">
              <h2>Lieu</h2>
              <input
                type="text"
                value={city}
                name="title"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="bloc4">
            <div className="inner-bloc inner-bloc2-1 inner-bloc4-1">
              <h2>Prix</h2>
              <input
                type="text"
                value={price}
                name="title"
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div className="inner-bloc inner-bloc4-2">
              {/* <div> */}
              <input type="checkbox" name="newsletter" />
              <span>Je suis intéressé(e) par les échanges </span>
              {/* </div> */}
            </div>
          </div>
          <input
            type="submit"
            className="submit-offer"
            onClick={handleSubmit}
          />
        </div>
      </section>
    </div>
  );
};

export default Publish;
