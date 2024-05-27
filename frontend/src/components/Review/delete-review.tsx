import { Button } from "@nextui-org/button";
import React, { useContext, useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { deleteReview } from "@/api/delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { themeContext } from "@/context/themeContext";
import UpdateModal from "@/components/Review/update-modal";

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
    const res = await deleteReview(reviewId, movieId);
    if (res === "error") {
      throw new Error("Cannot delete Post!");
    }
    toast.success("Delete Post Successful!");
    showButton(index);
  };
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnHover
      />
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
