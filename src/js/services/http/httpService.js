import axios from "axios";

// Add a request interceptor
// const requestInteceptor = axios.interceptors.request.use(
//   function (config) {
//     // Do something before request is sent
//     return config;
//   },
//   function (error) {
//     // Do something with request error
//     console.warn("error from Axios interceptor");
//     console.error(error);
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
const responseInteceptor = axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // server Problem
    if (error.response.status >= 500) {
      console.error("NETWORK_ERROR code:" + error.response.status);
    }
    console.error(error);
    return Promise.reject(error);
  }
);

axios.defaults.baseURL = "https://bestshop-ecom.herokuapp.com/";
axios.defaults.headers.common["Authorization"] =
  "Bearer " + localStorage.getItem("jwt");
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export async function get(url, data) {
  return axios.get(url, data);
}
export async function post(url, data) {
  return axios.post(url, data);
}
