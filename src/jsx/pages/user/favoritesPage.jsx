import React, { Component, useEffect, useState } from "react";

import "../../../css/pages/search/searchPage.css";
import "../../../css/menu/side-menu.css";
import "../../../css/menu/inputNumber.css";
import "../../../css/menu/doubleRangeInput.css";

import ProductItemCard from "../../components/productItem/productItemCard";

import {
  getFavoriteProducts,
  getProductsByIdArray,
} from "../../../js/services/productService";
import ProductsContainer from "../../components/productContainer";
import { UseStore } from "../../../js/services/context/storeContext";

export const FavoritesPage = (props) => {
  const { favorites } = UseStore();
  const [FavoriteProducts, setFavoriteProducts] = useState([]);

  // title
  useEffect(() => {
    document.title = `Favorites (${FavoriteProducts.length}) - BestShop.com`;
  }, [FavoriteProducts]);

  useEffect(async () => {
    if (!favorites) return null;

    const favoriteProds = await getProductsByIdArray(
      await favorites.reduce((prev, FavItemId) => {
        return [...prev, FavItemId.id];
      }, [])
    );
    console.log(favoriteProds);
    setFavoriteProducts(favoriteProds);
  }, [favorites]);

  const generateFavoriteProductsElements = () => {
    if (!FavoriteProducts) return null;
    return FavoriteProducts.map((product, key) => (
      <ProductItemCard key={key} product={product} />
    ));
  };
  return (
    <div>
      <ProductsContainer title="Favorite Products">
        {generateFavoriteProductsElements()}
      </ProductsContainer>
    </div>
  );
};
