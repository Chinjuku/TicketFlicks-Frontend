import { fetchTheatre } from "@/api/get/theatre-data";
import { Theatre } from "@/types/theatre";
import { Button } from "@nextui-org/button";
import moment from "moment";
import React from "react";

export const SelectTheatre = async (props: { id: string; date: string }) => {
  const { id, date } = props;
  const fetchData = await fetchTheatre(id, date);
  return (
    <div className="mx-[12%] my-[4%] flex-col flex gap-3">
      {Object.keys(fetchData).length === 0 ? (
        <div className="text-center font-extrabold text-[36px]">
          There are no Movie show in this day.!
        </div>
      ) : (
        Object.keys(fetchData).map((theatreNum: any, index) => (
          <div key={theatreNum} className="w-full flex flex-col gap-3">
            <h1 className="text-3xl font-extrabold">Theatre {theatreNum}</h1>
            <span className="w-full h-1 bg-white my-5"></span>
            <div className="flex gap-3">
              {fetchData[theatreNum].map((data: Theatre) => (
                <div key={data.id}>
                  {data.is_show && (
                    <div className="gap-2 flex flex-col">
                      {/* <p className="text-center">
                        {moment(data.show_time).format("dddd (DD MMMM)")}
                      </p> */}
                      <Button>
                        Show Time: {moment(data.show_time).format("HH:mm")}
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
