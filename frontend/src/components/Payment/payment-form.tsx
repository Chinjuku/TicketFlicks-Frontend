"use client"
import { fetchPriceSeat } from "@/api/get/seat-data";
import { Button } from "@nextui-org/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState, useMemo, FormEvent } from "react";
import { SeatPriceTypes } from "@/types/seat";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function PaymentForm(props : {selectSeat: SeatPriceTypes | undefined | null}) {
  const { selectSeat } = props;
  const stripe = useStripe();
  const elements = useElements();
  const [clientSecret, setClientSecret] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!clientSecret) {
      console.error('Missing clientSecret');
      return;
    }

    const stripe = await stripePromise;
    const elements = useElements();
    if (!stripe || !elements) {
      console.error('Stripe or Elements not loaded');
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/result`,
      },
    });

    if (error) {
      console.warn(error.message);
    }
  };

  return (
    <div className="flex p-[80px]">
      <div className="w-1/2">
        {/* {
          selectSeat?.seats.map(() => {

          })
        } */}
      </div>
      <form onSubmit={handleSubmit} className="w-1/2 px-[5%]">
        <h1 className="text-[30px] text-center font-bold">Pay with credit card</h1>
        <PaymentElement />
        <Button
          className="btn bg-purple-400 hover:bg-purple-600"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay!
        </Button>
      </form>
    </div>
  );
}


