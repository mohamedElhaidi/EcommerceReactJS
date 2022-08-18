import * as HTTP from "./http/httpService";

export async function getProduct(prod_id) {
  return HTTP.get("/api/product/" + prod_id)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function getHotDealsProdcts() {
  return HTTP.get("/api/bestDeal")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}

export async function getSubCategoriesProductsByName(catName) {
  return HTTP.get(
    `/api/getSubCategoriesProductsByName?catName=${catName}&limit=15`
  )
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function getSubCategoriesProductsWithPagination({
  subCatName,
  count,
  currentPage,
  brands,
  priceMin,
  priceMax,
}) {
  return HTTP.get(`/api/products`, {
    params: {
      subCatName,
      count,
      currentPage,
      brands,
      priceMin,
      priceMax,
    },
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function getProductsByIdArray(prod_ids) {
  return HTTP.post("/api/getProductsByArrayList", prod_ids)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      console.warn("getProductsArray");
      console.error(error);
      return [];
    });
}

export async function searchForProducts(query) {
  return HTTP.get("/api/search?q=" + query)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      console.warn("searchForProducts");
      console.error(error);
      return [];
    });
}
