import React from "react";
import MovieCard from "@/app/ui/movie-card";
import { fetchTopFiveMovie } from "@/app/api/get/movie-data";

export const TopFiveMovies = async () => {
  const topfive = await fetchTopFiveMovie();
  return (
    <div className="flex flex-col mx-[5%] mb-[5%]">
      <h1 className="text-center desktop:text-[44px] laptop:text-[34px] tablet:text-[29px] phone:text-[20px] font-extrabold my-[2.5%]">
        Top 5 Most Rating Movies
      </h1>
      <div className="flex flex-1 flex-wrap justify-center items-center py-4 desktop:gap-10 gap-[25px] mx-[2.5%]">
        {topfive.map((movie) => {
          return <MovieCard key={movie.id} data={movie} />;
        })}
      </div>
    </div>
  );
};
