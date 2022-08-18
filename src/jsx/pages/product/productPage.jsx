import React, { Component, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import * as http from "../../../js/services/http/httpService";
import ProductInCartCounter from "../../components/productItem/productInCartCounter";
import { UseStore } from "../../../js/services/context/storeContext";

import CommentSection from "./comments";
import DescriptionSection from "./description";
import TagComponent from "../../components/tagComponent";
import RateStarsComponent from "../../components/productItem/rateStarsComponent";

import "../../../css/global.css";
import "../../../css/mixins.css";
import "../../../css/pages/product/productPage.css";
import "../../../css/pages/product/preview.css";
import "../../../css/pages/product/commentSection.css";

export const ProductPage = (props) => {
  const [product, setProduct] = useState({ brand: {}, images: [] });

  const [modalPreview, setModalPreview] = useState(false);
  const { cart } = UseStore("");

  let finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  finalPrice = Number(finalPrice).toFixed(2);

  let { id } = useParams();
  id = id.split("::")[1];

  // title
  useEffect(() => {
    document.title = `${product.title} - BestShop.com`;
  }, [product]);

  useEffect(() => {
    if (!product.id)
      http.get(`/api/products/${id}`).then((res) => {
        const product = res.data;
        product.images = [
          { id: 0, url: product.thumbnail },
          { id: 1, url: product.thumbnail },
          { id: 2, url: product.thumbnail },
          { id: 2, url: product.thumbnail },
          { id: 2, url: product.thumbnail },
          { id: 2, url: product.thumbnail },
          { id: 2, url: product.thumbnail },
        ];
        setProduct(res.data);
        // setMainPreviewImage(product.images[0].url);
      });
  }, [product, cart]);
  return (
    <React.Fragment>
      <div className="product-section">
        <ProductPreview
          images={product.images}
          setModalPreview={setModalPreview}
        />
        <ModalProductPreview
          images={product.images}
          modalPreview={modalPreview}
          setModalPreview={setModalPreview}
        />
        <div className="details">
          <TagComponent
            backgroundColor="black"
            color="white"
            text={product.brand.name}
          />
          <div className="title">{product.title}</div>

          <RateStarsComponent
            likes={product.likes}
            dislikes={product.dislikes}
          />

          <div className="price">
            <span className="final-price">
              {"$" + finalPrice}
              <span className="stock">({product.numberInStock} left)</span>
            </span>
            <div className="previous-price">{"$" + product.price}</div>
          </div>
          <div className="buy">
            <ProductInCartCounter
              style={{ width: "200px" }}
              prod_id={product.id}
            />
          </div>
        </div>
      </div>

      <DescriptionSection text={product.description} />

      <CommentSection prod_id={product.id} />
    </React.Fragment>
  );
};

const ProductPreview = ({ images, setModalPreview }) => {
  const [mainPreviewImage, setMainPreviewImage] = useState("");
  const switchPreviewTo = (thumbnail) => {
    setMainPreviewImage(thumbnail);
  };
  useEffect(() => {
    if (images.length) setMainPreviewImage(images[0].url);
  }, [images]);
  return (
    <div id="preview" className={"product-preview"}>
      <div>
        <img
          onClick={() => setModalPreview(true)}
          className="main-preview"
          src={mainPreviewImage}
          alt=""
        />
        <div className="mini-preview-wrap">
          {images &&
            images.map((img, index) => (
              <img
                key={index}
                onClick={() => switchPreviewTo(img.url)}
                className="mini-preview"
                src={img.url}
                alt=""
              />
            ))}
        </div>
      </div>
    </div>
  );
};
const ModalProductPreview = ({ images, modalPreview, setModalPreview }) => {
  const [mainPreviewImage, setMainPreviewImage] = useState("");
  const switchPreviewTo = (thumbnail) => {
    setMainPreviewImage(thumbnail);
  };
  useEffect(() => {
    if (images.length) setMainPreviewImage(images[0].url);
  }, [images]);
  if (modalPreview)
    return (
      <div className="product-modal-preview-wrap">
        <div id="modal-preview" className={"product-modal-preview"}>
          <button
            onClick={() => setModalPreview(false)}
            className="closeButton"
          >
            X
          </button>
          <img className="main-preview" src={mainPreviewImage} alt="" />
          <div className="mini-preview-wrap">
            {images &&
              images.map((img, index) => (
                <img
                  key={index}
                  onClick={() => switchPreviewTo(img.url)}
                  className="mini-preview"
                  src={img.url}
                  alt=""
                />
              ))}
          </div>
        </div>
      </div>
    );
  else return "";
};
