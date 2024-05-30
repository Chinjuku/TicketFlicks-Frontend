'use server'
import axios from 'axios';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { djangoHost } from '@/utils/api-helper';

const updateReplySchema = z.object({
    name: z.string().min(1, { message: "Please enter your name." }),
    reply_comment: z.string().min(1, { message: "Please fill in your comment." }),
});

export const updateReply = async (formData: FormData, replyId: string, movieId: string) => {
    const validatedFields = updateReplySchema.safeParse({
        name: formData.get('name') as string,
        reply_comment: formData.get('reply_comment') as string,
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to update reply.',
        };
    }

    try {
        // console.log(validatedFields, replyId)
        await axios.put(djangoHost(`/changereply/${replyId}/`), validatedFields.data);
        revalidatePath(`/review/${movieId}`);
        return { message: 'Success' };
    } catch (err) {
        return {
            message: 'Database Error: Failed to update reply.',
        };
    }
};