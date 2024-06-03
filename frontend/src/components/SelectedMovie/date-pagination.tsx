"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { format, addDays, subDays, parseISO } from "date-fns";
import { useRef, useEffect, useContext, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Button } from "@nextui-org/button";
import clsx from "clsx";

const DatePagination = (props: { id: string }) => {
  const { id } = props;
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const date = searchParams.get("date") ? searchParams.get("date") : null;
  const paginationRef = useRef<HTMLDivElement>(null);
  const currentDate = date ? parseISO(date) : new Date();

  const dateFormatter = (getDate: Date) => {
    return `?date=${format(getDate, "yyyy-MM-dd")}`;
  };
  const handlePrevDate = () => {
    const prevDate = subDays(currentDate, 1);
    replace(`${pathname}${dateFormatter(prevDate)}`);
  };

  const handleNextDate = () => {
    const nextDate = addDays(currentDate, 1);
    replace(`${pathname}${dateFormatter(nextDate)}`);
  };

  const handleToday = () => {
    const today = new Date();
    replace(`${pathname}${dateFormatter(today)}`);
  };
  useEffect(() => {
    if (paginationRef.current && date !== null) {
      paginationRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [date]);

  return (
    <div ref={paginationRef} className="flex gap-12 tablet:gap-6 phone:gap-4 h-full w-full items-center justify-center">
      <Button className="bg-transparent hover:scale-[1.3] transition-all" onClick={handlePrevDate}><IoIosArrowBack className="w-8 h-8" /></Button>
      <div className="flex gap-8 items-center mt-2 h-full tablet:gap-6">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex flex-col items-center relative w-1/4 phone:hidden tablet:hidden">
            {dateFormatter(addDays(currentDate, index)) ===
              dateFormatter(new Date()) && <p className="font-bold text-primary text-center absolute top-[-30px] text-[18px]">Today</p>}
            <p className={clsx("text-[18px] font-bold", {
                "underline phone:w-full" : index === 0
            })}>
              {format(addDays(currentDate, index), "dd / MMMM / yyyy")}
            </p>
          </div>
        ))}
        {[...Array(3)].map((_, index) => (
          <div key={index} className="tablet:flex flex-col items-center relative w-1/3 hidden">
            {dateFormatter(addDays(currentDate, index)) ===
              dateFormatter(new Date()) && <p className="font-bold text-primary text-center absolute top-[-30px] text-[18px]">Today</p>}
            <p className={clsx("text-[20px] font-bold w-full", {
                "underline phone:w-full" : index === 0
            })}>
              {format(addDays(currentDate, index), "dd / MMMM / yyyy")}
            </p>
          </div>
        ))}
      </div>
      <div className="w-full h-full justify-center items-center phone:flex hidden text-[24px]">
        <div className="w-[170px]">
          {
            dateFormatter(addDays(currentDate, 0)) === dateFormatter(new Date())
             && <p className="text-primary text-center text-[17px]">Today</p>
          }
          <p className="font-bold">{format(currentDate, "dd / MMMM / yyyy")}</p>
        </div>
      </div>
      <Button className="bg-transparent hover:scale-[1.3] transition-all" onClick={handleNextDate}><IoIosArrowForward className="w-8 h-8" /></Button>
      {/* <button onClick={handleToday}>Today</button> */}
    </div>
  );
};

export default DatePagination;
