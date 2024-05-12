"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { createFavorite } from "@/app/api/post/favorite-movie-data";
import { getFavorite } from "../api/get/favorite-movie-data";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MovieTypes } from "../types/movie";

const MovieCard = (props: { data: MovieTypes }) => {
    const [fav, setFav] = useState(false)
    const { data } = props;
    useEffect(() => {
      const fetchData = async () => {
        const res = await getFavorite(data.id);
        if (res) {
          setFav(res);
        }
      };
      fetchData();
    }, [data.id]);
    const clickFavorite = async (id: string) => {
      const favorite = await createFavorite(id)
      setFav(favorite.message)
    }
    const handleSelect = (id: string) => {
      console.log(id);
    }
    return (
      <div key={data.id} id={data.id} className="relative h-full">
        {/* Desktop and laptop view */}
        <div className="hidden bg-cover desktop:block w-[270px] h-[400px]">
          <Image
            src={`http://localhost:8000${data.movie_img}`}
            width={270}
            height={400}
            style={{
              width: 270,
              height: 400
            }}
            alt={data.movie_name}
          />
        </div>
        {/* Laptop view */}
        <div className="hidden bg-cover w-[200px] h-[300px] laptop:flex laptop:flex-col">
          <Image
            src={`http://localhost:8000${data.movie_img}`}
            width={200}
            height={330}
            style={{
              width: 200,
              height: 330
            }}
            alt={data.movie_name}
          />
        </div>
        <div className="h-[50px] bg-black font-bold laptop:text-[14px] flex flex-col justify-center items-center">
              <p>Release Date: {moment(data.showing_date).format('MM/DD/YYYY')}</p>
        </div>
        {/* Hover effect */}
        <div className="px-4 absolute w-full laptop:h-[300px] desktop: overflow-hidden bottom-0 left-0 right-0 top-0 bg-fixed opacity-0 bg-black transition duration-300 ease-in-out hover:bg-opacity-80 hover:opacity-100 flex flex-col justify-center gap-2">
          <button onClick={() => clickFavorite(data.id)} className="absolute top-3 right-3">
              <HeartIcon className={clsx("desktop:w-10 laptop:w-8",
                  {
                      "fill-yellow stroke-yellow" : fav,
                      "fill-none stroke-white" :!fav,
                  }  
              )} />
          </button>
          <p className="text-white text-lg font-extrabold desktop:text-[20px] desktop:w-[240px] laptop:text-[14px] laptop:w-[160px] h-auto whitespace-normal">
            {data.movie_name}
          </p>
          <p className="font-bold desktop:text-[16px] laptop:text-[12.8px] desktop:w-[240px] laptop:w-[160px] text-quaternary h-auto whitespace-normal">
            {data.categories?.map((category, index) => (
              <>
                {data.categories.length == 1 ||
                index == data.categories.length - 1
                  ? category.category_name
                  : category.category_name + " , "}
              </>
            ))}
          </p>
          <p className="font-bold desktop:text-[14px] laptop:text-[12px] desktop:w-[240px] laptop:w-[160px] text-quaternary h-auto whitespace-normal">
              {
                  Math.floor(data.show_time_mins / 60) + "ชม."
              }
              {
                  data.show_time_mins % 60 + "นาที"
              }
          </p>
          <button onClick={() => handleSelect(data.id)} className="absolute w-[85%] bottom-3 px-5 py-3 rounded-lg bg-quaternary">
            Select this movie
          </button>
        </div>
      </div>
    );
  };

export default MovieCard;