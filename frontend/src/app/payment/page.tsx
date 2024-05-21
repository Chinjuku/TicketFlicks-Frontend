"use client";
import { useContext } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/SelectedMovie/payments";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
import { seatContext } from "@/utils/seatContext";
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {
  
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

// PaymentPage.tsx
// import React, { useState, useEffect } from 'react';
// import { Elements } from '@stripe/react-stripe-js';
// import { loadStripe, Stripe } from '@stripe/stripe-js';
// import CheckoutForm from '@/components/SelectedMovie/payments'; // ตรวจสอบให้แน่ใจว่าได้สร้างและนำเข้า CheckoutForm
// import axios from 'axios';

// const stripePromise: Promise<Stripe | null> = loadStripe('pk_test_51PIsCQ2LBrdE2noaYvCIJIpStYVVKcofVcHG9P0wYeQvKqWGmztx2jpUL6aOxPnaXhcTS1qH6eG7KL130M125sV000RZbGCPf0');

// const PaymentPage: React.FC = () => {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     const postStripe = async () => {
//       // http://localhost:8000/api/create-payment-intent/
//       const response = await axios.post('/payment/api', { amount: 10 });
//       setClientSecret(response.data.clientSecret);
//     }
//     postStripe()
//   }, []);

//   const options = {
//     clientSecret: clientSecret || '',
//   };

//   return (
//     clientSecret ? (
//       <Elements stripe={stripePromise} options={options}>
//         <CheckoutForm />
//       </Elements>
//     ) : (
//       <div>Loading...</div>
//     )
//   );
// };

// export default PaymentPage;
