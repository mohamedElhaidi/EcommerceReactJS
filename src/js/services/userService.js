import * as HTTP from "./http/httpService";

// Orders API
export async function getOrders() {
  return HTTP.get("/api/getOrders")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}

// Favorites products API
export async function getFavoritProducts() {
  return HTTP.get("/api/getFavoriteProducts")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function deleteFavoriteProduct(prod_id) {
  return HTTP.post("/api/deleteFavoriteProduct", { prod_id })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function addFavoriteProduct(prod_id) {
  return HTTP.post("/api/addFavoriteProduct", { prod_id })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
