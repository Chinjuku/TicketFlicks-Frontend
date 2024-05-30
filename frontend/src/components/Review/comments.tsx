"use client";
import { ReviewTypes } from "@/types/review";
import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdKeyboardArrowDown, MdModeEdit } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { FaRegComment } from "react-icons/fa";
import ShowReplyComment from "./Reply/show-reply-cemment";
import clsx from "clsx";
import { CountReplyTypes } from "@/types/reply";
import { BsThreeDots } from "react-icons/bs";
import PostReply from "./Reply/post-reply";
import UpdateModal from "./update-modal";
import DeleteReview from "./delete-review";
import { datetimeFormatter } from "@/utils/datetime-post-format";

const Comments = (props: {
  fetchComments: ReviewTypes[];
  fetchCountReply: CountReplyTypes[];
}) => {
  const { fetchComments, fetchCountReply } = props;
  const [showReplies, setShowReplies] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [replyFields, setReplyFields] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [choice, setChoice] = useState<{ [key: number]: boolean }>({});
  const [showMoreComment, setshowMoreComment] = useState<number>(5);

  const toggleShowReply = (index: number) => {
    setShowReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleReplyField = (index: number) => {
    setReplyFields((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const showButton = (index: number) => {
    setChoice((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleShowMore = () => {
    setshowMoreComment((prev) => prev + 5);
  };

  function handleShowLess(): void {
    setshowMoreComment((prev) => (prev = 5));
  }

  return (
    <>
      {fetchComments.slice(0, showMoreComment).map((data, index) => {
        const create_time = datetimeFormatter(data.time_stamp)
        const countData = fetchCountReply.find(
          (countData) => countData.review_id === data.id
        );
        const countReplies = countData ? countData.count_reply : 0;
        return (
          <div
            key={index}
            className="w-full p-3.5 flex flex-col gap-1 my-3 relative"
          >
            <div className="flex gap-2 h-full">
              <div className="opacity-70 w-2 border-l-2 border-white"></div>
              <div className="flex gap-3 justify-start">
                <div className="rounded-full w-8 h-8 bg-gray-100"></div>
                <div>
                  <div className="flex gap-3 items-end">
                    <p className="font-bold">@{data.name}</p>
                    <p className="text-[12px] text-[#d9d9d9]">{create_time}</p>
                  </div>
                  <p className="text-sm">{data.review_comment}</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 items-center text-sm pl-8">
              <div className="flex gap-2 items-center">
                <IoStar className="w-4 h-4 fill-yellow" />
                <p>stars ({data.stars})</p>
              </div>
              <Button
                onClick={() => toggleReplyField(index)}
                className="bg-transparent items-center gap-2 flex"
              >
                <FaRegComment className="fill-white" /> Reply
              </Button>
              <Button
                onClick={() => toggleShowReply(index)}
                className="flex items-center gap-2 text-gray-500 bg-transparent px-0"
              >
                {countReplies + " "}
                replies
                <MdKeyboardArrowDown
                  className={clsx("w-4 h-4 transition-all", {
                    "rotate-180": showReplies[index],
                  })}
                />
              </Button>
            </div>
            {replyFields[index] && (
              <PostReply
                reviewId={data.id}
                index={index}
                movieId={data.movie.id}
                toggleReplyField={(index) => toggleReplyField(index)}
              />
            )}
            <Button
              onClick={() => showButton(index)}
              className="w-4 h-5 bg-transparent absolute top-2 right-3"
            >
              <BsThreeDots className="w-4 h-4 fill-white" />
            </Button>
            {choice[index] && (
              <div className="rounded flex flex-col w-[100px] bg-primary1 absolute top-9 right-[-10px] gap-1 p-1">
                <UpdateModal
                  reviewId={data.id}
                  index={index}
                  showButton={showButton}
                />
                <DeleteReview
                  reviewId={data.id}
                  movieId={data.movie.id}
                  index={index}
                  showButton={showButton}
                />
              </div>
            )}
            {showReplies[index] && <ShowReplyComment movieId={data.movie.id} reviewId={data.id} />}
          </div>
        );
      })}
      <div className="flex gap-4 justify-center">
        {showMoreComment < fetchComments.length && (
          <div className="flex justify-center">
            <Button onClick={handleShowMore} className="bg-primary rounded">
              Show More
            </Button>
          </div>
        )}
        {showMoreComment >= fetchComments.length && showMoreComment > 5 && (
          <div className="flex justify-center">
            <Button onClick={handleShowLess} className="bg-primary rounded">
              Show Less
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default Comments;
