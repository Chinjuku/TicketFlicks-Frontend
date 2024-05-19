/* eslint-disable @next/next/no-img-element */
"use client"
import { MovieTypes } from "@/types/movie";
import { SkeletonSelectMovie } from "@/app/ui/Loading/skeleton-selected-movie";
import { LockClosedIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import moment from "moment";
import { Button } from "@nextui-org/button";
import React, { useState } from "react";

const ShowSelectMovie = (props : {fetchMovie: MovieTypes | null}) => {
  const { fetchMovie } = props
  const [openContent, setOpenContent] = useState<boolean>(false)
  return (
    <>
      <section className="flex gap-[7%] laptop:h-[500px]">
        <div className="w-1/2 flex items-center justify-end">
          <img
            className="w-56 object-cover"
            src={`http://localhost:8000${fetchMovie?.movie_img}`}
            alt={fetchMovie?.movie_name}
          />
        </div>
        <div className="w-1/2 flex flex-col items-start justify-center gap-5">
          <h1 className=" text-[30px]">{fetchMovie?.movie_name}</h1>
          <p>
            Genre :{" "}
            {fetchMovie?.categories.map((category, index) => {
              if (
                fetchMovie?.categories.length === 1 ||
                index === fetchMovie?.categories.length - 1
              )
                return category.category_name;
              else return category.category_name + "/";
            })}
          </p>
          <p>Rating : {fetchMovie?.rating}/10</p>
          <Button className="bg-quaternary" onClick={() => setOpenContent(true)}>
            VIEW MORE DETAILS
          </Button>
        </div>
      </section>
      <ExtendSelectedData fetchMovie={fetchMovie} openContent={openContent} setOpen={(bool) => setOpenContent(bool)} />
    </>
  );
};

const ExtendSelectedData = ({
  fetchMovie,
  setOpen,
  openContent
}: {
  fetchMovie: MovieTypes | null;
  setOpen: (bool: boolean) => void;
  openContent: boolean;
}) => {
  return (
    <section className={clsx("transition-all relative p-8 px-12 flex gap-4 flex-col justify-center font-extrabold", {
      "h-0 opacity-0 hidden" : openContent === false,
      "h-full bg-secondary opacity-100 flex flex-col transition-all" : openContent === true
    })}>
          <Button className="absolute bg-transparent w-8 h-8 top-2 right-2" onClick={() => setOpen(false)}>
           <LockClosedIcon className="w-6" />
          </Button>
        <h1 className="text-center text-3xl">Release Date: {moment(fetchMovie?.showing_date).format("DD/MM/YYYY")}</h1>
        <div>
          <h1 className="text-2xl mb-2 flex gap-2">About : <p className="text-quaternary">{fetchMovie?.movie_name}</p></h1>
          <span className="bg-white"></span>
          <p className="font-normal">{fetchMovie?.movie_description}</p>
        </div>
        <div>
          <h1 className="text-2xl mb-3">Actors</h1>
          <div className="flex gap-6">
              {
                  fetchMovie?.actors.map(
                      (actor) => (
                          <>
                            <div className="w-full flex items-center gap-5 flex-wrap">
                                <img src={`http://localhost:8000${actor.actor_img}`} className="w-24 h-24 rounded-[50%] object-cover" alt={actor.actor_name} />
                                <div>
                                <p className="text-[18px]">{actor.actor_name}</p>
                                <p className="font-normal">{actor.performed_as}</p>
                                </div>
                            </div>
                          </>
                      )
                  )
              }
          </div>
        </div>
    </section>
  )
}

export default ShowSelectMovie;