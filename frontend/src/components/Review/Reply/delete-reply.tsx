import { Button } from "@nextui-org/button";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteReply } from "@/api/delete";
import { toast } from "react-hot-toast";
import { themeContext } from "@/context/themeContext";

export type GetProps = {
  replyId: string;
  movieId: string;
  index: number;
  showButton: (index: number) => void;
};

const DeleteReply = (props: GetProps) => {
  const { theme } = useContext(themeContext);
  const { replyId, movieId, index, showButton } = props;
  const handleDelete = async (replyId: string) => {
    await deleteReply(replyId, movieId);
    toast.success("Delete Post Successful!");
    showButton(index);
  };
  return (
    <>
      <Button
        onClick={() => handleDelete(replyId)}
        className={`flex justify-start bg-transparent rounded hover:bg-primary2 transition-all h-7 w-13 ${theme}`}
      >
        <AiFillDelete className="w-5 h-5 fill-white" />
        Delete
      </Button>
    </>
  );
};

export default DeleteReply;
