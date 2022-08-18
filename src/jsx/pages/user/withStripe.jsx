//Payment (Stripe)
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { getPublicKey } from "../../../js/services/paymentService";
// end Stripe

const WithStripe = (Component) => {
  // initialize Stripe Instance with public key from backEnd

  return (props) => <ElementsWrapper Component={Component} props={props} />;
};

const ElementsWrapper = ({ Component, props }) => {
  const [publicKey, setPublicKey] = useState("");
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(async () => {
    if (!publicKey) {
      setPublicKey(await getPublicKey());
    }
    if (publicKey && !stripePromise) {
      console.log("Public key", publicKey);
      setStripePromise(loadStripe(publicKey));
    }
  }, [publicKey]);

  return (
    <Elements stripe={stripePromise}>
      <Component {...props} />
    </Elements>
  );
};

export default WithStripe;
