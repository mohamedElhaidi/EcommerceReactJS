import React, { Component, Fragment } from "react";
import img1 from "../../res/img/banners/1.png";
import img2 from "../../res/img/banners/2.png";
import img3 from "../../res/img/banners/3.png";
import "../../css/global.css";
import "../../css/mixins.css";
import "../../css/cardsSwiper/cardsSwiperV3.css";
import CardSwiper from "../../js/cardSwiperV3";

export default class CardsSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seemlessLoop: true, // needs implemntation
      loopable: props.loopable || true,
      index: props.index || 0,
      loopInterval: props.loopInterval || 2500,
      cardWidth: "400",
      cardHeight: "150",
      cardUnit: "px",
      strechCardWidthToEnd: true, // if u want the card width to be 100%
      swipMargin: props.swipMargin || 10,
    };
  }
  componentDidMount() {
    new CardSwiper("cards-swiper", this.state);
  }
  render() {
    return (
      <div id="cards-swiper" className="cards-swiper">
        <div className="overlay"></div>
        <div className="cards">
          <div className="track" dir="ltr">
            <SliderCard href={"https://stackoverflow.com/"}>
              <img src={img1} />
            </SliderCard>
            <SliderCard href={"https://stackoverflow.com/"}>
              <img src={img2} />
            </SliderCard>
            <SliderCard href={"https://stackoverflow.com/"}>
              <img src={img3} />
            </SliderCard>
          </div>
        </div>
        <div className="dots"></div>
        <div className="arrows">
          <div className="arrow arrow-right">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-arrow-left"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
              />
            </svg>
          </div>
          <div className="arrow arrow-left">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="bi bi-arrow-right"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
              />
            </svg>
          </div>
        </div>
      </div>
    );
  }
}

const SliderCard = ({ href, children }) => {
  return (
    <div data-index=" 0" className="card" tabIndex="-1">
      <a href={href} tabIndex="-1">
        {children}
      </a>
    </div>
  );
};
