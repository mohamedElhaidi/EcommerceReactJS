import { getUser } from "./authService";
import { StoreContext, UseStore } from "./context/storeContext";
import * as http from "./http/httpService";
import { getProductsByIdArray } from "./productService";

export const getCart = async () => {
  let user = getUser();
  if (user)
    return await http
      .get("/api/getProductsInCart")
      .then((res) => {
        //sccess
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((code) => {
        if (code === 401) {
          throw new Error("bad token");
        }
      });
};
export const addToCart = async (prod_id) => {
  let user = getUser();
  let message = "";
  if (user) {
    message = await http
      .post("/api/createProductInCart", { product_id: prod_id })
      .then((res) => {
        //sccess
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((code) => {
        if (code === 401) {
          throw new Error("bad token");
        }
        throw new Error("Sonthing went wrong !");
      });
  }
  return message;
};
export const increaseProductInCart = async (prod_id) => {
  let user = getUser();
  let message = "";
  if (user) {
    message = await http
      .post("/api/increaseProductInCart", { product_id: prod_id })
      .then((res) => {
        //sccess
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((code) => {
        if (code === 401) {
          throw new Error("bad token");
        }
        throw new Error("Sonthing went wrong !");
      });
  }
  return message;
};
export const decreaseProductInCart = async (prod_id) => {
  let user = getUser();
  let message = "";
  if (user) {
    message = await http
      .post("/api/decreaseProductInCart", { product_id: prod_id })
      .then((res) => {
        //sccess
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((code) => {
        if (code === 401) {
          throw new Error("bad token");
        }
        throw new Error("Sonthing went wrong !");
      });
  }
  return message;
};
export const deleteProductInCart = async (prod_id) => {
  let user = getUser();
  let message = "";
  if (user) {
    message = await http
      .post("/api/deleteProductInCart", { product_id: prod_id })
      .then((res) => {
        //sccess
        if (res.status === 200) {
          return res.data;
        }
      })
      .catch((code) => {
        if (code === 401) {
          throw new Error("bad token");
        }
        throw new Error("Sonthing went wrong !");
      });
  }
  return message;
};

export const getProductWithDescriptionInCart = async (cart) => {
  return await getProductsByIdArray(cart.map((p) => p.product_id));
};
