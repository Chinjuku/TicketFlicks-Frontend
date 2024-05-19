import {
  fetchCommingMovie,
  fetchFavoriteMovie,
  fetchOnShowMovie,
  fetchRecommandMovie,
} from "@/api/get/movie-data";
import MovieSlider from "@/components/Home/movie-slider";

const ManyMovie = async () => {
  const onshow_movie = await fetchOnShowMovie();
  const comming_movie = await fetchCommingMovie();
  const recommand_movie = await fetchRecommandMovie();
  const fav_movie = await fetchFavoriteMovie();
  const fav_movie_realdata = fav_movie.map((movies) => {
    return movies.movieId
  })
  const movies = [
    {
      id: "now",
      name: "NOW SHOWING",
      fetchData: onshow_movie,
    },
    {
      id: "come",
      name: "COMMING SOON",
      fetchData: comming_movie,
    },
    {
      id: "rec",
      name: "RECOMMANDED",
      fetchData: recommand_movie,
    },
    {
      id: "fav",
      name: "FAVORITE",
      fetchData: fav_movie_realdata,
    },
  ];
  return (
    <>
      {movies.map(movie => (
        <>
          {movie.fetchData.length === 0 ? null : (
            <section
              key={movie.id}
              id={movie.id}
              className="max-h-[670px] mx-[10%] my-[6%] flex flex-col laptop:gap-[50px] desktop:gap-[100px] phone:w-full"
            >
              <p className="h-[15%] laptop:mx-3 laptop:text-[26px] tablet:text-[23px] tablet:mb-[-30px] desktop:text-[33px] font-extrabold flex items-center">
                {movie.name}
              </p>
              <MovieSlider key={movie.id} id={movie.id} fetchData={movie.fetchData} />
            </section>
          )}
        </>
      ))}
    </>
  );
};

export default ManyMovie;
