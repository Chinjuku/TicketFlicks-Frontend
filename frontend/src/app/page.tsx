import MovieNav from "@/app/components/movie-nav";
import SliderPicture from "@/app/components/picture-slider";
import ManyMovie from "@/app/components/movies";
import "@/app/styles/home.css"
import { fetchTopFiveMovie } from "./api/get/movie-data";
import MovieCard from "./components/movie-card";

export default async function Home() {
  const topfive = await fetchTopFiveMovie()
  return (
    <main>
        <SliderPicture />
        <div className="desktop:h-[102px] laptop:h-[75px] flex items-center">
          <p className="w-1/5 h-2 bg-tertiary"></p>
          <div className="h-full bg-tertiary rounded-lg border-4 border-black w-3/5">
            
          </div>
          <p className="w-1/5 h-2 bg-tertiary"></p>
        </div>
        <h1 className="desktop:text-[44px] laptop:text-[36px] font-extrabold text-center my-[2.2%]">Movies</h1>
        <div className="navmovie-desktop navmovie-laptop font-bold">
          <div className="h-[90%] flex items-center justify-center gap-[80px]">
            <MovieNav />
          </div>
          <p className="h-1 w-full bg-white"></p> 
        </div>
          <ManyMovie />
        <div className="flex flex-col mx-[10%]">
          <h1 className="text-center desktop:text-[44px] laptop:text-[34px] font-extrabold my-[2.5%]">Top 5 Most Rating Movies</h1>
          <div className="flex desktop:gap-10 laptop:gap-[25px] mx-[2.5%]">
          {
            topfive.map((movie) => {
              return (
                <MovieCard key={movie.id} data={movie}  />
              );
            })
          }
          </div>
        </div>
    </main>
  );
}
