"use client";

import { Autocomplete, AutocompleteItem } from "@nextui-org/autocomplete";
import { fetchAllMovies } from "@/api/get/movie";
import { useEffect, useState, useContext } from "react";
import { MovieTypes } from "@/types/movie";
import { useRouter } from "next/navigation";
import { themeContext } from "@/context/themeContext";

const SelectMovie = () => {
  const theme = useContext(themeContext)
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
    <div className={`${theme} desktop:h-[102px] laptop:h-[80px] tablet:h-[72px] phone:h-[55px] flex items-center w-full`}>
      <p className="w-1/5 h-2 bg-tertiary"></p>
      <div className="h-full flex items-center justify-center bg-tertiary rounded-lg border-4 border-black w-3/5 text-primary">
        <Autocomplete
          aria-label="Close"
          variant="underlined"
          placeholder="Search Movies"
          className={`${theme} dark max-w-xl rounded-md tablet:w-4/6 text-black tablet:h-4/5 desktop:text-[20px] bg-white border-2 border-primary px-5 py-[5px] z-1`}
          defaultItems={allMovie}
          onSelectionChange={(value) => router.push(`/movie/${value}`)}
        >
          {(movie) => (
            <AutocompleteItem
              className={`${theme} text-primary z-1`}
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
