import React, { FormEvent, useContext, useEffect, useState } from "react";
import { lato } from "@/app/ui/fonts";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { MdModeEdit } from "react-icons/md";
import { themeContext } from "@/context/themeContext";
import { toast } from "react-hot-toast";
import { fetchReply } from "@/api/get/reply";
import { updateReply } from "@/api/update/update-reply";

const UpdateReplyModal = (props: {
  replyId: string;
  index: number;
  movieId: string;
  showButton: (index: number) => void;
}) => {
  const { theme } = useContext(themeContext);
  const { replyId, movieId, index, showButton } = props;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reply, setReply] = useState({
    name: "",
    reply_comment: "",
    review_id: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchReply(replyId);
      if (!res) throw new Error(`Error fetching reply`)
      setReply({
        name: res.name,
        reply_comment: res.reply_comment,
        review_id: res.review_id
      });
    };
    fetchData();
  }, [replyId]);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData(e.currentTarget);
      const res = await updateReply(formData, replyId, movieId);
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
      {replyId && (
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
                  Edit Reply
                </ModalHeader>
                <ModalBody>
                  <form onSubmit={onSubmit}>
                    <div className="flex justify-between px-2.5 items-center">
                      <div className="flex gap-2">
                        <p>Name:</p>
                        <input
                          name="name"
                          type="text"
                          className="bg-transparent"
                          defaultValue={reply.name}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-4 px-2.5">
                      <div className="rounded-full w-10 h-10 bg-gray-100"></div>
                      <Input
                        name="reply_comment"
                        className="w-[70%] mb-5 bg-transparent dark:bg-transparent text-black"
                        type="text"
                        variant="underlined"
                        label="Add a comment..."
                        defaultValue={reply.reply_comment}
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

export default UpdateReplyModal;