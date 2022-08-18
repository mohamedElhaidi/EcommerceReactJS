import React, { Component, useEffect, useState } from "react";
import { useParams } from "react-router";

import "../../../css/pages/search/searchPage.css";
import "../../../css/menu/side-menu.css";
import "../../../css/menu/inputNumber.css";
import "../../../css/menu/doubleRangeInput.css";

import ProductItemCard from "../../components/productItem/productItemCard";
import { getSubCategoriesProductsByName } from "../../../js/services/productService";
import ProductsContainer from "../../components/productContainer";

export const CategoryPage = (props) => {
  const [subsCatAndProducts, setSubsCatAndProducts] = useState([]);
  let { cat: catName } = useParams();

  // title
  useEffect(() => {
    document.title = `${catName} - BestShop.com`;
  }, []);

  useEffect(async () => {
    if (!subsCatAndProducts.length)
      setSubsCatAndProducts(await getSubCategoriesProductsByName(catName));
  }, [subsCatAndProducts]);

  return (
    <div>
      {subsCatAndProducts.map((subCat, key) => (
        <ProductsContainer
          key={key}
          seeMoreURL={`/category/${catName}/${subCat.name}`}
          title={subCat.name}
        >
          {subCat.products.map((product, key) => (
            <ProductItemCard key={key} product={product} />
          ))}
        </ProductsContainer>
      ))}
    </div>
  );
};
