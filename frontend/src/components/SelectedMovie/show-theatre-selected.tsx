"use client";
import { SeatTypes } from "@/types/seat";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { PiArmchairFill } from "react-icons/pi";
import { SelectSeat } from "@/components/SelectedMovie/select-seat";
import { MovieTypes } from "@/types/movie";

const rows = ["A", "B", "C", "D", "E"];
const seatsPerRow = 11;

export const ShowTheatreSelected = (props: {
  fetchSeat: SeatTypes[];
  fetchMovie: MovieTypes | null;
}) => {
  const { fetchSeat, fetchMovie } = props;
  const seatRef = useRef<HTMLDivElement>(null);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedSeats = localStorage.getItem("seats");
      if (savedSeats) {
        setSelectedSeats(JSON.parse(savedSeats));
      }
    }
  }, []);

  useEffect(() => {
    if (seatRef.current && fetchSeat.length > 0) {
      seatRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [fetchSeat]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("seats", JSON.stringify(selectedSeats));
    }
  }, [selectedSeats]);

  const handleSelectSeat = (seat_num: string) => {
    setSelectedSeats((prevSeats) => {
      if (prevSeats.includes(seat_num)) {
        return prevSeats.filter((seat) => seat !== seat_num);
      } else {
        return [...prevSeats, seat_num];
      }
    });
  };

  const theatre = fetchSeat[0].theatre.theatre_num;

  return (
    <div ref={seatRef} className="w-full h-full flex my-[4%] gap-10">
      <div className="w-3/4">
        <h1 className="text-center text-[30px] font-bold my-3">
          Theatre {theatre}
        </h1>
        <div className="bg-quaternary h-[50px] my-4 flex justify-center items-center text-2xl font-bold">
          <p>SCREEN</p>
        </div>
        <div className="grid grid-cols-12">
          {fetchSeat.map((seat, index) => {
            const rowNumber = Math.floor(index / seatsPerRow);
            const isRowStart = index % seatsPerRow === 0;
            const isSelected = selectedSeats.includes(seat.seat_num);

            return (
              <React.Fragment key={index}>
                {isRowStart && (
                  <div className="col-span-1 flex items-center justify-center w-5/5">
                    <p className="font-bold text-[18px]">{rows[rowNumber]}</p>
                  </div>
                )}
                <button
                  onClick={() => handleSelectSeat(seat.seat_num)}
                  className="col-span-1 w-full py-3 flex items-center justify-center"
                >
                  <PiArmchairFill
                    className={clsx("w-8 h-8", {
                      "fill-quaternary": seat.type === "normal" && !isSelected,
                      "fill-secondary": seat.type === "vip" && !isSelected,
                      "fill-green-500": isSelected,
                    })}
                  />
                </button>
              </React.Fragment>
            );
          })}
          {[...Array(12)].map((_, index) => {
            if (index === 0) return <div key={index}></div>;
            return (
              <p
                key={index}
                className="col-span-1 w-full py-3 flex items-center justify-center mt-3 text-[18px]"
              >
                {index}
              </p>
            );
          })}
        </div>
      </div>
      <SelectSeat fetchSeat={fetchSeat} fetchMovie={fetchMovie} selectedSeats={selectedSeats} />
    </div>
  );
};

