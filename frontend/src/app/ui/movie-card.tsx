"use client"
import { useEffect, useState } from "react";
import moment from "moment";
import clsx from "clsx";
import { createFavorite } from "@/app/api/post/favorite-movie-data";
import { getFavorite } from "../api/get/favorite-movie-data";
import Image from "next/image";
import { HeartIcon } from "@heroicons/react/24/outline";
import { MovieTypes } from "../types/movie";
import Link from "next/link";

const MovieCard = (props: { data: MovieTypes }) => {
    const [innerWidth, setInnerWidth] = useState<number>(0)
    const [fav, setFav] = useState<boolean>(false)
    const { data } = props;
    useEffect(() => {
      const fetchData = async () => {
        const res = await getFavorite(data.id);
        if (res) {
          setFav(res);
        }
        setInnerWidth(window.innerWidth)
      };
      fetchData();
    }, [data.id]);
    const clickFavorite = async (id: string) => {
      const favorite = await createFavorite(id)
      if (favorite) setFav(true)
    }
    return (
      <div id={data.id} className="relative h-full hover:translate-y-2 transition-all">
        <Image
            src={`http://localhost:8000${data.movie_img}`}
            width={270}
            height={380}
            priority={false}
            style={{
                // Desktop style
                maxWidth: "270px",
                height: "380px",
                // Laptop & Tablet style
                ...(innerWidth >= 611 && innerWidth <= 1520 && {
                    maxWidth: "200px",
                    height: "300px",
                }),
                // Phone style
                ...(innerWidth >= 275 && innerWidth <= 611 && {
                    maxWidth: "140px",
                    height: "200px",
                }),
            }}
            alt={data.movie_name}
        />
        <div className="h-[50px] desktop:h-[60px] phone:text-[10px] bg-black font-bold laptop:text-[14px] flex flex-col justify-center items-center">
            <p>Release Date: {moment(data.showing_date).format('MM/DD/YYYY')}</p>
        </div>
        {/* Hover effect */}
        <div className="px-4 absolute w-full max-h-[86%] overflow-hidden bottom-0 left-0 right-0 top-0 bg-fixed opacity-0 bg-black transition duration-300 ease-in-out hover:bg-opacity-80 hover:opacity-100 flex flex-col justify-center gap-2">
          <button onClick={() => clickFavorite(data.id)} className="absolute top-3 right-3">
              <HeartIcon className={clsx("desktop:w-10 laptop:w-8 tablet:w-7",
                  {
                      "fill-yellow stroke-yellow" : fav,
                      "fill-none stroke-white" :!fav,
                  }  
              )} />
          </button>
          <p className="text-white text-lg font-extrabold desktop:text-[20px] phone:w-[120px] phone:text-[12px] desktop:w-[240px] text-[14px] w-[160px] h-auto whitespace-normal">
            {data.movie_name}
          </p>
          <p className="font-bold desktop:text-[16px] text-[12.8px] phone:text-[10.7px] desktop:w-[240px] w-[160px] text-quaternary h-auto whitespace-normal">
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
          <Link href='/movie/[id]' as={`/movie/${data.id}`} className="absolute desktop:text-[18px] hover:bg-tertiary transition-all laptop:text-[15px] w-[85%] phone:text-[13px] bottom-3 phone:py-2 px-5 py-3 rounded-lg flex justify-center font-bold bg-quaternary">
            Select this movie
          </Link>
        </div>
      </div>
    );
  };

export default MovieCard;