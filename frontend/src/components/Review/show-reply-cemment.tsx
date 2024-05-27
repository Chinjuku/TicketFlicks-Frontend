import { fetchAllMovies } from "@/api/get/movie";
import { fetchReply } from "@/api/get/reply";
import Loading from "@/app/ui/Loading/loading-overlay";
import { ReplyTypes } from "@/types/reply";
import clsx from "clsx";
import React, { useEffect, useState } from "react";

const ShowReplyComment = (props: { reviewId: string }) => {
  const { reviewId } = props;
  const [replyComment, setReplyComment] = React.useState<ReplyTypes[]>();
  // const [loading, setLoading] = useState<boolean>(false)
  useEffect(() => {
    const fetchData = async () => {
      const replyComment = await fetchReply();
      setReplyComment(replyComment)
      // setTimeout(() => setReplyComment(replyComment), 500);
    };
    fetchData();
  }, []);

  return (
    <>
      {replyComment?.map((data, index) => (
        data.review_id === reviewId &&
        <div
          key={index}
          className={clsx(
            "w-full h-[60px] transition-all flex items-center gap-2 px-2.5"
          )}
        >
          <div className="vl w-2 border-l-2 h-full border-white"></div>
          <div className="flex gap-3 items-start">
            <div className="rounded-full w-8 h-8 bg-gray-100"></div>
            <div>
              <p className="font-bold">@{data.name}</p>
              <p className="text-sm">{data.reply_comment}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ShowReplyComment;
