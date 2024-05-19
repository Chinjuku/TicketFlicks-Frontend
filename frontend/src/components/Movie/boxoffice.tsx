import Image from "next/image";
import { fetchTopFiveMovie } from "@/api/get/movie-data";
import React from "react";

const Top5BoxOffice = async () => {
  const topfive_movies = await fetchTopFiveMovie();
  return (
    <div className="top_five_box relative border-l-3 border-e-3 border-b-3 border-white flex justify-center w-full px-[15px] py-10">
      <div className="h-[2px] bg-white w-1/5 absolute top-0 left-0"></div>
      <div className="h-[2px] bg-white w-1/5 absolute top-0 right-0"></div>
      <h1 className="absolute top-[-14px] text-[20px] font-extrabold">
        Top 5 Box Office
      </h1>
      <div className="flex  justify-center flex-col gap-6">
        {topfive_movies.map((movie) => {
          return (
            <div
              key={movie.id}
              className="flex justify-center items-center gap-6"
            >
              <div className="w-1/2">
                <Image
                  width={100}
                  height={140}
                  src={`http://localhost:8000${movie.movie_img}`}
                  className="w-[100px] h-[140px]"
                  alt={movie.movie_name}
                />
              </div>
              <h1 className="w-1/2 text-[20px]">{movie.movie_name}</h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Top5BoxOffice;
