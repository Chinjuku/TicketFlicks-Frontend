"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { fetchAllMovies } from "@/app/api/get/movie-data";
import { useEffect, useState } from "react";
import { MovieTypes } from "@/app/types/movie";
import { useRouter } from "next/navigation";

const SelectMovie = () => {
  const router = useRouter();
  const [allMovie, setAllMovie] = useState<MovieTypes[]>([]);
  useEffect(() => {
    const fetchAll = async () => {
      const allMovie = await fetchAllMovies();
      setAllMovie(allMovie);
    };
    fetchAll();
  }, []);

  return (
    <div className="desktop:h-[102px] laptop:h-[80px] tablet:h-[72px] phone:h-[55px] flex items-center w-full">
      <p className="w-1/5 h-2 bg-tertiary"></p>
      <div className="h-full flex items-center justify-center bg-tertiary rounded-lg border-4 border-black w-3/5 text-primary">
        <Autocomplete
          aria-label="Close"
          variant="underlined"
          placeholder="Search Movies"
          className="max-w-xl rounded-md tablet:w-4/6 tablet:h-4/5 desktop:text-[20px] bg-white border-2 border-primary px-5 py-[5px] text-black z-1"
          defaultItems={allMovie}
          onSelectionChange={(value) => router.push(`/movie/${value}`)}
        >
          {(movie) => (
            <AutocompleteItem
              className="text-white z-1 "
              key={movie.id}
              value={movie.id}
            >
              {movie.movie_name}
            </AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <p className="w-1/5 h-2 bg-tertiary"></p>
    </div>
  );
};

export default SelectMovie;
