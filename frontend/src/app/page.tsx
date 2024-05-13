import MovieNav from "@/app/components/movie-nav";
import SliderPicture from "@/app/components/picture-slider";
import ManyMovie from "@/app/components/movies";
import "@/app/styles/home.css"
import { fetchTopFiveMovie } from "@/app/api/get/movie-data";
import MovieCard from "@/app/components/movie-card";
import SelectMovie from "@/app/components/select-movie";
import { Suspense } from "react";
import SkeletonMovieCard from "./ui/Loading/skeleton-movie-card";

export default async function Home() {
  const topfive = await fetchTopFiveMovie()
  return (
    <main>
        <SliderPicture />
        <SelectMovie />
        <h1 className="desktop:text-[46px] laptop:text-[37px] tablet:text-[30px] phone:text-[22px] font-extrabold text-center my-[2.2%] tablet:mt-[4%] phone:my-[4%]">Movies</h1>
        <div className="navmovie-desktop navmovie-laptop navmovie-tablet navmovie-phone font-bold max-h-[150px] flex flex-col gap-[7%]">
          <div className="h-[90%] flex items-center justify-center gap-[10%] tablet:gap-[6%] flex-1 flex-wrap flex-grow">
            <MovieNav />
          </div>
          <p className="h-1 w-full bg-white"></p> 
        </div>
        <div className="mt-[2%] phone:mt-10">
          <Suspense fallback={<SkeletonMovieCard />}>
            <ManyMovie />
          </Suspense>
        </div>
        <div className="flex flex-col mx-[5%] mb-[5%]">
          <h1 className="text-center desktop:text-[44px] laptop:text-[34px] tablet:text-[29px] phone:text-[20px] font-extrabold my-[2.5%]">Top 5 Most Rating Movies</h1>
          <div className="flex flex-1 flex-wrap justify-center items-center py-4 desktop:gap-10 gap-[25px] mx-[2.5%]">
          {
            topfive.map((movie) => {
              return (
                <MovieCard key={movie.id} data={movie}  />
              );
            })
          }
          </div>
        </div>
        <div className="h-[100px] bg-black">

        </div>  
    </main>
  );
}
