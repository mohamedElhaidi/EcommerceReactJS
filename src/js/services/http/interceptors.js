// // Add a request interceptor
// export const requestInteceptor = axios.interceptors.request.use(
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

// // Add a response interceptor
// export const responseInteceptor = axios.interceptors.response.use(
//   function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
//   },
//   function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     console.warn("error from Axios interceptor");
//     console.error(error);
//     return Promise.reject(error);
//   }
// );
