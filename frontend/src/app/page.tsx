import MovieNav from "@/app/components/movie-nav";
import SliderPicture from "@/app/components/picture-slider";
import { fetchAllMovies } from "@/app/api/get/movie-data";
import ManyMovie from "@/app/components/movies";

export default async function Home() {
  const allmovie = await fetchAllMovies()
  return (
    <main>
        <SliderPicture />
        <div className="desktop:h-[102px] flex items-center">
          <p className="w-1/5 h-2 bg-tertiary"></p>
          <div className="h-full bg-tertiary rounded-lg border-4 border-black w-3/5">
            
          </div>
          <p className="w-1/5 h-2 bg-tertiary"></p>
        </div>
        <h1 className="desktop:text-[44px] font-extrabold text-center my-[2.2%]">Movies</h1>
        <div className="desktop:h-[125px] text-[30px] mx-[18%] font-bold">
          <div className="h-[90%] flex items-center justify-center gap-[80px]">
            <MovieNav />
          </div>
          <p className="h-1 w-full bg-white"></p> 
        </div>
        <div>
          <ManyMovie />
        </div>
    </main>
  );
}
