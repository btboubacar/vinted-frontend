import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import apiClient from "../api/client";
// import axios from "axios";
import { useDropzone } from "react-dropzone";
import React, { useCallback } from "react";

// Icon library
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const endpoint = "/offers";
// const endpoint = "/offer/publish"; // backend react

const Publish = ({ setVisibleLogin, setRequestPublish, token }) => {
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

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    setPictureUrl([
      ...pictureUrl,
      acceptedFiles.map((file) => URL.createObjectURL(file)),
    ]);

    setPicture([...picture, acceptedFiles.map((file) => file)]);
  });

  // Dropzone files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      formData.append("picture", picture[i][0]);
    }

    let config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    const postResponse = await apiClient.post(
      //   "https://site--vinted-backend--25428jw7g85y.code.run/offers",
      endpoint,
      formData,
      config
    );

    // console.log(postResponse.data);

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

    // redirect to offer page
    navigate(`/offers/${postResponse.data._id}`);

    ////
  };
  useEffect(() => {
    if (!token) {
      setVisibleLogin(true);
      setRequestPublish(true);
    } else {
      setRequestPublish(false);
      setVisibleLogin(false);
    }
  }, [token, setVisibleLogin, setRequestPublish]);

  return !token ? (
    <Navigate to="/"></Navigate>
  ) : (
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
              <label
                htmlFor="file"
                className={`${pictureUrl.length > 0 ? `imgBloc` : `add-photo`}`}
              >
                {/* <label htmlFor="file" className="add-photo"> */}
                <div
                  {...getRootProps({
                    className: `${
                      pictureUrl.length > 0 ? `add-photo` : `dropzone add-photo`
                    }`,
                  })}
                >
                  <input {...getInputProps()} />
                  {/* <p>Drag 'n' drop some files here, or click to select files</p> */}
                  <p>
                    <span>+</span> <span>Glisser ou ajouter une image</span>
                  </p>
                </div>
                {/* <input
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
                /> */}
                {/* <span>+</span> <span>Glisser ou Ajouter une image</span> */}
              </label>
            </div>
          </div>
          <div className="bloc2">
            <div className="inner-bloc inner-bloc2-1">
              {/* <input
                type="file"
                onChange={(event) => {
                  console.log(event.target.files);
                }}
              /> */}
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
