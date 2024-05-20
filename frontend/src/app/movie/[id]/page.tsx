import SelectMovie from "@/app/ui/select-movie";
import React, { Suspense } from "react";
import { Stepper } from "@/components/SelectedMovie/stepper";
import { fetchSelectMovie } from "@/api/get/select-movie-data";
import { SelectTheatre } from "@/components/SelectedMovie/select-theatre";
import ShowSelectMovie from "@/components/SelectedMovie/show-select-movie";
import { SkeletonSelectMovie } from "@/app/ui/Loading/skeleton-selected-movie";
import DatePagination from "@/components/SelectedMovie/date-pagination";
import { ShowTheatreSelected } from "@/components/SelectedMovie/show-theatre-selected";
import moment from "moment";
import { fetchTheatre } from "@/api/get/theatre-data";
import { fetchSeat } from "@/api/get/seat-data";
import clsx from "clsx";

const Movie = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    date?: string;
    theatre?: string;
  };
}) => {
  const id = params.id;
  const theatre = searchParams?.theatre;
  const date = searchParams?.date
    ? searchParams.date
    : moment(new Date()).format("YYYY-MM-DD");
  const fetchMovieData = await fetchSelectMovie(id);
  const fetchTheatreData = await fetchTheatre(id, date);
  const fetchSeatData = await fetchSeat(theatre);
  return (
    <main>
      <Suspense fallback={<SkeletonSelectMovie />}>
        <SelectMovie />
        <ShowSelectMovie fetchMovie={fetchMovieData} />
      </Suspense>
      <div className="flex flex-col items-center w-full mt-10 sticky top-[100px]">
        <Stepper selectMovie={id} selectTheatre={theatre} />
      </div>
      <div
        className={clsx("my-[4%]", {
          hidden: fetchSeatData.length > 0,
        })}
      >
        <div className="mt-10 w-full h-[120px] bg-gradient-to-r from-secondary via-quaternary to-secondary px-[12%]">
          <DatePagination id={id} />
        </div>
        <div className="px-[12%] my-[4%]">
          <SelectTheatre fetchData={fetchTheatreData} />
        </div>
      </div>
      <div
        className={clsx("px-[10%] max-h-[600px]", {
          hidden: fetchSeatData.length === 0,
        })}
      >
        <ShowTheatreSelected
          fetchSeat={fetchSeatData}
          fetchMovie={fetchMovieData}
        />
      </div>
    </main>
  );
};

export default Movie;
