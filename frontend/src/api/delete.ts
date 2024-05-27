"use server"
import { tryCatchDeleteMethod } from "@/utils/api-helper";
import { revalidatePath } from "next/cache";

export const deleteReview = async (reviewId: string, movieId: string) => {
    const res = await tryCatchDeleteMethod(`/changereview/${reviewId}/`)
    if (res) {
        revalidatePath(`/review/${movieId}`)
        return res.message
    } else {
        return "error"
    }
}