import React, { Children, Fragment } from "react";

const BorderBeautyWrap = (Component) => {
  const style = {
    top: 0,
    left: 0,
    zIndex: 5,
    width: "100%",
    height: "100%",
    borderTop: "solid var(--borderColor) 5px",
    borderBottom: "solid var(--borderColor) 5px",
    borderLeft: "solid var(--borderColor) 1px",
    borderRight: "solid var(--borderColor) 1px",
  };
  const BorderBeautyWrapChild = (
    <div className="BorderBeautyWrap" style={style}></div>
  );

  return (props) => {
    return (
      <div className="BorderBeautyWrap" style={style}>
        <Component {...props}></Component>
      </div>
    );
  };
};

export default BorderBeautyWrap;
