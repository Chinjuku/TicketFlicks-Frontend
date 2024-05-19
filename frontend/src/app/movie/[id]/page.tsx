import SelectMovie from "@/app/ui/select-movie";
import React, { Suspense, useEffect, useState } from "react";
import { Stepper } from "@/components/SelectedMovie/stepper";
import { fetchSelectMovie } from "@/api/get/select-movie-data";
import { SelectTheatre } from "@/components/SelectedMovie/select-theatre";
import ShowSelectMovie from '@/components/SelectedMovie/show-select-movie';
import { SkeletonSelectMovie } from "@/app/ui/Loading/skeleton-selected-movie";

const Movie = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const fetchMovie = await fetchSelectMovie(id)
  return (
    <main>
      <SelectMovie />
        <Suspense fallback={<SkeletonSelectMovie />}>
            <ShowSelectMovie fetchMovie={fetchMovie} />
        </Suspense>
      <div className="flex flex-col items-center w-full mt-10">
        <Stepper selectMovie={fetchMovie?.id} />
      </div>
       <SelectTheatre id={id} />
    </main>
  );
};

export default Movie;
