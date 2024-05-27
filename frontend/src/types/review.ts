import { MovieTypes } from "./movie";

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
}

export type CreateReviewTypes = {
    name: string;
    review_comment: string;
    stars: number;
    movie: MovieTypes;
}