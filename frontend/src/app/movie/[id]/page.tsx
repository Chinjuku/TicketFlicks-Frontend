"use client"
import ShowSelectMovie from "@/app/components/SelectMovie/show-select-movie";
import SelectMovie from "@/app/ui/select-movie";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import { Suspense, useEffect, useState } from "react";
import { selectMovieData } from "./select-movie-data";
import moment from "moment";
import { Stepper } from "@/app/components/SelectMovie/stepper";
import { LockClosedIcon } from "@heroicons/react/24/outline";
// import dynamic from "next/dynamic";
// const ShowSelectMovie = dynamic(() => import("@/app/components/SelectMovie/show-select-movie"), {
//   suspense: true,
// });

const Movie = ({ params }: { params: { id: string } }) => {
  const [openContent, setOpenContent] = useState<boolean>(false)
  const id = params.id;
  const movie = selectMovieData(id)?.read()
  return (
    <main>
      <SelectMovie />
        <Suspense fallback={<div className="w-full h-[1000px] bg-white">Load</div>}>
            <ShowSelectMovie fetchMovie={movie} setOpen={(bool) => setOpenContent(bool)} />
        </Suspense>
      <section className={clsx("transition-all relative p-4", {
        "h-0 opacity-0 hidden" : openContent === false,
        "h-[500px] bg-secondary opacity-100 flex flex-col transition-all" : openContent === true
      })}>
            <Button className="absolute bg-transparent w-8 h-8 top-2 right-2" onClick={() => setOpenContent(false)}>
             <LockClosedIcon className="w-6" />
            </Button>
          <h1 className="text-center">Release Date: {moment(movie?.showing_date).format("DD/MM/YYYY")}</h1>
          <div>
            <h1>About {movie?.movie_name}</h1>
            <span className="bg-white"></span>
            <p>{movie?.movie_description}</p>
          </div>
          <div>
            <h1>Actors</h1>
            <img src="" alt="" />
            <p>Name</p>
          </div>
          <p></p>
      </section>
      <div className="flex flex-col items-center w-full">
        <Stepper />
      </div>
    </main>
  );
};

export default Movie;
