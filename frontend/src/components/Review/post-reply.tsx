import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import clsx from "clsx";
import React from "react";

type ReplyProps = {
  reviewId: string
  index: number;
  toggleReplyField: (index: number) => void;
};

const PostReply = (props: ReplyProps) => {
  const { reviewId, index, toggleReplyField } = props
  return (
    <div
      className={clsx(
        "w-full h-[60px] transition-all flex items-center justify-center pl-2.5"
      )}
    >
      <div className="flex items-center gap-2 h-full w-[70%]">
        <div className="vl w-2 h-full border-l-2 border-white"></div>
        <div className="rounded-full w-8 h-8 bg-gray-100"></div>
        <Input
          className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
          type="text"
          variant="underlined"
          label="Reply to this comment..."
        />
      </div>
      <div className="flex gap-2 w-[30%]">
        <Button
          type="button"
          onClick={() => toggleReplyField(index)}
          className="bg-primary1 rounded scale-[0.9] px-3"
        >
          Cancel
        </Button>
        <Button className="bg-primary1 rounded scale-[0.9]">Reply</Button>
      </div>
    </div>
  );
};

export default PostReply;
