import SelectMovie from "@/app/ui/select-movie";
import React, { Suspense } from "react";
import { fetchSelectMovie } from "@/api/get/movie";
import { SelectTheatre } from "@/components/SelectedMovie/select-theatre";
import ShowSelectMovie from "@/components/SelectedMovie/show-select-movie";
import { SkeletonSelectMovie } from "@/app/ui/Loading/skeleton-selected-movie";
import DatePagination from "@/components/SelectedMovie/date-pagination";
import { ShowTheatreSelected } from "@/components/SelectedMovie/show-theatre-selected";
import moment from "moment";
import { fetchTheatre } from "@/api/get/theatre";
import { fetchSeat } from "@/api/get/seat";
import clsx from "clsx";

const Stepper = React.lazy(() =>import("@/components/SelectedMovie/stepper"))

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
  const fetchSeatData = theatre ? await fetchSeat(theatre) : [];

  return (
    <main className="relative">
      <Suspense fallback={<SkeletonSelectMovie />}>
        <SelectMovie />
        <ShowSelectMovie fetchMovie={fetchMovieData} />
      </Suspense>
      <Suspense fallback={<div>Loaddd</div>}>
        <div className="flex flex-col items-center w-full mt-10 phone:mt-0">
          <Stepper selectMovie={id} selectTheatre={theatre} />
        </div>
      </Suspense>
      <div
        className={clsx("my-[4%]", {
          hidden: fetchSeatData.length > 0,
        })}
      >
        <div className="mt-10 w-full h-[120px] phone:h-[98px] bg-gradient-to-r from-secondary via-quaternary to-secondary px-[12%] tablet:px-[6%]">
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
      <div className="phone:h-[200px]">

      </div>
    </main>
  );
};

export default Movie;
