import React, { useEffect, useState } from "react";

import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { createPaymentIntent } from "../../js/services/paymentService";

import "../../css/cardForm.css";

export const CreditCardForm = ({ id, onSubmit }) => {
  const [message, setMessage] = useState(null);
  const [loadingAnimationToggle, setLoadingAnimationToggle] = useState(false);
  const stripeElements = useElements();
  const stripe = useStripe();
  const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
      base: {
        iconColor: "#c4f0ff",
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#0ff",
        },
      },
      invalid: {
        iconColor: "#ffc7ee",
        color: "#ffc7ee",
      },
    },
  };

  const loadingAnimation = () => {
    if (!loadingAnimationToggle) return null;
    return <div className="loadingAnimation"></div>;
  };

  //handle form submit
  const handlePaymentItentCreation = async (event) => {
    setLoadingAnimationToggle(true);
    //preventt from default form submiting
    event.preventDefault();
    //get card element
    const cardElement = stripeElements.getElement(CardElement);

    //if stripe instance and stripe elements are not null
    if (!stripe || !stripeElements) {
      setLoadingAnimationToggle(false);
      return;
    }
    console.log("Creating payment Intent ...");

    //create payment intent and get clientSecret from our backend point
    const { clientSecret } = await createPaymentIntent();

    if (!clientSecret) {
      console.log("Payment Intent creation failed !");
      setMessage("Payment Intent creation failed !");
      setLoadingAnimationToggle(false);
      return;
    }
    console.log("Payment Intent created !");

    //confirm payment
    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (!paymentIntent || error) {
      console.log(error);
      setMessage(error.message);
      setLoadingAnimationToggle(false);
      return;
    }
    setMessage(`${paymentIntent.status}`);
    console.log(paymentIntent);
    setLoadingAnimationToggle(false);
    if (paymentIntent.status === "succeeded") onSubmit(paymentIntent);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2em",
      }}
    >
      {loadingAnimation()}
      <div className="error">{message}</div>
      <div className="CardField">
        <CardElement options={CARD_OPTIONS} />
      </div>
      <FormCardSubmitButton onClick={handlePaymentItentCreation}>
        Confirm purchase
      </FormCardSubmitButton>
    </div>
  );
};

const FormCardSubmitButton = ({ id = "submit-button", children, onClick }) => {
  return (
    <button className="orange-button" type="submit" onClick={onClick}>
      {children}
    </button>
  );
};
