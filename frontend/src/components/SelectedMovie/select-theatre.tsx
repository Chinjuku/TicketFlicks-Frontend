"use client"
import { Theatre, TheatreTypes } from "@/types/theatre";
import { Button } from "@nextui-org/button";
import moment from "moment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

export const SelectTheatre = (props: { fetchData : TheatreTypes[] }) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const { fetchData } = props;
  const selectShowTime = (id: string) => {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    params.set("theatre", id);
    replace(`${pathname}?${params.toString()}`)
  };
  return (
    <div className="flex-col flex gap-3">
      {Object.keys(fetchData).length === 0 ? (
        <div className="text-center font-extrabold text-[36px]">
          There are no Movie show in this day.!
        </div>
      ) : (
        Object.keys(fetchData).map((theatreNum: any, index) => (
          <div key={theatreNum} className="w-full flex flex-col gap-3 my-2">
            <h1 className="text-3xl font-extrabold">Theatre {theatreNum}</h1>
            <span className="w-full h-1 bg-white my-3"></span>
            <div className="flex gap-3">
              {fetchData[theatreNum].map((data: Theatre) => (
                <div key={data.id}>
                  {data.is_show && (
                    <div className="gap-2 flex flex-col">
                      <Button onClick={() => selectShowTime(data.id)} className="bg-quaternary text-[24px] py-7 px-10 font-bold">
                        {moment(data.show_time).format("HH:mm")}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};
