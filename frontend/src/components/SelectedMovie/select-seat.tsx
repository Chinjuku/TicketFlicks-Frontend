import { Button } from "@nextui-org/button";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MovieTypes } from "@/types/movie";
import { SeatPriceTypes, SeatTypes } from "@/types/seat";
import clsx from "clsx";
import Link from "next/link";

export const SelectSeat = (props: {
  fetchSeat: SeatTypes[];
  fetchMovie: MovieTypes | null;
  selectedSeats: SeatPriceTypes | null | undefined;
}) => {
  const { fetchMovie, fetchSeat, selectedSeats } = props;
  const theatre = fetchSeat[0]?.theatre ? fetchSeat[0].theatre : null
  const theatre_num = theatre?.theatre_num;
  const show_date = moment(theatre?.show_time).format("DD MMMM YYYY");
  const show_time = moment(theatre?.show_time).format("HH:mm")

    function handleClick(allprice: number | undefined, seats : SeatTypes[] | undefined): void {
        if (!allprice || !seats) return;
        // console.log(allprice, seats)
    }

  return (
    <div className="w-full tablet:w-1/2 h-[440px] my-[2%] bg-primary1 p-6 border border-white flex flex-col justify-between">
      <h1 className="text-[20px] font-extrabold text-center">
        {fetchMovie?.movie_name}
      </h1>
      <div className="h-1/4 flex flex-col gap-[6px]">
        <p>Theatre {theatre_num}</p>
        <p>{show_date}</p>
        <p>{show_time}</p>
      </div>
      <div className="h-[63%] bg-black flex items-center flex-col justify-center gap-3 px-4">
        <h3>Selected Seat</h3>
        <p>
          {selectedSeats?.seats.map((seat, index) => (
            <>
                <React.Fragment key={seat.id}>
                  {seat.seat_num}
                  {index !== selectedSeats?.seats.length - 1 ? ", " : ""}
                </React.Fragment>
            </>
          ))}
        </p>
        <h3>Price</h3>
        <p>{selectedSeats?.allprice ? selectedSeats?.allprice : 0} THB</p>
        <Link href="/payment">
          <Button onClick={() => handleClick(selectedSeats?.allprice, selectedSeats?.seats)} className={clsx({
              "opacity-50 cursor-not-allowed": !selectedSeats?.allprice
          })}>Continue</Button>
        </Link>
      </div>
    </div>
  );
};
