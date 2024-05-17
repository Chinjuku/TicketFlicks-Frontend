import { MovieTypes } from "@/app/types/movie";
import { Button } from "@nextui-org/button";
import React from "react";

const ShowSelectMovie = ({
  fetchMovie,
  setOpen,
}: {
  fetchMovie: MovieTypes | null | undefined;
  setOpen: (bool: boolean) => void;
}) => {
  return (
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
        <Button className="bg-quaternary" onClick={() => setOpen(true)}>
          VIEW MORE DETAILS
        </Button>
      </div>
    </section>
  );
};

export default ShowSelectMovie;