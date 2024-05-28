import { Button } from "@nextui-org/button";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteReview } from "@/api/delete";
import { toast } from "react-hot-toast";
import { themeContext } from "@/context/themeContext";

export type GetProps = {
  reviewId: string;
  movieId: string;
  index: number;
  showButton: (index: number) => void;
};

const DeleteReview = (props: GetProps) => {
  const { theme } = useContext(themeContext);
  const { reviewId, movieId, index, showButton } = props;
  const handleDelete = async (reviewId: string) => {
    await deleteReview(reviewId, movieId);
    toast.success("Delete Post Successful!");
    showButton(index);
  };
  return (
    <>
      <Button
        onClick={() => handleDelete(reviewId)}
        className={`flex justify-start bg-transparent rounded hover:bg-primary2 transition-all h-7 w-13 ${theme}`}
      >
        <AiFillDelete className="w-5 h-5 fill-white" />
        Delete
      </Button>
    </>
  );
};

export default DeleteReview;
