import * as http from "./http/httpService";

export const authenticatUser = async (data) => {
  return http
    .post("/api/login", data)
    .then((res) => {
      //sccess
      if (res.status === 200) {
        setUserToken(res.data.token);
        console.info("logging was successuful!");
        return res.data;
      }
      //unauthorized
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.warn("Either email or password not correct!");
        throw "Either email or password not correct!";
      }
      throw "something went wrong during logging";
    });
};

export const registerUser = async (data) => {
  return http
    .post("/api/register", data)
    .then((res) => {
      if (res.data && res.data.email) {
        authenticatUser({ email: data.email, password: data.password }).then(
          () => window.location.replace("/")
        );
        return;
      }
      throw res.data.message || "something gone while performing registration";
    })
    .catch((error) => {
      //visual error
      throw error;
    });
};

export const logoutUser = (data) => {
  clearUserToken();
  window.location.replace("/");
};

//to check if User is logged in
export const isAuthenticated = () => {
  return getUserToken() && true;
};

export const getUser = async () => {
  let user = getUserLocaly();
  if (!user && getUserToken())
    user = await http
      .get("/api/user")
      .then((res) => {
        //sccess
        if (res.status === 200) {
          storeUserLocaly(res.data.user);
          return res.data.user;
        }
      })
      .catch((code) => {
        if (code === 401) {
          clearUserLocaly();
          clearUserToken();
          throw new Error("bad token");
        }
        throw new Error("Sonthing went wrong !");
      });

  return user;
};
export const storeUserLocaly = (User) => {
  return localStorage.setItem("user", JSON.stringify(User));
};
export const getUserLocaly = () => {
  return JSON.parse(localStorage.getItem("user"));
};
export const clearUserLocaly = () => {
  localStorage.clear("user");
};
export const getUserToken = () => {
  return localStorage.getItem("jwt");
};

export const setUserToken = (token) => {
  return localStorage.setItem("jwt", token);
};

export const clearUserToken = (token) => {
  localStorage.clear("jwt");
};
