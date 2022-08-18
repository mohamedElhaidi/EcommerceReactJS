import { useRef, useState } from "react";
import { HorizontalSliderStyled } from "./horizontalSliderStyled";
import LoadingIcon from "../loadingIcon";
const HorizontalSliderContainer = ({ color, title, children, style }) => {
  const hozSliderRef = useRef(null);
  const slide = (side) => {
    const scrollBy = hozSliderRef.current.getClientRects()[0].width;
    hozSliderRef.current.scroll({
      top: 0,
      left: hozSliderRef.current.scrollLeft + scrollBy * side,
      behavior: "smooth",
    });
  };

  return (
    <HorizontalSliderStyled
      color={color}
      className="horizontal-slider rounded-small under-shadow"
    >
      <h2>{title ? title : "**undefined**"}</h2>
      {!children.length ? (
        <LoadingIcon color={color} />
      ) : (
        <div ref={hozSliderRef} className="items">
          {children}
        </div>
      )}
      <button onClick={() => slide(-1)} className="arrow left-arrow"></button>
      <button onClick={() => slide(1)} className="arrow right-arrow"></button>
    </HorizontalSliderStyled>
  );
};

export default HorizontalSliderContainer;
