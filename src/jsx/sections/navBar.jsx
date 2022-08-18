import React, { Fragment, useEffect, useState } from "react";

import NavBarSearchInput from "./navBar/searchBar";
import NavCartDropDown from "./navBar/navCartDropDown";
import CategoryMenu from "./navBar/categoryMenu";
import UserMenu from "./navBar/userMenu";

import "../../css/global.css";
import "../../css/mixins.css";

import "../../css/buttons.css";
import "../../css/navBar/navBar.css";
import NotificationDropDown from "./navBar/notificationDropDown";

const NavBar = (props) => {
  const [rendered, setRendered] = useState(0);

  useEffect(() => {
    if (rendered) {
      setRendered(1);
    }
  });
  return (
    <React.Fragment>
      <header>
        <div className="navBar">
          <div className="navBar-wrap">
            <NavBarGroup className="menuLogo-group">
              <CategoryMenu />
              <Logo />
            </NavBarGroup>
            <NavBarGroup id="navSearch" className="search-group searchBar">
              <NavBarSearchInput />
            </NavBarGroup>
            <NavBarGroup className="user-group">
              <NavCartDropDown />
              {/* <NotificationDropDown /> */}
              <UserMenu />
            </NavBarGroup>
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};
const NavBarGroup = ({ children, className, id }) => {
  return (
    <div id={id} className={"navBar-group " + className}>
      {children}
    </div>
  );
};

const Logo = () => {
  return (
    <a href="/" className="navItem logo hiddenLink">
      BestShop
    </a>
  );
};

export default NavBar;
