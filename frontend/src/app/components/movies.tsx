import {
    fetchCommingMovie,
    fetchOnShowMovie,
    fetchRecommandMovie,
} from "@/app/api/get/movie-data"
import Image from "next/image"

const ManyMovie = async () => {
    const onshow_movie = await fetchOnShowMovie()
    const comming_movie = await fetchCommingMovie()
    const recommand_movie = await fetchRecommandMovie()
    const movies = [
        {
            id : "now",
            name : "NOW SHOWING",
            fetchData : onshow_movie
        },
        {
            id : "come",
            name : "COMMING SOON",
            fetchData : comming_movie
        },
        {
            id : "rec",
            name : "RECOMMANDED",
            fetchData : recommand_movie
        },
        {
            id : "fav",
            name : "FAVORITE",
            fetchData : null
        }
    ]
    return (
        <>
            {
                movies.map((movie) => (
                    <>
                        <section id={movie.id} className="h-[500px] my-[1.5%] mx-[13%]">
                            <p className="h-[20%] desktop:text-[28px] font-extrabold flex items-center">{movie.name}</p>
                            {
                                movie.fetchData?.map((data) => (
                                    <>
                                        <MovieCard data={data} />
                                    </>
                                ))
                            }
                        </section>
                    </>
                ))
            }
        </>
    )
}

export default ManyMovie

const MovieCard = (props: {data: any}) => {
    const { data } = props;
    return (
        <button id={data.id} className="w-[250px] h-[80%]">
            <Image src={`http://localhost:8000${data.movie_img_url}`} className="w-full h-full"
                width={250} height={400}
                alt={data.movie_name} />
        </button>
        
    )
}