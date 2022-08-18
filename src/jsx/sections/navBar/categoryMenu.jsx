import React, { Fragment, useEffect, useState } from "react";
import * as http from "../../../js/services/http/httpService";

import "../../../css/navBar/menu.css";
const CategoryMenu = (props) => {
  const [menuToggle, setMenuToggle] = useState(false);
  const [menuList, setMenuList] = useState([]);
  useEffect(() => {
    if (!menuList.length)
      http.get("/api/category").then((res) => {
        setMenuList([...res.data]);
      });
  });
  return (
    <Fragment>
      <button
        id="sideMenuTriggerer"
        className="navItem hamburgerMenuButton"
        onClick={() => setMenuToggle(!menuToggle)}
      >
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </button>
      <div id="sideMenu" className={`category-wrap  ${menuToggle && "toggle"}`}>
        <div
          className="background"
          onClick={() => setMenuToggle(!menuToggle)}
        ></div>
        <div className="category-menu">
          <div
            className="closeCategoryButton"
            onClick={() => setMenuToggle(!menuToggle)}
          >
            <div className="line"></div>
            <div className="line line2"></div>
          </div>
          <ul>
            {menuList.map((item) => (
              <MenuListItem
                key={item.id}
                url={`/category/${item.name}`}
                text={item.name}
              />
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
const MenuListItem = ({ url, text }) => {
  return (
    <li className="category-item">
      <a href={url} className="category-link hiddenLink">
        <span>{text}</span>
      </a>
    </li>
  );
};

export default CategoryMenu;
