"use client";
import { Button } from "@nextui-org/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import axios from "axios";
import React, { useContext, useEffect, useState, FormEvent } from "react";
import { SeatPriceTypes } from "@/types/seat";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PaymentForm(props: {
  selectSeat: SeatPriceTypes | undefined | null,
  clientSecret: string,
  clientId: string | null
}) {
  const router = useRouter();
  const { selectSeat, clientSecret, clientId } = props;
  const stripe = useStripe();
  const elements = useElements();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !clientSecret) return;

    try {
      const response = await axios.post("/payment/api/confirm_payment", {
        paymentIntentId: clientId,
      });

      if (response.data.status === "succeeded") {
        const savePayment = {
          amount: selectSeat?.allprice,
          payment_id: response.data.id,
          ticket_seats : selectSeat?.seats
        }
        await axios.post("", response.data.id)
        window.location.href = `/payment/result?payment_intent=${response.data.id}`;
      } else {
        console.error("Payment not successful:", response.data);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };
  const handleCancel = async () => {
    const res = await axios.post('/payment/api/cancel_payment', {
      clientSecret: clientId
    })
    if(res.data.result === "success") {
      router.back()
    }
  }

  return (
    <div className="flex p-[80px] gap-4">
      <div className="w-1/2 flex flex-col p-[3%] gap-5">
        <Link
          href="/movie"
          className="flex gap-3 items-center font-bold mb-5 hover:translate-x-[-13px] transition-all "
        >
          <ArrowLeftIcon className="w-7 h-7" />
          <p className="text-[18px]">Back</p>
        </Link>
        <div className="flex gap-3 text-[27px] font-bold">
          <h1>Seat Selected : </h1>
          <p>
            {selectSeat?.seats.map((seat, index) => (
              <>
                {seat.seat_num}{" "}
                {selectSeat.seats.length - 1 === index ||
                selectSeat.seats.length === 1
                  ? ""
                  : ","}
              </>
            ))}
          </p>
        </div>
        <p className="text-[27px] font-bold">THB {selectSeat?.allprice}</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-1/2 px-[8%] h-[450px] flex flex-col justify-center gap-8"
      >
        <h1 className="text-[30px] text-center font-bold">
          You can pay with Credit Card or PromptPay
        </h1>
        <PaymentElement />
        <div className="w-full flex gap-5 flex-wrap flex-auto">
          <Button onClick={handleCancel} type="button">
            Cancel
          </Button>
          <Button
            className="btn bg-purple-400 hover:bg-purple-600"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay!
          </Button>
        </div>
      </form>
    </div>
  );
}
