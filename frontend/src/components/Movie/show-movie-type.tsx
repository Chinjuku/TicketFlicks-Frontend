"use client";
import { fetchMovieData } from "@/utils/fetch-movie-data";
import { MovieTypes } from "@/types/movie";
import MovieCard from "@/app/ui/movie-card";
import React, { forwardRef } from "react";

const ShowMovieType = forwardRef<HTMLDivElement, { type: string }>((props, ref) => {
  const { type } = props;
  const filter_movie = fetchMovieData(type).read();

  return (
    <>
      {filter_movie?.length === 0 ? (
        <div ref={ref} className="flex justify-center w-[45%]">
          <p className="text-center mt-5 text-[36px] font-extrabold">NO {type} MOVIES</p>
        </div>
      ) : (
        <div ref={ref} className="grid grid-cols-3 phone:grid-cols-2 grid-flow-row auto-rows-max gap-10 tablet:gap-5 phone:gap-5">
          {filter_movie &&
            filter_movie.map((movie: MovieTypes) => (
              <MovieCard key={movie.id} data={movie} />
            ))}
        </div>
      )}
    </>
  );
});

ShowMovieType.displayName = "ShowMovieType";

export default ShowMovieType;
