"use client";
// @ts-ignore
import React, { useEffect, useContext, useState } from "react";
import { Progress } from "@nextui-org/progress";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { seatContext } from "@/utils/seatContext";

type StepperProps = {
  selectMovie: string | null;
  selectTheatre: string | undefined;
};

const Stepper = (props: StepperProps) => {
  const [selectMovieValue, setSelectMovieValue] = useState<number>(0);
  const [selectTheatreValue, setSelectTheatreValue] = useState<number>(0);
  const [selectSeatValue, setSelectSeatValue] = useState<number>(0);
  const { selectMovie, selectTheatre } = props;
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const pathname = usePathname();
  const { seat, price } = useContext(seatContext)

  useEffect(() => {
    if (price === undefined) return;
    else if (price > 0) {
      setSelectTheatreValue(1);
      const timeoutId = setTimeout(() => {
        setSelectSeatValue(0.5);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [seat, price])

  useEffect(() => {
    if (selectMovie) {
      setSelectMovieValue(0.5);
    }
    if (selectTheatre && typeof selectTheatre === "string") {
      setSelectMovieValue(1);
      const timeoutId = setTimeout(() => {
        setSelectTheatreValue(0.5);
      }, 500);
      return () => clearTimeout(timeoutId);
    } else {
      setSelectTheatreValue(0);
    }
  }, [selectMovie, selectTheatre]);

  const stepData = [
    {
      title: "Select Movie",
      value: selectMovieValue,
    },
    {
      title: "Choose Theatre",
      value: selectTheatreValue,
    },
    {
      title: "Choose Seat",
      value: selectSeatValue,
    },
    {
      title: "Payment",
      value: 0,
    },
  ];

  const handleStep = (index: number) => {
    const params = new URLSearchParams(searchParams);
    if (index === 0) {
      params.delete("theatre");
      setSelectSeatValue(0);
      setSelectTheatreValue(0.5);
      replace(`${pathname}`);
    } else if (index === 1) {
      setSelectSeatValue(0);
      setSelectTheatreValue(0.5);
    }
  };

  return (
    <div className="flex w-full justify-center max-w-[1200px]">
      {stepData.map((item, index) =>
        index === stepData.length - 1 ? (
          <div key={index}>
            <div className="w-8 h-8 rounded-2xl bg-white"></div>
            <p className="mt-3 text-sm text-[#d9d9d9]">STEP {index + 1}</p>
            <p>{item.title}</p>
          </div>
        ) : (
          <div key={index} className="w-1/4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleStep(index)}
                className={clsx(
                  "w-8 h-8 rounded-[50%] flex items-center justify-center hover:bg-tertiary transition-background",
                  {
                    "bg-secondary": item.value !== 0,
                    "border-spacing-2 border-separate border-2 border-quaternary bg-white cursor-default":
                      item.value === 0,
                  }
                )}
              >
                <FaCheck
                  className={clsx("w-7 rounded-[50%]", {
                    "text-white": item.value !== 0,
                    hidden: item.value === 0,
                  })}
                />
              </button>
              <Progress
                aria-label="Close"
                size="sm"
                value={item.value}
                maxValue={1}
                color="secondary"
                className="max-w-md w-4/5"
              />
            </div>
            <p className="mt-3 text-sm text-[#d9d9d9]">STEP {index + 1}</p>
            <p>{item.title}</p>
          </div>
        )
      )}
    </div>
  );
};

export default Stepper;