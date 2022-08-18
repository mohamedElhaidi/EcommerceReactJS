import { useEffect, useState } from "react";
import {
  UpdateStore,
  UseStore,
} from "../../../js/services/context/storeContext";
import {
  deleteProductInCart,
  getProductWithDescriptionInCart,
} from "../../../js/services/cartService";

import {
  ButtonNoBgOrangeText,
  LinkButtonOrangeBg,
} from "../../components/buttons";
import CheckoutComponent from "./checkoutComponent";

import "../../../css/pages/cartPopout.css";

const CartPopoutComponent = () => {
  const [
    toggleCheckoutComponentVisibilty,
    setToggleCheckoutComponentVisibilty,
  ] = useState(0);
  const [prods, setProds] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = UseStore();

  useEffect(async () => {
    // checks cart is there
    if (cart) {
      // setCartChanged(true);
      // get prods from server side
      const ps = await getProductWithDescriptionInCart(cart);
      // set the prods
      setProds(ps);
      if (ps.length)
        setTotalPrice(
          ps
            .reduce((prev, current) => {
              const prodIncardLocal = cart.find(
                (p) => p.product_id === current.id
              );
              let finalPrice = 0;
              if (prodIncardLocal) {
                finalPrice = current.discount
                  ? current.price * (current.discount / 100)
                  : current.price;
                finalPrice *= prodIncardLocal.count;
              }
              return prev + finalPrice;
            }, 0)
            .toFixed(2)
        );
    }
  }, [cart]);

  const handleCheckoutToggle = (event) => {
    setToggleCheckoutComponentVisibilty(!toggleCheckoutComponentVisibilty);
  };

  const renderCheckoutComponent = () => {
    return toggleCheckoutComponentVisibilty ? (
      <CheckoutComponent setVisibility={setToggleCheckoutComponentVisibilty} />
    ) : (
      ""
    );
  };
  return (
    <div className="cart-popout">
      {renderCheckoutComponent()}
      {/* render only when we have items in cart */}
      <CheckoutCartList prods={prods}>
        {prods &&
          prods.map((p, key) => {
            if (key > 4) return;
            else return <CheckoutListItem key={key} product={p} />;
          })}
      </CheckoutCartList>

      <div className="show-more">
        <LinkButtonOrangeBg href="/user/cart" onClick={handleCheckoutToggle}>
          Show more
        </LinkButtonOrangeBg>
      </div>
    </div>
  );
};

// cart list item
const CheckoutCartList = ({ children, prods }) => {
  return (
    <div className="cart-list">
      <h1 className="cart-list-head under-line cap">
        cart ({prods ? prods.length : 0})
      </h1>
      {prods && prods.length === 0 ? <EmptyCartSadFace /> : children}
    </div>
  );
};
const EmptyCartSadFace = () => {
  return (
    <div className="cart-empty">
      <span>No item found :(</span>
    </div>
  );
};

const CheckoutListItem = ({ product, prodDeletionHandler }) => {
  const store = UseStore();
  const updateStore = UpdateStore();
  let finalPrice = product.discount
    ? product.price * (product.discount / 100)
    : product.price;
  finalPrice = Number(finalPrice).toFixed(2);

  let score = (product.likes / (product.likes + product.dislikes)) * 100;
  score = score < 20 ? 20 : score;

  const deletionHandler = async () => {
    const { cart } = await deleteProductInCart(product.id);
    updateStore({ ...store, cart });
  };
  return (
    <article className="cart-list-item under-line">
      <a href={"../../product/" + product.title + "::" + product.id}>
        <img src={product.thumbnail} alt="" />
        <h2 className="title">{product.title}</h2>
        <div className="price">
          <h4 className="current-price">{finalPrice}$</h4>
        </div>
      </a>
    </article>
  );
};
export default CartPopoutComponent;
