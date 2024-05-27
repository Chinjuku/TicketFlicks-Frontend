import { tryCatchGetDelayMethod, tryCatchGetMethod } from '@/utils/api-helper'
import { ReviewTypes } from "@/types/review";

// Review Data
export const fetchReviewData = async (id: string) => {
    const data: ReviewTypes[] = await tryCatchGetDelayMethod(`/allreview/${id}/`, [])
    return data
}

export const fetchReview = async (id: string) => {
    const data: ReviewTypes = await tryCatchGetMethod(`/review/${id}/`, null)
    return data
}

// Count Review Data
export const fetchCountReview = async () => {
    return await tryCatchGetDelayMethod("/countreview/", [])
}

export const fetchCountReviewById = async (movieId: string) => {
    return await tryCatchGetDelayMethod(`/countreview/${movieId}/`, 0)
}

