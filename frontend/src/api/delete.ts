"use server"
import { tryCatchDeleteMethod } from "@/utils/api-helper";
import { revalidatePath } from "next/cache";

export const deleteReview = async (reviewId: string, movieId: string) => {
    const res = await tryCatchDeleteMethod(`/changereview/${reviewId}/`)
    if (res) {
        return revalidatePath(`/review/${movieId}`)
    } else {
        throw new Error(`Could not delete`)
    }
}

export const deleteReply = async (replyId: string, movieId: string) => {
    const res = await tryCatchDeleteMethod(`/changereply/${replyId}/`)
    if (res) {
        return revalidatePath(`/reply/${movieId}`)
    } else {
        throw new Error(`Could not delete`)
    }
}