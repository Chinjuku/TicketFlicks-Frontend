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
import { savePayment } from "@/api/post/create-payment";
import { setIdleSeat } from "@/api/update/update-seat";
import Loading from "@/app/ui/Loading/loading-overlay";

export default function PaymentForm(props: {
  selectSeat: SeatPriceTypes | undefined | null,
  clientSecret: string,
  clientId: string | null
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false)
  const { selectSeat, clientSecret, clientId } = props;
  const stripe = useStripe();
  const elements = useElements();
  const seats = selectSeat?.seats.map((s) => s.id)
  const handleSubmit = async (e: FormEvent) => {
    setLoading(true)
    e.preventDefault();
    if (!stripe || !elements || !clientSecret) return;
    try {
      const response = await axios.post("/payment/api/confirm_payment", {
        paymentIntentId: clientId,
      });
      if (response.data.status === "succeeded") {
        const paymentData = {
          amounts : response.data.amount / 100,
          payment_id : response.data.id,
          ticket_seats : seats,
          client_secret : response.data.client_secret,
          payment_method : response.data.payment_method
        }
        await savePayment(paymentData)
        await setIdleSeat(seats)
        setLoading(false)
        window.location.href = `/payment/result?payment_intent=${response.data.id}`;
      } else {
        console.error("Payment not successful:", response.data);
      }
    } catch (error) {
      console.error("Error confirming payment:", error);
    }
  };
  const handleCancel = async () => {
    setLoading(true);
    const res = await axios.post('/payment/api/cancel_payment', {
      clientSecret: clientId
    })
    if(res.data.result === "success") {
      setLoading(false)
      router.back()
    }
  }
  if (loading) return <Loading />

  return (
    <div className="flex p-[80px] phone:p-[30px] gap-4 flex-wrap phone:gap-12 phone:px-12 desktop:h-[83vh]">
      <div className="grow w-[48%] phone:w-1/2 flex flex-col p-[2.8%] gap-5 phone:gap-3">
        <Link
          href="/movie"
          className="flex gap-3 items-center font-bold mb-5 hover:translate-x-[-13px] transition-all "
        >
          <ArrowLeftIcon className="w-7 h-7 desktop:w-12 desktop:h-12" />
          <p className="text-[18px] desktop:text-[30px]">Back</p>
        </Link>
        <div className="flex flex-col gap-3 desktop:gap-6 desktop:mt-3">
        <div className="flex grow gap-3 desktop:text-[38px] text-[28px] phone:text-[22px] tablet:text-[26px] font-bold">
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
        <p className="text-[27px] grow desktop:text-[36px] phone:text-[22px] phone:h-full tablet:text-[24px] font-bold">THB {selectSeat?.allprice}</p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="grow w-[48%] phone:w-1/2 laptop:px-[5%] desktop:px-[8%] flex flex-col justify-center gap-8 h-full"
      >
        <h1 className="text-[30px] desktop:text-[38px] phone:text-[24px] text-center font-bold tablet:text-[27px]">
          Pay with Credit Card or PromptPay
        </h1>
        <PaymentElement />
        <div className="w-full flex gap-5 flex-wrap justify-center">
          <Button onClick={handleCancel} type="button" className="grow w-[47%]">
            Cancel
          </Button>
          <Button
            className="btn bg-purple-400 hover:bg-purple-600 grow w-[47%]"
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
