import { useState } from "react";
import { UseStore } from "../../../js/services/context/storeContext";

import cartSVG from "../../../res/svg/cart.svg";
import CartPopoutComponent from "../../pages/user/cartPopout";

const NavCartDropDown = () => {
  const { cart } = UseStore();
  const [CartPopoutVisibility, setCartPopoutVisibility] = useState(false);
  const cartItemsCount = cart ? cart.length : 0;
  const handleCartPopoutVisibility = (toggle) => {
    setCartPopoutVisibility(toggle);
  };

  const renderCartPopup = () => {
    return false ? <CartPopoutComponent /> : null;
  };
  return (
    <a
      href="/user/cart"
      className="navItem cart"
      onMouseEnter={() => handleCartPopoutVisibility(true)}
      onMouseLeave={() => handleCartPopoutVisibility(false)}
    >
      <img className="icon" src={cartSVG} alt="" />
      <span className="cartItemCount">
        {cartItemsCount <= 99 ? cartItemsCount : "+99"}
      </span>
      {renderCartPopup()}
    </a>
  );
};
export default NavCartDropDown;
