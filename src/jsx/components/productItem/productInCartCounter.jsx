import { Fragment } from "react";
import {
  addToCart,
  decreaseProductInCart,
  increaseProductInCart,
} from "../../../js/services/cartService";
import {
  UpdateStore,
  UseStore,
} from "../../../js/services/context/storeContext";
import { ButtonOrangeBg } from "../buttons";
import ItemCounter from "../itemCounter";

export const ProductInCartCounter = ({
  style = { width: "100%" },
  prod_id,
  hideWhenZero = true,
}) => {
  const store = UseStore();
  const updateStore = UpdateStore();

  const addToCartHandle = async () => {
    const { cart: newCart, message } = await addToCart(prod_id);

    updateStore({ ...store, cart: newCart });
  };

  const increaseToCartHandle = async () => {
    const { cart: newCart, message } = await increaseProductInCart(prod_id);

    updateStore({ ...store, cart: newCart });
  };

  const decreaseToCartHandle = async () => {
    const { cart: newCart, message } = await decreaseProductInCart(prod_id);

    updateStore({ ...store, cart: newCart });
  };

  const prodInCart = store.cart
    ? store.cart.find((p) => {
        return p.product_id === prod_id;
      })
    : null;
  const itemCount = prodInCart ? prodInCart.count : 0;

  const content = () => {
    if (hideWhenZero) {
      return itemCount ? (
        <ItemCounter
          style={style}
          cartCount={itemCount}
          onPlus={() => increaseToCartHandle(prod_id)}
          onMinus={() => decreaseToCartHandle(prod_id)}
        />
      ) : (
        <ButtonOrangeBg
          className="add-cart-btton"
          style={style}
          onClick={addToCartHandle}
        >
          Add to cart
        </ButtonOrangeBg>
      );
    } else {
      return (
        <Fragment>
          <ItemCounter
            style={style}
            cartCount={itemCount}
            onPlus={() => increaseToCartHandle(prod_id)}
            onMinus={() => decreaseToCartHandle(prod_id)}
          />

          <ButtonOrangeBg
            className="add-cart-btton"
            style={style}
            onClick={addToCartHandle}
          >
            Add to cart
          </ButtonOrangeBg>
        </Fragment>
      );
    }
  };

  return content();
};
export default ProductInCartCounter;
