import React, { useState } from "react";
import "../../css/dropdown.css";
import BorderBeautyWrap from "./borderBeautyWrap";

const DropDownMenu = ({
  text = "NO TEXT",
  buttonStyle = {},
  listStyle = {},
  icon,
  iconOnly = true,
  children = [],
  onItemListSelected = null,
}) => {
  const [toggle, setToggle] = useState(false);

  const handleSelection = (key) => {
    onItemListSelected(key);
    setToggle(false);
  };
  return (
    <div className="dropdown">
      <button onClick={() => setToggle(true)} style={buttonStyle}>
        <img className="icon" src={icon} alt="" />
        {iconOnly && <span>{text}</span>}
      </button>
      <DropdownMenuList
        children={children}
        style={listStyle}
        toggle={toggle}
        setToggle={setToggle}
        handleSelection={handleSelection}
      />
    </div>
  );
};

const DropdownMenuList = ({
  style,
  toggle,
  setToggle,
  children,
  handleSelection,
}) => {
  const childs = React.Children.map(children, (child, key) => (
    <li onClick={() => handleSelection(key)} key={key}>
      {child}
    </li>
  ));
  return (
    <div
      className={`list ${toggle && "toggle"}`}
      style={{ top: "100%", right: 0 }}
    >
      <div className="overlay" onClick={() => setToggle(false)}></div>
      <ul className="hover-effect under-shadow" style={style}>
        {childs}
      </ul>
    </div>
  );
};

export default DropDownMenu;
