import { MovieTypes } from "@/types/movie";
import { User } from "@/types/user";

export type CountReviewTypes = {
    movie: string;
    count_review: number;
}

export type ReviewTypes = {
    id: string;
    name: string;
    review_comment: string;
    stars: number;
    movie: MovieTypes;
    time_stamp: Date
    user: User
}

export type CreateReviewTypes = {
    name: string;
    review_comment: string;
    stars: number;
    movie: MovieTypes;
}