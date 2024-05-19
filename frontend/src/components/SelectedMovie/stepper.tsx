"use client"
import React, { useEffect, useState } from "react";
import { Progress } from "@nextui-org/progress";
import { FaCheck } from "react-icons/fa";
import clsx from "clsx";

type StepperProps = {
    selectMovie: string | null | undefined
}

export const Stepper = (props : StepperProps) => {
  const [selectValue, setSelectValue] = useState<number>(0);
  const { selectMovie } = props

  useEffect(() => {
    if (typeof selectMovie ==='string') setSelectValue(0.5)
  }, [selectMovie])
  const stepData = [
    {
      title: "Select Movie",
      value: selectValue,
    },
    {
      title: "Choose Theatre",
      value: 0,
    },
    {
      title: "Choose Seat",
      value: 0,
    },
    {
      title: "Payment",
      value: 0,
    },
  ];
  return (
    <div className="flex w-full justify-center max-w-[1200px]">
      {stepData.map((item, index) =>
        index === stepData.length - 1 ? (
          <div key={index}>
            <div className="w-8 h-8 rounded-2xl bg-white"></div>
            <p className="mt-3 text-sm text-[#d9d9d9]">STEP {index+1}</p>
            <p>{item.title}</p>
          </div>
        ) : (
          <div key={index} className="w-1/4">
            <div className="flex items-center gap-4">
              <div className={clsx("w-8 h-8 rounded-[50%] flex items-center justify-center", {
                "bg-secondary": item.value !== 0,
                "border-spacing-2 border-separate border-2 border-quaternary bg-white": item.value === 0,
              })}>
                <FaCheck className={clsx("w-7 rounded-[50%]", {
                    "text-white": item.value !== 0,
                    "hidden": item.value === 0,
                })}/>
              </div>
                <Progress
                aria-label="Close"
                size="sm"
                value={item.value}
                maxValue={1}
                color="secondary"
                className="max-w-md w-4/5"
                />
            </div>
            <p className="mt-3 text-sm text-[#d9d9d9]">STEP {index+1}</p>
            <p>{item.title}</p>
            
          </div>
        )
      )}
      {/* <button onClick={() => setValue(100)}>100%</button>
      <button onClick={() => setValue(50)}>50%</button> */}
    </div>
  );
};
