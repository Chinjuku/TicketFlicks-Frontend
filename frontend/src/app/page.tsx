import MovieNav from "@/components/Home/movie-nav";
import SliderPicture from "@/components/Home/picture-slider";
import ManyMovie from "@/components/Home/movies";
import "@/styles/home.css";
import SelectMovie from "@/app/ui/select-movie";
import { Suspense } from "react";
import { SkeletonMovieCard, SkeletonTop5Card } from "@/app/ui/Loading/skeleton-movie-card";
import { TopFiveMovies } from "@/components/Home/topfive-movies";

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <SliderPicture />
      <SelectMovie />
      <h1 className="desktop:text-[46px] laptop:text-[37px] tablet:text-[30px] phone:text-[22px] font-extrabold text-center my-[2.2%] tablet:mt-[4%] phone:my-[4%]">
        Movies
      </h1>
      <div className="navmovie-desktop navmovie-laptop navmovie-tablet navmovie-phone font-bold max-h-[150px] flex flex-col gap-[7%]">
        <MovieNav />
        <p className="h-1 w-full bg-white phone:mt-5"></p>
      </div>
      <div className="mt-[2%] phone:mt-10">
        <Suspense fallback={<SkeletonMovieCard />}>
          <ManyMovie />
        </Suspense>
      </div>
      <Suspense fallback={<SkeletonTop5Card />}>
        <TopFiveMovies />
      </Suspense>
      <div className="h-[100px] bg-black"></div>
    </main>
  );
}

