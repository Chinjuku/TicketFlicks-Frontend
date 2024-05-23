/* eslint-disable @next/next/no-img-element */
"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { createFavorite } from "@/api/post/favorite-movie-data";
import { getFavorite } from "@/api/get/favorite-movie-data";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MovieTypes } from "@/types/movie";
import Link from "next/link";
import { Button } from "@nextui-org/button";

const MovieCard = (props: { data: MovieTypes }) => {
    const [fav, setFav] = useState<boolean>(false)
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
    return (
      <div key={`1${data.id}1`} id={data.id} className="relative h-full hover:translate-y-2 transition-all">
        <img
            src={`http://localhost:8000${data.movie_img}`}
            className="desktop:w-[270px] desktop:h-[380px] w-[200px] h-[300px] phone:w-[140px] phone:h-[200px] object-cover"
            alt={data.movie_name}
        />
        <div className="h-[50px] desktop:h-[60px] phone:text-[10px] bg-black font-bold laptop:text-[14px] flex flex-col justify-center items-center">
            <p className="px-2">Release Date: {moment(data.showing_date).format('MM/DD/YYYY')}</p>
        </div>
        {/* Hover effect */}
        <div className="px-4 absolute desktop:w-[270px] desktop:h-[380px] w-[200px] h-[300px] phone:w-[140px] phone:h-[200px]  overflow-hidden bottom-0 left-0 right-0 top-0 bg-fixed opacity-0 bg-black transition duration-300 ease-in-out hover:bg-opacity-80 hover:opacity-100 flex flex-col justify-center gap-2">
          <button onClick={() => clickFavorite(data.id)} className="absolute top-3 right-3">
              <HeartIcon className={clsx("desktop:w-10 laptop:w-8 tablet:w-7 phone:w-4",
                  {
                      "fill-yellow stroke-yellow" : fav,
                      "fill-none stroke-white" :!fav,
                  }  
              )} />
          </button>
          <p className="text-white text-lg font-extrabold desktop:text-[20px] phone:w-[120px] phone:text-[11px] desktop:w-[240px] text-[14px] w-[160px] h-auto whitespace-normal">
            {data.movie_name}
          </p>
          <p className="font-bold desktop:text-[16px] text-[12.8px] phone:text-[10px] desktop:w-[240px] w-[160px] phone:w-[120px] text-quaternary h-auto whitespace-normal text-wrap">
            {data.categories?.map((category, index) => (
              <>
                {data.categories.length == 1 ||
                index == data.categories.length - 1
                  ? category.category_name
                  : category.category_name + " , "}
              </>
            ))}
          </p>
          <p className="font-bold desktop:text-[14px] text-[12px] phone:text-[10px] desktop:w-[240px] w-[160px] text-quaternary h-auto whitespace-normal">
              {
                  Math.floor(data.show_time_mins / 60) + "ชม."
              }
              {
                  data.show_time_mins % 60 + "นาที"
              }
          </p>
          <Link href='/movie/[id]' as={`/movie/${data.id}`}>
            <Button className="absolute desktop:text-[18px] hover:bg-tertiary transition-all laptop:text-[15px] w-[85%] phone:text-[10px] bottom-3 phone:py-2 px-5 py-3 rounded-lg flex justify-center font-bold bg-quaternary">
                Select this movie
            </Button>
          </Link>
          
        </div>
      </div>
    );
  };

export default MovieCard;