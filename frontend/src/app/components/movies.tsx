import {
  fetchCommingMovie,
  fetchFavoriteMovie,
  fetchOnShowMovie,
  fetchRecommandMovie,
} from "@/app/api/get/movie-data";
import MovieSlider from "@/app/components/movie-slider";

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
      {movies.map((movie, index) => (
        <>
          {movie.fetchData.length === 0 ? null : (
            <section
              key={index}
              id={movie.id}
              className="desktop:h-[670px] laptop:h-[520px] mx-[10%]"
            >
              <p className="h-[15%] laptop:mx-3 laptop:text-[23px] desktop:text-[30px] font-extrabold flex items-center">
                {movie.name}
              </p>
              <MovieSlider key={index} id={movie.id} fetchData={movie.fetchData} />
            </section>
          )}
        </>
      ))}
    </>
  );
};

export default ManyMovie;
