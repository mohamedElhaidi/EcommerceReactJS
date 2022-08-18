import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// Pages
import NavBar from "./jsx/sections/navBar";
import { ProductPage } from "./jsx/pages/product/productPage";
import HomePage from "./jsx/pages/home/home";
import SearchPage from "./jsx/pages/search/searchPage";
import { CategoryPage } from "./jsx/pages/category/categoryPage";
import Footer from "./jsx/sections/footer";
import { SubCategoryPage } from "./jsx/pages/category/subCategoriesPage";
import LoginRegisterPage from "./jsx/pages/user/auth/loginRegisterPage";
import ProfilePage from "./jsx/pages/user/profilePage";
import CartPage from "./jsx/pages/user/cartPage";
import TestCponent from "./test";
// End pages

import StoreContext, {
  UpdateStore,
  UseStore,
} from "./js/services/context/storeContext";

// Services
import { getUser } from "./js/services/authService";
import { getCart } from "./js/services/cartService";
import { getFavoritProducts } from "./js/services/userService";
import { getPublicKey } from "./js/services/paymentService";
import { FavoritesPage } from "./jsx/pages/user/favoritesPage";
// end Services

const UpdateUser = () => {
  const [componentDidMount, setComponentDidMount] = useState(false);
  const updateStore = UpdateStore();
  const store = UseStore();

  useEffect(async () => {
    if (!componentDidMount) {
      setComponentDidMount(true);
      const user = await getUser();
      updateStore({ ...store, user });
      const cart = user ? await getCart() : [];
      const { favorites } = user ? await getFavoritProducts() : [];
      updateStore({ ...store, user, cart, favorites });
    }
  });

  return null;
};

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route path="test" element={<TestCponent />} />
          <Route path="product">
            <Route path=":id" element={<ProductPage />} />
          </Route>
          <Route path="category">
            <Route path=":cat" element={<CategoryPage />} />
            <Route path=":cat/:subCat" element={<SubCategoryPage />} />
          </Route>
          <Route path="Search">
            <Route path=":query" element={<SearchPage />} />
            {/* redirect to home page */}
          </Route>
          <Route path="user">
            <Route path="login" element={<LoginRegisterPage />} />
            <Route path="cart" element={<CartPage />} />
            {/* <Route path="checkout" element={<CheckoutComponent />} /> */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            {/* redirect to login if user is not auuth */}
          </Route>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <StoreContext>
      <UpdateUser />
      <NavBar />
      <main>
        <AppRoutes />
      </main>
      <Footer />
    </StoreContext>
  </React.StrictMode>,
  document.getElementById("root")
);
