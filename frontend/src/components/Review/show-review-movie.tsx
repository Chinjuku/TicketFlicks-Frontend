/* eslint-disable @next/next/no-img-element */
import { MovieTypes } from "@/types/movie";
import { fetchMovieData } from "@/utils/fetch-movie-data";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React from "react";
import { GoEye } from "react-icons/go";

export const ShowReviewMovie = (props: { type: string }) => {
  const { type } = props;
  const filter_movie = fetchMovieData(type).read();
  return (
    <>
      {filter_movie.map((data: MovieTypes, index: number) => {
        return (
          <Link href="/review/[id]" as={`/review/${data.id}`} key={index} className="relative">
            <Button className="desktop:w-[270px] desktop:h-[420px] w-[200px] h-[330px] phone:w-[170px] phone:h-[200px] px-0 hover:scale-[1.02] transition-all flex flex-col gap-0">
            <img
              src={`http://localhost:8000${data.movie_img}`}
              className="desktop:w-[270px] desktop:h-[380px] w-[200px] h-[260px] phone:w-[140px] phone:h-[200px] object-cover"
              alt={data.movie_name}
            />
            <div className="h-full w-full flex flex-col items-center bg-secondary p-3 gap-2">
                <p className="font-bold text-[18px]">{data.movie_name}</p>
            </div>
            <div className="absolute flex-col gap-10 group-hover:opacity-100 bg-black opacity-0 transition-[.7s] bg-opacity-50 w-0 group-hover:w-full h-0 group-hover:h-full flex justify-center font-black text-[22px] items-center">
                <GoEye className="w-12 h-12"/>
                <p className="text-2xl">Review movie</p>
            </div>
            </Button>
          </Link>
        );
      })}
    </>
  );
};
