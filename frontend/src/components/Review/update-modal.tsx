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
import { fetchReview } from "@/api/get/review";
import { updateReview } from "@/api/update/update-review";
import { toast } from "react-hot-toast";

const UpdateModal = (props: {
  reviewId: string;
  index: number;
  showButton: (index: number) => void;
}) => {
  const { theme } = useContext(themeContext);
  const { reviewId, index, showButton } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [review, setReview] = useState({
    name: "",
    review_comment: "",
    movieId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchReview(reviewId);
      setRating(res.stars);
      setReview({
        name: res.name,
        review_comment: res.review_comment,
        movieId: res.movie.id,
      });
    };
    fetchData();
  }, [reviewId]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await updateReview(formData, reviewId, review.movieId);
      if (res.errors) {
        Object.values(res.errors).forEach((errorArray) => {
          errorArray.forEach((error) => {
            toast.error(error);
          });
        });
        return;
      }
      showButton(index);
      toast.success("Update Post Successful!");
    } catch (err) {
      // @ts-expect-error
      toast.error("Error: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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
          className={`text-white bg-primary ${theme} ${lato.className}`}
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
                  <form onSubmit={onSubmit}>
                    <input
                      name="movie"
                      type="hidden"
                      defaultValue={review.movieId}
                    />
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

// "use client";
// import React, { FormEvent, useContext, useEffect, useState } from "react";
// import { Input } from "@nextui-org/input";
// import { Button } from "@nextui-org/button";
// import { MdModeEdit } from "react-icons/md";
// import { themeContext } from "@/context/themeContext";
// import { updateReview } from "@/api/update/update-review";
// import { toast } from "react-toastify";
// import { ReviewTypes } from "@/types/review";
// import { useRouter } from "next/navigation";

// const UpdateModal = (props: { reviewId: string; res: ReviewTypes }) => {
//   const router = useRouter();
//   const { theme } = useContext(themeContext);
//   const { reviewId, res } = props;
//   const [rating, setRating] = useState<number>(res.stars);
//   const [hover, setHover] = useState<number>(0);
//   const [isLoading, setIsLoading] = useState<boolean>(false);

//   const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     try {
//       const formData = new FormData(e.currentTarget);
//       const response = await updateReview(formData, reviewId, res.movie.id);
//       if (response.errors) {
//         return Object.values(response.errors).forEach((errorArray) => {
//           errorArray.forEach((error) => {
//             toast.error(error);
//           });
//         });
//       }
//       toast.success("Update Post Successful!");
//     } catch (err) {
//       // @ts-expect-error
//       toast.error("Error: " + err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div
//       className={`text-white bg-primary ${theme} w-[700px] h-[260px] mb-10 rounded-xl p-6`}
//     >
//       <h1 className="my-3 text-3xl font-extrabold">Edit Post</h1>
//       <form onSubmit={onSubmit}>
//         <input name="movie" type="hidden" defaultValue={res.movie.id} />
//         <div className="flex justify-between px-2.5 items-center">
//           <div className="flex gap-2">
//             <p>Name:</p>
//             <input
//               name="name"
//               type="text"
//               className="bg-transparent"
//               defaultValue={res.name}
//             />
//           </div>

//           <div className="flex gap-2 items-start">
//             {[...Array(5)].map((_, index) => {
//               const currentRating: number = index + 1;

//               return (
//                 <label key={index} className="w-[20px]">
//                   <input
//                     type="radio"
//                     name="stars"
//                     value={rating}
//                     onChange={() => setRating(currentRating)}
//                     className="hidden"
//                   />
//                   <span
//                     className="star cursor-pointer text-[1.5rem]"
//                     style={{
//                       color:
//                         currentRating <= (hover || rating)
//                           ? "#ffc107"
//                           : "#e4e5e9",
//                     }}
//                     onMouseEnter={() => setHover(currentRating)}
//                     onMouseLeave={() => setHover(0)}
//                   >
//                     &#9733;
//                   </span>
//                 </label>
//               );
//             })}
//           </div>
//         </div>
//         <div className="flex items-center gap-4 px-2.5">
//           <div className="rounded-full w-10 h-10 bg-gray-100"></div>
//           <Input
//             name="review_comment"
//             className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
//             type="text"
//             variant="underlined"
//             label="Add a comment..."
//             defaultValue={res.review_comment}
//           />
//         </div>
//         <div className="flex justify-end gap-3">
//           <Button onClick={() => router.back()} color="danger" variant="light">
//             Close
//           </Button>
//           <Button
//             type="submit"
//             disabled={isLoading}
//             className="bg-secondary rounded scale-[0.9]"
//           >
//             {isLoading ? "Loading..." : "Submit"}
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UpdateModal;
