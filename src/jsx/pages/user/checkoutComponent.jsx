import React, { useEffect, useState } from "react";
import WithStripe from "./withStripe";
import { WithUser } from "./widthUser";
import { UseStore } from "../../../js/services/context/storeContext";
import { CreditCardForm } from "../../components/creditCardForm";
import { checkoutDeliveryFormSchema } from "./schemas";
import { placeOrderInBackend } from "../../../js/services/paymentService";

import { LinkButtonOrangeBg } from "../../components/buttons";
import StepProgress from "../../components/stepProgress";
import { Form, FormSubmitButton, FormTextInput } from "../../components/form";

import "../../../css/checkoutComponent/popUpPages.css";

const CheckoutComponent = ({ setVisibility }) => {
  const { user } = UseStore();
  const [currentPage, setCurrentPage] = useState(0);
  const [limitSteps, setLimitSteps] = useState(0);
  const [disabledPagination, setDisabledPagination] = useState(false);
  const [userData, setUserData] = useState({});

  const onDeliveryInfoSubmit = (userData) => {
    setUserData(userData);
    setCurrentPage(1);
    setLimitSteps(1);
  };

  const onPaymentInfoSubmit = async (paymentIntent) => {
    // place the  order in backend
    const orderToBePlaced = { ...userData, paymentIntent };
    const { order } = await placeOrderInBackend(orderToBePlaced);
    setCurrentPage(2);
    setDisabledPagination(true);
  };
  if (!user) return null;
  return (
    <div className="CheckoutComponent-wrap">
      <div className="bg"></div>
      <div className="close-button" onClick={() => setVisibility(0)}></div>
      <Pages
        {...{ currentPage, setCurrentPage, disabledPagination, limitSteps }}
      >
        <Page title={"Delivery"} submitText="Next">
          <Form
            onSubmit={onDeliveryInfoSubmit}
            schema={checkoutDeliveryFormSchema}
            onError={null}
          >
            <FormTextInput
              id="first_name"
              text="first name"
              initialValue={""}
            />
            <FormTextInput
              id="second_name"
              text="second name"
              initialValue={""}
            />
            <FormTextInput
              id="phone"
              text="Phone number"
              initialValue={user.phone}
            />
            <FormTextInput
              id="address"
              text="Address"
              initialValue={user.address}
            />
            <FormSubmitButton id="submit">Next</FormSubmitButton>
          </Form>
        </Page>
        <Page title={"Payement"} submitText="Next" onSubmit={null}>
          <p
            style={{
              margin: " 0 auto",
              textAlign: "center",
              padding: "1em",
              fontSize: "1.4em",
              fontWeight: "300",
            }}
          >
            Please use the fake credit card information to continue the order.
            Card number: 4242 4242 4242 4242.
          </p>
          <div className="" style={{ width: "100%" }}>
            <CreditCardForm onSubmit={onPaymentInfoSubmit} />
          </div>
        </Page>
        <Page title={"Finish"}>
          <p
            style={{
              margin: " 0 auto",
              textAlign: "center",
              padding: "1em",
              fontSize: "1.4em",
              fontWeight: "300",
            }}
          >
            Your order has been placed. Thank you for choosing Us :)
          </p>
          <LinkButtonOrangeBg href="/">Go to Homepage</LinkButtonOrangeBg>
        </Page>
      </Pages>
    </div>
  );
};
const Pages = ({
  currentPage,
  setCurrentPage,
  disabledPagination,
  limitSteps,
  children,
}) => {
  const childrenCount = React.Children.count(children);
  console.log(childrenCount);
  const childrenTitles = [];
  React.Children.forEach(children, (child) =>
    childrenTitles.push(child.props.title)
  );

  // const [currentPage, setCurrentPage] = useState(0);
  const CurrentPageHandle = (val) => {
    console.log(currentPage, limitSteps);
    if (val > limitSteps) return;
    if (disabledPagination) return;
    if (val < 0) setCurrentPage(0);
    else if (val >= childrenCount) setCurrentPage(childrenCount - 1);
    else setCurrentPage(val);
  };

  return (
    <div className="pages">
      <h1>Checkout</h1>
      <StepProgress
        current={currentPage}
        values={childrenTitles}
        setCurrentHandler={CurrentPageHandle}
      />
      {/* <h1 className="page-header">{pageTitle}</h1> */}
      <div className="content">
        <div
          className="track"
          style={{ transform: `translateX( calc( 100% *  ${-currentPage}))` }}
        >
          {React.Children.map(children, (child) => {
            return (
              <div
                className="page-wrap"
                style={{
                  width: "200px",
                }}
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>

      {!disabledPagination && currentPage > 0 ? (
        <div
          className="arrow left"
          onClick={() => CurrentPageHandle(currentPage - 1)}
        ></div>
      ) : null}
      {!disabledPagination && currentPage !== childrenCount - 1 ? (
        <div
          className="arrow right"
          onClick={() => CurrentPageHandle(currentPage + 1)}
        ></div>
      ) : null}
    </div>
  );
};

const Page = ({ title, children }) => {
  return <div className="page">{children}</div>;
};

export default WithUser(WithStripe(CheckoutComponent));
