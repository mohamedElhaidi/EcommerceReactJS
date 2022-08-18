import { useEffect, useState } from "react";

import ProductInCartCounter from "./productInCartCounter";
import RateStarsComponent from "./rateStarsComponent";

import {
  UpdateStore,
  UseStore,
} from "../../../js/services/context/storeContext";
import {
  addFavoriteProduct,
  deleteFavoriteProduct,
} from "../../../js/services/userService";
import ProductItemStyled from "./productItemStyled";

const ProductItemCard = ({ product, bestDealDisabled = false }) => {
  let finalPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  finalPrice = Number(finalPrice).toFixed(2);

  const totalVoters = product.likes + product.dislikes;

  const isBestDeal =
    !bestDealDisabled && product.discount !== 0 && product.discount >= 75
      ? "product-best"
      : "";
  console.log(isBestDeal);
  return (
    <ProductItemStyled>
      <a
        href={`/product/${product.title}::${product.id}`}
        className={`product hiddenLink ${isBestDeal}`}
      >
        <img className="thumbnail" src={product.thumbnail} alt="" />
        <div className="info">
          <div className="title">{product.title}</div>
          <div className="rating">
            <RateStarsComponent
              size={1}
              likes={product.likes}
              dislikes={product.dislikes}
            />
            <span className="stock">{`(${totalVoters})`}</span>
          </div>
          <div className="price">
            <span className="final-price">
              <span>{`$${finalPrice}`}</span>
              <span className="stock">{`(${product.numberInStock} left)`}</span>
            </span>
            {product.discount && (
              <div className="previous-price">{`$${product.price}`}</div>
            )}
          </div>
        </div>
      </a>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FavoriteButton prod_id={product.id} />
        <ProductInCartCounter prod_id={product.id} />
      </div>
    </ProductItemStyled>
  );
};

const FavoriteButton = ({ prod_id }) => {
  const [isInFavorite, setIsInFavorite] = useState(false);
  const store = UseStore();
  const { favorites } = UseStore();
  const updateStore = UpdateStore();

  useEffect(() => {
    if (favorites)
      setIsInFavorite(favorites.find((p) => p.id === prod_id) && true);
  }, [favorites]);
  const handleClick = async () => {
    if (favorites && favorites.length > 0) {
      let newFavorites = [];
      if (!isInFavorite) {
        newFavorites = await addFavoriteProduct(prod_id);
      } else {
        newFavorites = await deleteFavoriteProduct(prod_id);
      }
      updateStore({ ...store, favorites: newFavorites });
      return;
    }

    const newFavorites = await addFavoriteProduct(prod_id);
    updateStore({ ...store, favorites: newFavorites });
  };
  const Heart = () => {
    if (isInFavorite)
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="favoriteSVG"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
          />
        </svg>
      );
    else
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="favoriteSVG"
          viewBox="0 0 16 16"
        >
          <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      );
  };
  if (store.user)
    return (
      <button onClick={handleClick} className="favoriteButton">
        {Heart()}
      </button>
    );
  return "";
};

export default ProductItemCard;
