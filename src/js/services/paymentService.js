import * as HTTP from "./http/httpService";

export async function getPublicKey() {
  return HTTP.get("/api/get-public-key")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
export async function createPaymentIntent() {
  return HTTP.post("/api/create-payment-intent", {
    payementMethodType: "card",
    currency: "usd",
  })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}

export async function placeOrderInBackend(data) {
  return HTTP.post("/api/place-order", { ...data })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      //visual error
      throw error;
    });
}
