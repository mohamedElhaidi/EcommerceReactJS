import React, { useState, useContext } from "react";

export const StoreContext = React.createContext({});
const UpadeStoreContext = React.createContext(() => {});

export function UseStore() {
  const store = useContext(StoreContext);
  return store;
}
export function UpdateStore() {
  const fn = useContext(UpadeStoreContext);
  return fn;
}
const Store = ({ children }) => {
  const [store, setStore] = useState({});
  const setStoreMiddlewire = (data) => {
    console.log(data);
    setStore(data);
  };
  return (
    <StoreContext.Provider value={store}>
      <UpadeStoreContext.Provider value={setStoreMiddlewire}>
        {children}
      </UpadeStoreContext.Provider>
    </StoreContext.Provider>
  );
};

export default Store;
