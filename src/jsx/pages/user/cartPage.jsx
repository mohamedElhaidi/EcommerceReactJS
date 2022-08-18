import { useEffect, useState } from "react";

import {
  UpdateStore,
  UseStore,
} from "../../../js/services/context/storeContext";
import ProductInCartCounter from "../../components/productItem/productInCartCounter";
import {
  deleteProductInCart,
  getProductWithDescriptionInCart,
} from "../../../js/services/cartService";

import {
  ButtonNoBgOrangeText,
  ButtonOrangeBg,
  LinkButtonOrangeBg,
} from "../../components/buttons";
import { WithUser } from "./widthUser";
import CheckoutComponent from "./checkoutComponent";

import "../../../css/pages/cartPage.css";

const CartPage = () => {
  const [
    toggleCheckoutComponentVisibilty,
    setToggleCheckoutComponentVisibilty,
  ] = useState(0);
  const [prods, setProds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { cart } = UseStore();

  // title
  useEffect(() => {
    document.title = `Cart Page (${prods.length}) - BestShop.com`;
  }, [prods]);

  //populate cart list
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
                  ? current.price - (current.price * current.discount) / 100
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
    <div className="cart-page">
      {renderCheckoutComponent()}
      {/* render only when we have items in cart */}
      <CheckoutCartList prods={prods}>
        {prods &&
          prods.map((p, key) => <CheckoutListItem key={key} product={p} />)}
      </CheckoutCartList>

      <div className="cart-checkout">
        <h1 className="cart-checkout-head under-line cap">summery</h1>
        <div className="total-price-group">
          <div className="total-price">total price: {totalPrice}$</div>
        </div>

        <ButtonOrangeBg onClick={handleCheckoutToggle}>
          Check-out
        </ButtonOrangeBg>
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
    ? product.price - (product.price * product.discount) / 100
    : product.price;
  finalPrice = Number(finalPrice).toFixed(2);

  let score = (product.likes / (product.likes + product.dislikes)) * 100;
  score = score < 20 ? 20 : score;

  const deletionHandler = async () => {
    const newCart = (await deleteProductInCart(product.id)).cart;
    updateStore({ ...store, cart: newCart });
  };
  return (
    <article className="cart-list-item under-line">
      <a href={"../../product/" + product.title + "::" + product.id}>
        <img src={product.thumbnail} alt="" />
        <h2 className="title">{product.title}</h2>
        <div className="price">
          <h3 className="current-price">{finalPrice}$</h3>
          <span className="original-price">{product.price}$</span>
        </div>
      </a>
      <footer className="cart-list-item-footer">
        <ButtonNoBgOrangeText
          onClick={deletionHandler}
          style={{ width: "fit-content", padding: "0 2em" }}
        >
          Remove
        </ButtonNoBgOrangeText>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "200px",
            alignSelf: "center",
            justifySelf: "end",
          }}
        >
          <ProductInCartCounter prod_id={product.id} />
        </div>
      </footer>
    </article>
  );
};
export default WithUser(CartPage);
