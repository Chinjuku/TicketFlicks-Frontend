import { Button } from "@nextui-org/button";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { MovieTypes } from "@/types/movie";
import { SeatTypes } from "@/types/seat";

export const SelectSeat = (props: {
  fetchSeat: SeatTypes[];
  fetchMovie: MovieTypes | null;
  selectedSeats: string[];
}) => {
  const { fetchMovie, fetchSeat, selectedSeats } = props;
  const theatre = fetchSeat[0].theatre;
  const theatre_num = theatre.theatre_num;
  const show_date = moment(theatre.show_time).format("DD MMMM YYYY");
  const show_time = moment(theatre.show_time).format("HH:mm");

  return (
    <div className="w-1/4 h-[440px] my-[2%] bg-primary1 p-7 border border-white flex flex-col justify-between">
      <h1 className="text-[20px] font-extrabold text-center">
        {fetchMovie?.movie_name}
      </h1>
      <div className="h-1/4 flex flex-col gap-[6px]">
        <p>Theatre {theatre_num}</p>
        <p>{show_date}</p>
        <p>{show_time}</p>
      </div>
      <div className="h-3/5 bg-black flex items-center flex-col justify-center gap-3">
        <h3>Selected Seat</h3>
        <p>
          {selectedSeats?.map((seat, index) => (
            <>
              {selectedSeats.length === 0 ? (
                <React.Fragment key={index}>
                    -
                </React.Fragment>
              ) : (
                <React.Fragment key={index}>
                  {seat}
                  {index !== selectedSeats.length - 1 ? ", " : ""}
                </React.Fragment>
              )}
            </>
          ))}
        </p>
        <h3>Price</h3>
        <p>0 THB</p>
        <Button>Continue</Button>
      </div>
    </div>
  );
};
