"use client";

import { createReview } from "@/api/post/create-review";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import React, { FormEvent, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PostComment = (props: {
  movieId: string | undefined;
  reviewId: string;
}) => {
  const { movieId, reviewId } = props;
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const totalStars = 5;
  const checkId = movieId ? movieId : "";
  const [success, setSuccess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  React.useEffect(() => {
    if (success && formRef) {
      setRating(0);
      formRef.current?.reset();
      setSuccess(false)
    }
  }, [success, formRef]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const response = await createReview(formData, reviewId);

      if (response.errors) {
        return Object.values(response.errors).forEach((errorArray) => {
          errorArray.forEach((error) => {
            toast.error(error);
          });
        });
      }
      setSuccess(true);
      toast.success("Post comment successfully!");
    } catch (error) {
      // @ts-ignore
      toast.error("Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-secondary w-full h-[115px] max-h-[150px] p-2 rounded border-white border">
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form ref={formRef} onSubmit={onSubmit}>
        <input type="hidden" name="movie" value={checkId} />
        <div className="flex justify-between px-2.5 items-center">
          <div className="flex gap-2">
            <p>Name:</p>
            <input
              name="name"
              type="text"
              className="bg-transparent"
              defaultValue={"unknown"}
            />
          </div>

          <div className="flex gap-2 items-start">
            {[...Array(totalStars)].map((_, index) => {
              const currentRating: number = index + 1;

              return (
                <label key={index} className="w-[20px]">
                  <input
                    type="radio"
                    name="stars"
                    value={rating}
                    onChange={() => setRating(currentRating)}
                    className="hidden"
                  />
                  <span
                    className="star cursor-pointer text-[1.5rem]"
                    style={{
                      color:
                        currentRating <= (hover || rating)
                          ? "#ffc107"
                          : "#e4e5e9",
                    }}
                    onMouseEnter={() => setHover(currentRating)}
                    onMouseLeave={() => setHover(0)}
                  >
                    &#9733;
                  </span>
                </label>
              );
            })}
          </div>
        </div>
        <div className="flex items-center justify-between px-2.5">
          <div className="rounded-full w-8 h-8 bg-gray-100"></div>
          <Input
            name="review_comment"
            className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
            type="text"
            variant="underlined"
            label="Add a comment..."
          />
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-primary rounded scale-[0.9]"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;
