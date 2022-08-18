import "../../css/menu/side-menu.css";
import "../../css/menu/inputNumber.css";
import "../../css/menu/doubleRangeInput.css";
import { ButtonNoBgOrangeText } from "./buttons";
import React, { useEffect, useState } from "react";
export const FilterMenu = (props) => {
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);

  return (
    <div className="side-menu-wrap">
      <ButtonNoBgOrangeText
        className="show-menu-button"
        onClick={() => setVisibleOnMobile(!visibleOnMobile)}
        style={{ width: "200px", margin: "0.5em" }}
      >
        {(!visibleOnMobile ? "Show" : "Hide") + " Filter"}
      </ButtonNoBgOrangeText>
      <div
        id="Filter1"
        className={(visibleOnMobile && "toggle") + " side-menu"}
      >
        {props.children}

        {/* apply and reset button */}
        <FilterMenuButtonsGroup>
          <ButtonNoBgOrangeText>Reset</ButtonNoBgOrangeText>
          <ButtonNoBgOrangeText onClick={() => props.onFilterAppliedHandle()}>
            Apply
          </ButtonNoBgOrangeText>
        </FilterMenuButtonsGroup>
      </div>
    </div>
  );
};

export const FilterMenuGroup = ({ title, children }) => {
  return (
    <article className="side-menu-group">
      <h2 className="title">{title}</h2>
      {children}
    </article>
  );
};
export const FilterMenuCheckBoxGroup = ({ title, children }) => {
  return (
    <article className="side-menu-group">
      <h2 className="title">{title}</h2>
      <div className="side-menu-list">{children}</div>
    </article>
  );
};
export const FilterMenuRadioBoxGroup = ({ title, children }) => {
  return (
    <article className="side-menu-group">
      <h2 className="title">{title}</h2>
      <form>{children}</form>
    </article>
  );
};
export const FilterMenuLinkItem = ({ url, label }) => {
  return (
    <a href={url} className="side-menu-item hoverable hiddenLink">
      {label}
    </a>
  );
};

export const FilterMenuInputItem = ({
  id,
  type,
  value,
  text,
  onChange,
  checked,
}) => {
  return (
    <div className="side-menu-item hoverable">
      <input
        type={type}
        name={text}
        id={type + id}
        value={text}
        checked={checked}
        onChange={() => onChange(id)}
      />
      <label htmlFor={type + id}>{text}</label>
    </div>
  );
};

export const DoubleRangeInput = ({
  minLimit,
  maxLimit,
  minValue,
  maxValue,
  gap,
  setMinHandle,
  setMaxHandle,
}) => {
  console.log(minLimit, maxLimit, minValue, maxValue, gap);
  //progressBar
  const [progressBarLeft, setProgressBarLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);
  const [set, setSet] = useState(0);

  const handleMin = (val) => {
    if (val <= Number(maxValue) - Number(gap)) setMinHandle(val);
  };
  const handleMax = (val) => {
    if (val >= Number(minValue) + Number(gap)) setMaxHandle(val);
  };
  //progress Line calc
  const drawProgress = () => {
    const progressStart = ((minValue - minLimit) / (maxLimit - minLimit)) * 100;
    const progressWidth = ((maxValue - minLimit) / (maxLimit - minLimit)) * 100;
    setProgressBarLeft(progressStart + "%");
    setProgressBarWidth(progressWidth - progressStart + "%");
  };
  const progressBarStyle = {
    width: progressBarWidth,
    left: progressBarLeft,
  };

  useEffect(() => {
    drawProgress();
    if (!setSet) {
      setMinHandle(minLimit);
      setMaxHandle(maxLimit);
      setSet(1);
    }
  });
  return (
    <div id="doubleRange1" className="double-range-input">
      <div className="range-silder">
        <div className="paint" style={progressBarStyle}></div>
        <input
          name="x"
          className="ps"
          type="range"
          value={minValue}
          max={maxLimit}
          min={minLimit}
          onInput={(event) => handleMin(event.target.value)}
        />
        <input
          name="y"
          className="ps"
          type="range"
          value={maxValue}
          max={maxLimit}
          min={minLimit}
          onInput={(event) => handleMax(event.target.value)}
        />
      </div>

      <div className="range-input">
        <input
          className="min-input"
          type="number"
          name=""
          id="n1"
          value={minValue}
          max={maxLimit}
          min={minLimit}
          onChange={(event) => handleMin(event.target.value)}
        />
        <span className="separator">-</span>
        <input
          className="max-input"
          type="number"
          name=""
          id="n2"
          value={maxValue}
          max={maxLimit}
          min={minLimit}
          onChange={(event) => handleMax(event.target.value)}
        />
      </div>
    </div>
  );
};

export const FilterMenuButtonsGroup = ({ children }) => {
  return <div className="side-menu-buttons-group">{children}</div>;
};
