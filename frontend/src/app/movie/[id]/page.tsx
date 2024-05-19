import SelectMovie from "@/app/ui/select-movie";
import React, { Suspense } from "react";
import { Stepper } from "@/components/SelectedMovie/stepper";
import { fetchSelectMovie } from "@/api/get/select-movie-data";
import { SelectTheatre } from "@/components/SelectedMovie/select-theatre";
import ShowSelectMovie from "@/components/SelectedMovie/show-select-movie";
import { SkeletonSelectMovie } from "@/app/ui/Loading/skeleton-selected-movie";
import DatePagination from "@/components/SelectedMovie/date-pagination";
import moment from "moment";

const Movie = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams?: {
    date?: string;
  };
}) => {
  const id = params.id;
  const date = searchParams?.date ? searchParams.date : moment(new Date()).format('YYYY-MM-DD');
  const fetchMovie = await fetchSelectMovie(id);
  return (
    <main>
      <Suspense fallback={<SkeletonSelectMovie />}>
        <SelectMovie />
        <ShowSelectMovie fetchMovie={fetchMovie} />
      </Suspense>
      <div className="flex flex-col items-center w-full mt-10">
        <Stepper selectMovie={fetchMovie?.id} />
      </div>
      <div className="mt-10 w-full h-[120px] bg-gradient-to-r from-secondary via-quaternary to-secondary px-[12%]">
        <DatePagination id={id} />
      </div>
      <SelectTheatre id={id} date={date} />
    </main>
  );
};

export default Movie;
