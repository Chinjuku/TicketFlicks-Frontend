/* eslint-disable @next/next/no-img-element */
import { fetchCountReview } from "@/api/get/review";
import Loading from "@/app/ui/Loading/loading-overlay";
import { MovieTypes } from "@/types/movie";
import { CountReviewTypes } from "@/types/review";
import { fetchMovieData } from "@/utils/fetch-movie-data";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { GoEye } from "react-icons/go";

export const ShowReviewMovie = (props: { type: string }) => {
  const { type } = props;
  const [countReview, setCountReview] = useState<CountReviewTypes[] | []>([]);
  const filter_movie = fetchMovieData(type).read();
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const data = await fetchCountReview();
      setCountReview(data);
      setLoading(false)
    };
    fetchData();
  }, []);

  if (loading) return <Loading />

  return (
    <>
      {filter_movie.map((data: MovieTypes, index: number) => {
        const count = countReview.find((findId) => findId.movie === data.id)?.count_review
        const getCount: number = count ? count : 0
        return (
          <div
            key={index}
            className="bg-secondary relative desktop:w-[300px] desktop:h-[440px] w-[230px] rounded-lg h-[350px] phone:w-[210px] phone:h-[240px] hover:scale-[1.02] transition-all flex justify-center items-center group"
          >
            <Link href="/review/[id]" as={`/review/${data.id}`}>
              <Button className="desktop:w-[270px] desktop:h-[420px] w-[200px] rounded-lg h-[330px] phone:w-[170px] phone:h-[200px] px-0 hover:scale-[1.02] transition-all flex flex-col gap-0">
                <img
                  src={`http://localhost:8000${data.movie_img}`}
                  className="desktop:w-[270px] desktop:h-[380px] border-4 border-white rounded-xl w-[200px] h-[260px] phone:w-[140px] phone:h-[200px] object-cover"
                  alt={data.movie_name}
                />
                <div className="h-full w-full flex flex-col items-center bg-secondary p-3 gap-2">
                  <p className="font-bold text-[18px] w-full">{data.movie_name}</p>
                  <div className="flex gap-2">
                    <p>{getCount}</p>
                    <p>Reviews</p>
                  </div>
                </div>
              </Button>
            <div className="absolute top-0 bottom-0 right-0 left-0 flex-col gap-10 opacity-0 group-hover:opacity-100 bg-black transition-opacity duration-700 bg-opacity-50 w-full h-full flex justify-center font-black text-[22px] items-center">
              <GoEye className="w-12 h-12" />
              <p className="text-2xl">Review movie</p>
            </div>
            </Link>
          </div>
        );
      })}
    </>
  );
};
