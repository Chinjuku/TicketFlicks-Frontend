import React, { FormEvent, useContext, useEffect, useState } from "react";
import { lato } from "@/app/ui/fonts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { MdModeEdit } from "react-icons/md";
import { themeContext } from "@/context/themeContext";
import { GetProps } from "@/components/Review/delete-review";
import { fetchReview } from "@/api/get/review";
import { updateReview } from "@/api/update/update-review";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateModal = (props: GetProps) => {
  const { theme } = useContext(themeContext);
  const { reviewId, movieId } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [review, setReview] = useState({
    name: "",
    review_comment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchReview(reviewId);
      setRating(res.stars);
      setReview({
        name: res.name,
        review_comment: res.review_comment,
      });
    };
    fetchData();
  }, [reviewId]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await updateReview(formData, reviewId, movieId);
      if (res.errors) {
        return Object.values(res.errors).forEach((errorArray) => {
          errorArray.forEach((error) => {
            toast.error(error);
          });
        });
      }
      toast.success("Update Post Successful!");
    } catch (err) {
      // @ts-expect-error
      toast.error("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
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
      <Button
        onPress={onOpen}
        className={`flex justify-start bg-transparent rounded hover:bg-primary2 transition-all h-7 w-13 ${theme}`}
      >
        <MdModeEdit className="w-4 h-4 fill-white" />
        Edit
      </Button>
      {reviewId && (
        <Modal
          isOpen={isOpen}
          size="2xl"
          placement="center"
          className={`text-white bg-primary ${theme}`}
          onOpenChange={onOpenChange}
          isDismissable={false}
          isKeyboardDismissDisabled={true}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Edit Post
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={handleSubmit}>
                    <input name="movie" type="hidden" value={movieId} />
                    <div className="flex justify-between px-2.5 items-center">
                      <div className="flex gap-2">
                        <p>Name:</p>
                        <input
                          name="name"
                          type="text"
                          className="bg-transparent"
                          defaultValue={review.name}
                        />
                      </div>

                      <div className="flex gap-2 items-start">
                        {[...Array(5)].map((_, index) => {
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
                    <div className="flex items-center gap-4 px-2.5">
                      <div className="rounded-full w-10 h-10 bg-gray-100"></div>
                      <Input
                        name="review_comment"
                        className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
                        type="text"
                        variant="underlined"
                        label="Add a comment..."
                        defaultValue={review.review_comment}
                      />
                    </div>
                    <div className="flex justify-end gap-3">
                      <Button color="danger" variant="light" onPress={onClose}>
                        Close
                      </Button>
                      <Button
                        onPress={onClose}
                          type="submit"
                        disabled={isLoading}
                        className="bg-secondary rounded scale-[0.9]"
                      >
                        {isLoading ? "Loading..." : "Submit"}
                      </Button>
                    </div>
                  </form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default UpdateModal;
