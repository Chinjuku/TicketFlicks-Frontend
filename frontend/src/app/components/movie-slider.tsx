"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { MovieTypes } from "../types/movie";
import "@/app/styles/movie-slider.css";
import MovieCard from "@/app/components/movie-card";

const MovieSlider = (props: { id: string; fetchData: MovieTypes[] | null }) => {
  const { id, fetchData } = props;
  const slideLeft = (id: string) => {
    const slider = document.getElementById(`slider${id}`);
    if (slider != null) slider.scrollLeft = slider.scrollLeft - 270;
  };
  const slideRight = (id: string) => {
    const slider = document.getElementById(`slider${id}`);
    if (slider != null) slider.scrollLeft = slider.scrollLeft + 270;
  };
  return (
    <div className="trending">
      <div className="container gap-5">
        <div className="title-btns desktop:mt-[-10%] laptop:mt-[-8%]">
          <h3></h3>
          <div className="btns">
            <button title="scroll left" onClick={() => slideLeft(id)}>
              <ArrowLeftIcon />
            </button>
            <button title="scroll right" onClick={() => slideRight(id)}>
              <ArrowRightIcon />
            </button>
          </div>
        </div>
        <div
          className="row-container flex h-[85%] desktop:gap-10 laptop:gap-[25px]"
          id={`slider${id}`}
        >
          {fetchData &&
            fetchData.map((data: MovieTypes) => (
              <>
                <MovieCard key={data.id} data={data} />
              </>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MovieSlider;

