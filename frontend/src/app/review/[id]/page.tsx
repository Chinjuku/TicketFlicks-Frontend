/* eslint-disable @next/next/no-img-element */
import { fetchAllMovies, fetchSelectMovie } from "@/api/get/movie";
import { fetchReviewData, fetchCountReviewById } from "@/api/get/review";
import { BiCommentDetail } from "react-icons/bi";
import { StarIcon } from "@heroicons/react/24/outline";
import { MdAddComment } from "react-icons/md";
import Comments from "@/components/Review/comments";
import PostComment from "@/components/Review/post-comment";
import Link from "next/link";
import { fetchCountReplyAll } from "@/api/get/reply";

const Page = async ({ params }: { params: { id: string } }) => {
  const id = params.id;
  const fetchAllMovie = await fetchAllMovies()
  const fetchMovie = await fetchSelectMovie(id);
  const fetchReview = await fetchReviewData(id);
  const fetchCountReview: number = await fetchCountReviewById(id);
  const fetchCountReply = await fetchCountReplyAll()

  return (
    <main className="w-full overflow-y-hidden h-full flex px-[8%] py-[2%]">
      <div className="w-1/4 flex flex-col gap-6 items-center justify-start">
        <img
          className="w-44 phone:w-36 object-cover"
          src={`http://localhost:8000${fetchMovie?.movie_img}`}
          alt={fetchMovie?.movie_name}
        />
        <div className="flex flex-col gap-3 w-3/5">
          <h1 className="phone:text-[24px] font-bold text-[30px]">
            {fetchMovie?.movie_name}
          </h1>
          <div>
            {fetchMovie?.categories.map((category, index) => {
              return <p key={index}>{"- " + category.category_name}</p>;
            })}
          </div>
          <div className="flex">
            <p>{fetchMovie?.rating}/10</p>
            <p>
              <StarIcon className="w-6 fill-yellow stroke-yellow" />
            </p>
          </div>
        </div>
      </div>
      <div className="w-1/2 p-6">
        <div className="flex gap-2.5 items-center my-2.5">
          <BiCommentDetail className="w-6 h-6" />
          <h1 className="text-[20px] font-bold">{fetchCountReview} COMMENTS</h1>
        </div>
        <PostComment movieId={fetchMovie?.id} reviewId={id} />
        <Comments fetchComments={fetchReview} fetchCountReply={fetchCountReply} />
      </div>
      <div className="w-1/4 p-3">
        <h1 className="font-bold text-[24px] my-4 text-center">REVIEW MORE MOVIES</h1>
        {
          fetchAllMovie.map((data, index) => {
            if (data.id === fetchMovie?.id) return;
            return (
              <Link href={`/review/${data.id}`} as={`/review/${data.id}`} key={index}>
                <div className="flex gap-4 p-2 border-white border-2 rounded-lg my-2 hover:bg-primary1 transition-all relative">
                  <img className="object-cover w-[100px] h-[145px]" src={`http://localhost:8000${data.movie_img}`} alt={data.movie_name} />
                  <div>
                    <p className="text-[18px]">{data.movie_name}</p>
                    <div className="flex gap-1">
                    <p>{data.rating} / 10</p>
                      <StarIcon className="w-6 fill-yellow stroke-yellow" />
                    </div>
                  </div>
                  <MdAddComment className="w-6 absolute right-3 stroke-none bottom-3" />
                </div>
              </Link>
            );
          })
        }
      </div>
    </main>
  );
};

export default Page;
