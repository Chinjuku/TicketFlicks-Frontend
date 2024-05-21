import { seatContext } from "@/utils/seatContext";
import { PaymentElement, CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

export default function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");
  const { seat, price } = useContext(seatContext)
    useEffect(() => {
      console.log(seat)
      console.log(price)
  }, [seat, price])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const cardElement = elements?.getElement("card");
    
    try {
      if (!stripe || !cardElement) return;
      const { data } = await axios.post("/payment/api", {
        data: { amount: 89 },
      });
      const clientSecret = data;
      setClientSecret(data.secret);
      await stripe?.confirmCardPayment(clientSecret, {
        payment_method: { card: cardElement },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <button
        className="btn bg-purple-400 hover:bg-purple-600"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      {/* <p className="text-red-500">{error}</p>
      {transactionId && (
        <p className="text-green-600">Your transaction id: {transactionId}</p>
      )} */}
    </form>
  );
}

// CheckoutForm.tsx
// import React from 'react';
// import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

// const CheckoutForm: React.FC = () => {
//   const stripe = useStripe();
//   const elements = useElements();

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const result = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         // Return URL where the customer will be redirected after payment
//         return_url: 'https://your-website.com/checkout-complete',
//       },
//     });

//     if (result.error) {
//       console.error('Payment failed:');
//     } else {
//       console.log('Payment succeeded:');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <PaymentElement />
//       <button type="submit" disabled={!stripe}>Pay</button>
//     </form>
//   );
// };

// export default CheckoutForm;


