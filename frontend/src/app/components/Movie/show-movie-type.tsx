"use client";
import { fetchMovieData } from "@/app/movie/movie-loader";
import { MovieTypes } from "@/app/types/movie";
import MovieCard from "@/app/ui/movie-card";
import React, { forwardRef } from "react";

export const ShowMovieType = forwardRef<HTMLDivElement, { type: string }>((data, ref) => {
  const { type } = data;
  const filter_movie = fetchMovieData(type).read();

  return (
    <>
      {filter_movie?.length === 0 ? (
        <div className="flex justify-center w-[45%]">
          <p className="text-center mt-5 text-[36px] font-extrabold">NO {type} MOVIES</p>
        </div>
      ) : (
        <div ref={ref} className="grid grid-cols-3 desktop:gap-10 laptop:gap-10">
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
