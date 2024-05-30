'use server'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { djangoHost } from '@/utils/api-helper';

const updateReviewSchema = z.object({
    id: z.string(),
    name: z.string().min(1, { message: "Please enter your name." }),
    review_comment: z.string().min(1, { message: "Please fill in your comment." }),
    stars: z.number().min(1).max(5),
    movie: z.string()
});

const UpdateReview = updateReviewSchema.omit({ id: true });

export const updateReview = async (formData: FormData, reviewId: string, movieId: string) => {
    const validatedFields = UpdateReview.safeParse({
        name: formData.get('name') as string,
        review_comment: formData.get('review_comment') as string,
        stars: parseInt(formData.get('stars') as string),
        movie: formData.get('movie') as string
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update review.',
        };
    }

    try {
        console.log(validatedFields, reviewId)
        await axios.put(djangoHost(`/changereview/${reviewId}/`), validatedFields.data);
        revalidatePath(`/review/${movieId}`);
        return { message: 'Success' };
    } catch (err) {
        return {
            message: 'Database Error: Failed to update review.',
        };
    }
};
