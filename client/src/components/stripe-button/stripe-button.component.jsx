import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeCheckoutButton = ({ price }) => {
  // console.log('STRIPE KEY on dev env: ', process.env.REACT_APP_STRIPE_PUBLISH_KEY)
  const priceForStripe = price * 100; // Stripe require price in cents
  // const publishableKey = process.env.REACT_APP_STRIPE_PUBLISH_KEY;
  const publishableKey = 'pk_test_51HOVT8BETI3Lr3veD7H2phQJ7xObvi8XiLcztzgWP60uQveICvsUvttlCIj6MTUvcO5Npu8OGx1P84fGRJIeL4CV00gPdY0R6R'

  const onToken = (token) => {
    console.log(token); // token for making payment on stripe
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment successfull!");
      })
      .catch((error) => {
        console.log("Pyament error: ", JSON.parse(error));
        alert(
          "There was an issue with the payment. Please sure you use the test credit card"
        );
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken} // The token is the onSuccess when calling the submision for stripe
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
