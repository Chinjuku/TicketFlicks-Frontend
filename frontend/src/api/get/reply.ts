import { CountReplyTypes, ReplyTypes } from "@/types/reply"
import { tryCatchGetMethod } from "@/utils/api-helper"


export const fetchCountReplyAll = async () => {
    const data: CountReplyTypes[] = await tryCatchGetMethod("/countreply/", [])
    return data
} 

export const fetchReplyAll = async () => {
    const data: ReplyTypes[] = await tryCatchGetMethod(`/reply/`, [])
    return data
}

export const fetchReply = async (replyId: string) => {
    const data: ReplyTypes = await tryCatchGetMethod(`/reply/${replyId}/`, null)
    return data
}