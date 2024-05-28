'use server'
import { tryCatchPostMethod } from '@/utils/api-helper'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const formSchema = z.object({
    name: z.string().min(1, {message: 'Field your name!'}),
    reply_comment: z.string().min(1, {message: 'Reply before submit'}),
    review_id: z.string()
})

export const createReply = async (formData: FormData, reviewId: string, movieId: string) => {
    const validateFields = formSchema.safeParse({
        name: formData.get('name') as string,
        reply_comment: formData.get('reply_comment') as string,
        review_id: reviewId,
    })

    if (!validateFields.success) {
        return {
            errors: validateFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to Create Post',
        }
    }
    try {
        await tryCatchPostMethod(`/reply/`, validateFields.data);
      } catch (err) {
        return {
            errors: "Database Error!",
            message: 'Database Error: Failed to Create Review.',
        };
      }
      revalidatePath(`/review/${movieId}`)
      redirect(`/review/${movieId}`)
}