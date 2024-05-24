"use client";
import { fetchPayment } from "@/api/get/payment/payment-data";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";
import { PaymentTypes } from "@/types/payment";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import moment from "moment";
import { HiOutlineDownload } from "react-icons/hi";
import { HiMiniHome } from "react-icons/hi2";
import downloadjs from "downloadjs";
import html2canvas from "html2canvas";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from "next/link";

const Page = () => {
  const searchParams = useSearchParams();
  const payment_id = searchParams.get("payment_intent")
    ? searchParams.get("payment_intent")
    : "";
  const [payment, setPayment] = useState<PaymentTypes>();
  const ticketRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSaveTickets = async () => {
    const promises = ticketRefs.current.map(async (ref, index) => {
      if (ref) {
        const canvas = await html2canvas(ref);
        const dataURL = canvas.toDataURL("image/png");
        downloadjs(dataURL, `ticket-${index + 1}.png`, "image/png");
      }
    });

    await Promise.all(promises);
    toast(":) Download pictures successful!");
  };
  useMemo(() => {
    const fetchPaymentData = async () => {
      if (!payment_id) return <div>Load</div>;
      const res = await fetchPayment(payment_id);
      setPayment(res);
    };
    fetchPaymentData();
  }, [payment_id]);
  return (
    <div className="p-20 h-[81.2vh] flex items-center justify-center">
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />
      <div className="w-4/5 h-3/4 bg-primary rounded-lg flex">
        <div className="w-1/2 flex flex-col items-center justify-center gap-5">
          <IoMdCheckmarkCircleOutline className="text-white h-28 w-28" />
          <p className="text-4xl font-extrabold w-4/5 text-center">
            Your Payment is successful!
          </p>
        </div>
        <div className="m-6 w-1/2 flex flex-col flex-wrap">
          <div
            className="h-3/4 p-5 bg-black block overflow-y-scroll"
          >
            {payment?.seats.map((s, index) => (
              <div
                ref={(el) => {
                    if (el) {
                    ticketRefs.current[index] = el;
                    }
                }}
                key={index}
                className="p-4 bg-secondary flex flex-col gap-2 h-full w-full mb-3 border-2 border-white relative"
              >
                <div className="flex justify-between">
                  <h3 className="text-[24px] font-bold">TicketFlicks</h3>
                  <h4 className="text-[24px] font-bold">
                    Theatre {s.theatre.theatre_num}
                  </h4>
                </div>
                <div className="flex justify-between">
                  <p>Date : {moment(s.theatre.show_time).format("DD MMMM")}</p>
                  <p>Time : {moment(s.theatre.show_time).format("HH:mm")}</p>
                </div>
                <p className="absolute bottom-2 right-2">
                  {payment?.payment_id}
                </p>
                <p>Seat : {s.seat_num}</p>
              </div>
            ))}
          </div>
          <div className="h-1/4 flex justify-between items-center px-5">
            <p className="text-xl font-bold">Total : {payment?.amounts} THB</p>
            <div className="flex gap-5">
              <button onClick={handleSaveTickets} className="bg-transparent w-10">
                <HiOutlineDownload className="w-8 h-8" />
              </button>
              <Link href="/" as="/" className="bg-transparent w-10">
                <HiMiniHome className="w-8 h-8" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
