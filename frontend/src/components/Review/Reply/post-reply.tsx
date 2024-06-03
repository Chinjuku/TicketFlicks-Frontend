import { createReply } from "@/api/post/create-reply";
import Loading from "@/app/ui/Loading/loading-overlay";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import clsx from "clsx";
import React, { FormEvent } from "react";
import toast from "react-hot-toast";
import { useUser } from "@/context/userContext";

type ReplyProps = {
  reviewId: string;
  movieId: string;
  index: number;
  toggleReplyField: (index: number) => void;
};

const PostReply = (props: ReplyProps) => {
  const { user } = useUser()
  const { reviewId, index, toggleReplyField, movieId } = props
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsLoading(true)
    try {
      const formData = new FormData(event.currentTarget)
      const response = await createReply(formData, reviewId, movieId)
      if (response && response.errors) {
        return Object.values(response.errors).forEach((errorArray) => {
          errorArray.forEach((error: string) => {
            toast.error(error);
          });
        });
      }
      toast.success("Create Reply Successfully!")
    } catch (error)  {
      console.error(error)
      toast.error((error as Error).message)
    } finally {
      setIsLoading(false)
    }
  }
  if (isLoading) return <Loading />
  return (
    <form
      onSubmit={handleSubmit}
      className={clsx(
        "w-full h-[60px] transition-all flex items-center justify-center pl-3"
      )}
    >
      <div className="flex items-center gap-2 h-full w-[70%]">
        <div className="opacity-70 w-2 h-full border-l-2 border-white"></div>
        <div className="rounded-full w-8 h-8 bg-gray-100"></div>
        <input type="hidden" name="user" value={user?.id} />
        <input name="name" type="hidden" value="unknown" />
        <Input
          className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
          type="text"
          name="reply_comment"
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
        <Button type="submit" className="bg-primary1 rounded scale-[0.9]">Reply</Button>
      </div>
    </form>
  );
};

export default PostReply;
