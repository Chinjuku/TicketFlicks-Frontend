"use client";
import React, { useState, useEffect, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import PaymentForm from "@/components/Payment/payment-form";
import { SeatPriceTypes } from "@/types/seat";
import { fetchPriceSeat } from "@/api/get/theatre-seat/seat-data";
import { SkeletonPaymentPage } from "@/app/ui/Loading/skeletion-payment";
import { stripePromise, appearance } from "@/utils/stripe-secret";

const Page = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [selectSeat, setSelectSeat] = useState<SeatPriceTypes | null>();
  const [getSeats, setSeats] = useState<string[]>();
  const [clientId, setClientId] = useState<string | null>(null);

  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        const response = await axios.post("/payment/api/payment_intents", {
          amount: selectSeat?.allprice
        });
        setClientId(response.data.id)
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("Error creating PaymentIntent:", error);
      }
    };
    createPaymentIntent();
  }, [selectSeat?.allprice]);

  useEffect(() => {
    const getSeat = localStorage.getItem("seats");
    if (getSeat) {
      const parsedSeats = JSON.parse(getSeat);
      setSeats(parsedSeats);
    }
  }, []);

  useMemo(() => {
    const fetchSeats = async () => {
      if (!getSeats) return;
      const res = await fetchPriceSeat(getSeats);
      setSelectSeat(res);
    };
    fetchSeats();
  }, [getSeats]);

  return (
    <div>
      {!clientSecret ? (
        <>
          <SkeletonPaymentPage/>
        </>
      ) : (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <PaymentForm selectSeat={selectSeat} clientSecret={clientSecret} clientId={clientId} />
        </Elements>
      )}
    </div>
  );
};

export default Page;

//// Payment For Subscriptions ????
// import React from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import axios from 'axios';

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
// );
// export default function PreviewPage() {
//   React.useEffect(() => {
//     const query = new URLSearchParams(window.location.search);
//     if (query.get('success')) {
//       console.log('Order placed! You will receive an email confirmation.');
//     }

//     if (query.get('canceled')) {
//       console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
//     }
//   }, []);
//   const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const response = await axios.post("/api/subscriptions")
//     const session = response.data;
//     const stripe = await stripePromise;
//     await stripe?.redirectToCheckout({ sessionId: session.id });
//   }

//   return (
//     <form onSubmit={onSubmit} method="POST">
//       <section>
//         <button type="submit" role="link">
//           Checkout
//         </button>
//       </section>
//     </form>
//   );
// }
