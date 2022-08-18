import CardsSlider from "../../components/cardsSlider.jsx";
import ProductItemCard, {
  ProductItemCardBestDeal,
} from "../../components/productItem/productItemCard.jsx";
import FeaturesSection from "./featuresSection.jsx";

import React, { useEffect, useState } from "react";
import HorizontalSliderContainer from "../../components/horizontalSlider/horizontalSliderContainer.jsx";

import * as http from "../../../js/services/http/httpService";
import DoubleSections from "./doubleSections.jsx";
import { getHotDealsProdcts } from "../../../js/services/productService.js";
import ProductsContainer from "../../components/productContainer.jsx";

import imagePNG from "../../../res/img/products/water/fullscale.png";
import presentPNG from "../../../res/img/present2.png";

const HomePage = (props) => {
  const [hotDealsProdcts, setHotDealsProdcts] = useState([]);
  useEffect(async () => {
    setHotDealsProdcts(await getHotDealsProdcts());
  }, []);

  // title
  useEffect(() => {
    document.title = "Home page - BestShop.com";
  }, []);
  return (
    <React.Fragment>
      <CardsSlider />

      {/* <FeaturesSection /> */}

      <HorizontalSliderContainer title="HOT DEALS &#128293;" color="orange">
        {hotDealsProdcts.map((prod, key) => (
          <ProductItemCard key={key} product={prod} bestDealDisabled={true} />
        ))}
      </HorizontalSliderContainer>

      <DoubleSections
        leftItem={{
          primaryText: "free water",
          secondaryText: "0$",
          imageUrl: imagePNG,
        }}
        rightItem={{
          primaryText: "Gifts",
          secondaryText: "Every day!",
          imageUrl: presentPNG,
        }}
      />

      <ProductsContainer title="Computer Monitors">
        {hotDealsProdcts.map((prod, key) => (
          <ProductItemCard key={key} product={prod} bestDealDisabled={true} />
        ))}
      </ProductsContainer>

      <DoubleSections
        leftItem={{
          primaryText: "free water",
          secondaryText: "0$",
          imageUrl: imagePNG,
        }}
        rightItem={{
          primaryText: "Gifts",
          secondaryText: "Every day!",
          imageUrl: presentPNG,
        }}
      />
      <HorizontalSliderContainer title="Your favorites" color="#e83e3e">
        {hotDealsProdcts.map((prod, key) => (
          <ProductItemCard key={key} product={prod} bestDealDisabled={true} />
        ))}
      </HorizontalSliderContainer>

      <DoubleSections
        leftItem={{
          primaryText: "free water",
          secondaryText: "0$",
          imageUrl: imagePNG,
        }}
        rightItem={{
          primaryText: "Gifts",
          secondaryText: "Every day!",
          imageUrl: presentPNG,
        }}
      />

      <ProductsContainer title="Wifi">
        {hotDealsProdcts.map((prod, key) => (
          <ProductItemCard key={key} product={prod} bestDealDisabled={true} />
        ))}
      </ProductsContainer>
    </React.Fragment>
  );
};

export default HomePage;
