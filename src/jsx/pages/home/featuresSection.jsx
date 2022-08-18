import "../../../css/pages/home.css";
import "../../../css/mixins.css";
import fastdeliveryIMG from "../../../res/img/icons/fast-delivery.png";
import cheapIMG from "../../../res/img/icons/discount.png";

import { useState } from "react";

const FeaturesSection = () => {
  const [features, setFeatures] = useState([
    {
      title: "Fast Delivery",
      url: "#Fast-Delivery",
      img: fastdeliveryIMG,
      color: "",
    },
    {
      title: "Best quality",
      url: "#Best-quality",
      img: cheapIMG,
    },
    {
      title: "under 10$",
      url: "#pizza",
      img: cheapIMG,
    },
    {
      title: "Food",
      url: "#tacos",
      img: cheapIMG,
    },
  ]);
  return (
    <div className="feature-cards ">
      {features.map((feat, index) => (
        <a
          key={index}
          href={feat.url}
          className="feature-card hiddenLink"
          // style={{ backgroundImage: `url(${feat.img})` }}
        >
          <h1>{feat.title}</h1>
          <img src={feat.img} alt="" />
        </a>
      ))}
    </div>
  );
};

export default FeaturesSection;
