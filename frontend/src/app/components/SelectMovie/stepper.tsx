import React, { useState } from "react";
import { Progress } from "@nextui-org/progress";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

export const Stepper = () => {
  const [value, setValue] = useState<number>(0);
  const stepData = [
    {
      title: "Select Movie",
      value: 0,
    },
    {
      title: "Choose Theatre",
      value: 0,
    },
    {
      title: "Choose Seat",
      value: 70,
    },
    {
      title: "Payment",
      value: 100,
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
              <div className={clsx("w-8 h-8 rounded-[50%]", {
                "bg-secondary": value === 100,
                "border-spacing-2 border-separate border-2 border-quaternary bg-white": value !== 100,
              })}>
                
              </div>
                <Progress
                size="sm"
                value={item.value}
                maxValue={100}
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
