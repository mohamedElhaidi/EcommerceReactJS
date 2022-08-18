import React, { Children, Fragment, useEffect, useState } from "react";
import { UseStore } from "../../../js/services/context/storeContext.js";
import { ButtonOrangeBg } from "../../components/buttons";
import TagComponent from "../../components/tagComponent";
import {
  Form,
  FormCheckboxInput,
  FormEmailInput,
  FormTextInput,
  FormSubmitButton,
  FormPasswordInput,
  FormRadioboxInput,
} from "../../components/form";

import "../../../css/pages/profilePage.css";
import { WithUser } from "./widthUser.jsx";
import { getOrders } from "../../../js/services/userService.js";

const ProfilePage = () => {
  const { user } = UseStore();

  const [orders, setOrders] = useState([]);

  const handleFormSubmit = (event, inputs) => {
    event.preventDefault();
    console.log(inputs);
  };

  const onError = (errors) => {
    console.log(errors);
  };

  // title
  useEffect(() => {
    document.title = `Profile - BestShop.com`;
  }, [user]);

  useEffect(async () => {
    if (user) {
      setOrders(await getOrders());
    }
  }, [user]);

  if (!user) return null;

  return (
    <Fragment>
      {/* <AccountCard /> */}
      <Tabs>
        <TabBoard title="Account">
          <div style={{ maxWidth: "300px", margin: "0 auto" }}>
            <Form onSubmit={handleFormSubmit} onError={onError}>
              <FormTextInput
                id="fm_login"
                text="First name"
                initialValue={user.name}
              />
              <FormEmailInput
                id="email_login"
                text="email"
                initialValue={user.email}
              />
              <FormPasswordInput id="password_login" text="password" />
              {/* <FormCheckboxInput id="check_login" text="remember this" /> */}
              <FormSubmitButton id="submit-button">Apply</FormSubmitButton>
            </Form>
          </div>
        </TabBoard>

        {/* {
        "order": {
            "id": 9,
            "user_id": 21,
            "address": "asdasdasdasd",
            "phone": "0682856553",
            "first_name": "hae",
            "second_name": "asdasd",
            "zip_code": null,
            "country": null,
            "updated_at": "2022-05-09T19:32:58.000000Z",
            "created_at": "2022-05-09T19:32:58.000000Z",
            "status": "pending"
        },
        "products": [
            {
                "id": 398,
                "sub_cat_id": 1,
                "title": "Gigabyte H310M S2H - CARTE MÈRE MICRO ATX SOCKET 1151 INTEL H310 EXPRESS - 2X DDR4",
                "price": 1090,
                "discount": 11
            },
           
        ]
    }, */}
        <TabBoard title="Orders">
          {orders.map(({ order }) => (
            <OrderCard
              id={order.id}
              status={order.status}
              date={order.created_at}
            />
          ))}
        </TabBoard>
      </Tabs>
    </Fragment>
  );
};

const OrderCard = ({ id = 0, status = "NOT SET", date = "00-0-2022" }) => {
  return (
    <div className="orderCard">
      <div className="id">#{id}</div>
      <div className="stats">{status}</div>
      <div className="date">{date}</div>
    </div>
  );
};

const TabBrowserItem = ({ id, onClick, currentActive, children }) => {
  return (
    <li
      className="TabBrowserItem"
      style={{ backgroundColor: currentActive === id ? "orange" : "#F9CD95" }}
      onClick={() => onClick(id)}
    >
      {children}
    </li>
  );
};

const TabBoard = ({ id, children, currentActive, title }) => {
  if (currentActive === id)
    return (
      <div id={"board" + id} className="board">
        <h1>{title}</h1>
        {children}
      </div>
    );
  else return "";
};

const Tabs = ({ children }) => {
  const [currentActive, setcurrentActive] = useState(0);
  const [childs, setChilds] = useState([]);

  return (
    <div className="tabs">
      <ul className="tabs-browser">
        {children &&
          children.map((ch, key) => (
            <TabBrowserItem
              id={key}
              key={key}
              currentActive={currentActive}
              onClick={setcurrentActive}
            >
              {ch.props.title}
            </TabBrowserItem>
          ))}
      </ul>
      <div className="boards">
        {children &&
          children.map((ch, key) =>
            React.cloneElement(ch, { currentActive, key, id: key })
          )}
      </div>
    </div>
  );
};

const AccountCard = () => {
  const { user } = UseStore();
  return (
    <div className="account-card under-shadow rounded-small">
      <div className="pfp-wrap">
        <img src="" alt="" />
        <div className="edit">
          <span>edit</span>
        </div>
      </div>
      <div className="account-info">
        <TagComponent backgroundColor="orange" color="white" text={user.name} />
        <div className="email">{user.email}</div>
        <div className="number">+0 123 456 78</div>
      </div>
    </div>
  );
};

export default WithUser(ProfilePage);
