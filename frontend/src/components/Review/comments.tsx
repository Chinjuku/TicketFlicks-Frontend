"use client";
import { ReviewTypes } from "@/types/review";
import React, { useState } from "react";
import { IoStar } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { FaRegComment } from "react-icons/fa";
import ShowReplyComment from "./show-reply-cemment";
import clsx from "clsx";
import { CountReplyTypes } from "@/types/reply";
import { BsThreeDots } from "react-icons/bs";
import { MdModeEdit } from "react-icons/md";
import { AiFillDelete } from "react-icons/ai";
import PostReply from "./post-reply";

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

  const toggleShowReply = (index: number) => {
    setShowReplies((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const toggleReplyField = (index: number) => {
    setReplyFields((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const showButton = (index: number) => {
    setChoice((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleDelete = (id: string) => {
    
  }

  return (
    <>
      {fetchComments.map((data, index) => {
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
              <div className="vl w-2 border-l-2 border-white"></div>
              <div className="flex gap-3 items-start">
                <div className="rounded-full w-8 h-8 bg-gray-100"></div>
                <div>
                  <p className="font-bold">@{data.name}</p>
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
              <div className="rounded flex flex-col w-[100px] bg-primary1 absolute top-9 right-[-10px] gap-2 p-1">
                <Button
                  onClick={() => console.log(data.id)}
                  className="bg-transparent rounded hover:bg-primary2 transition-all h-7 w-13"
                >
                  <MdModeEdit className="w-4 h-4 fill-white" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(data.id)}
                  className="bg-transparent rounded hover:bg-primary2 transition-all h-7 w-13"
                >
                  <AiFillDelete className="w-5 h-5 fill-white" />
                  Delete
                </Button>
              </div>
            )}
            {showReplies[index] && <ShowReplyComment reviewId={data.id} />}
          </div>
        );
      })}
    </>
  );
};

export default Comments;
