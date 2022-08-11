import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

function Payment(props) {
  const { stripePromise } = props;
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("/create-payment-intent", {
      method: "POST",
      body: JSON.stringify({}),
    })
      .then((res) => res.json())
      .then(({ clientSecret }) => setClientSecret(clientSecret));
  }, []);

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
