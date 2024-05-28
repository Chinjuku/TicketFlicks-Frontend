'use server'
import { tryCatchPostMethod } from '@/utils/api-helper';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { redirect } from 'next/navigation';

const reviewSchema = z.object({
  name: z.string().min(1, {message: "don't delete unknown if you no need to fill your name"}),
  stars: z.number({message: "add stars!"}).min(1).max(5),
  review_comment: z.string().min(1, {message: "addcomment!!"}),
  movie: z.string(),
});

export const createReview = async (formData: FormData, reviewId:string) => {
  const validatedFields = reviewSchema.safeParse({
    name: formData.get('name'),
    stars: parseInt(formData.get('stars') as string),
    review_comment: formData.get('review_comment'),
    movie: formData.get('movie'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Post',
    };
  }

  try {
    await tryCatchPostMethod("/review/", validatedFields.data);
  } catch (err) {
    return {
      message: 'Database Error: Failed to Create Review.',
    };
  }
  revalidatePath(`/review/${reviewId}`)
  redirect(`/review/${reviewId}`)
};
