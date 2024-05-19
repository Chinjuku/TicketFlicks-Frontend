import { fetchTheatre } from "@/api/get/theatre-data";
import { Theatre } from "@/types/theatre";
import { Button } from "@nextui-org/button";
import moment from "moment";
import React from "react";

export const SelectTheatre = async (props: { id: string }) => {
  const { id } = props;
  const fetchData = await fetchTheatre(id);
  return (
    <div className="mx-[12%] my-[4%] flex-col flex gap-3">
      {Object.keys(fetchData).map((theatreNum: any) => (
        <div key={theatreNum} className="">
          <h1 className="text-3xl font-extrabold">Theatre {theatreNum}</h1>
          <div className="flex gap-3">
            {fetchData[theatreNum].map((data: Theatre) => (
              <div key={data.id}>
                {data.is_show && (
                  <Button>
                    Show Time: {moment(data.show_time).format("HH:mm")}
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
