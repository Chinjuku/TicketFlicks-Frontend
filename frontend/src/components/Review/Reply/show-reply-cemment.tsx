import { fetchReplyAll } from "@/api/get/reply";
import { ReplyTypes } from "@/types/reply";
import { datetimeFormatter } from "@/utils/datetime-post-format";
import { Button } from "@nextui-org/button";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import UpdateReplyModal from "@/components/Review/Reply/update-reply-modal";
import DeleteReply from "./delete-reply";
import { useUser } from "@/context/userContext";

const ShowReplyComment = (props: { reviewId: string; movieId: string }) => {
  const { user } = useUser();
  const { reviewId, movieId } = props;
  const [replyComment, setReplyComment] = React.useState<ReplyTypes[]>();
  const [choice, setChoice] = useState<{ [key: number]: boolean }>({});

  const showButtons = (index: number) => {
    setChoice((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const replyComment = await fetchReplyAll();
      setReplyComment(replyComment);
    };
    fetchData();
  }, []);

  return (
    <>
      {replyComment?.map((data, index) => {
        const create_time = datetimeFormatter(data.time_stamp);

        return (
          data.review_id === reviewId && (
            <div
              key={index}
              className={clsx(
                "w-full h-[60px] transition-all flex items-center gap-2 px-3 relative"
              )}
            >
              <div className="opacity-70 w-2 border-l-2 h-full border-white"></div>
              <div className="flex gap-3 items-start">
                <div className="rounded-full w-8 h-8 bg-gray-100"></div>
                <div>
                  <div className="flex gap-3 items-end">
                    <p className="font-bold">
                      @{data.user.name ? data.user.name : data.user.email}
                    </p>
                    <p className="text-[12px] text-[#d9d9d9]">{create_time}</p>
                  </div>
                  <p className="text-sm">{data.reply_comment}</p>
                </div>
              </div>
              {user?.id === data.user.id && (
                <Button
                  onClick={() => showButtons(index)}
                  className="w-4 h-5 bg-transparent absolute top-2 right-3"
                >
                  <BsThreeDots className="w-4 h-4 fill-white" />
                </Button>
              )}
              {choice[index] && (
                <div className="rounded flex flex-col w-[100px] bg-primary1 absolute top-9 right-[-10px] gap-1 p-1 z-20">
                  <UpdateReplyModal
                    replyId={data.id}
                    movieId={movieId}
                    index={index}
                    showButton={showButtons}
                  />
                  <DeleteReply
                    replyId={data.id}
                    movieId={movieId}
                    index={index}
                    showButton={showButtons}
                  />
                </div>
              )}
            </div>
          )
        );
      })}
    </>
  );
};

export default ShowReplyComment;
