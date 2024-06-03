import { User } from "@/types/user";

export type CountReplyTypes = {
    review_id: string;
    count_reply: number;
}

export type ReplyTypes = {
    id: string;
    name: string
    review_id: string
    reply_comment: string
    time_stamp: Date
    user: User
}