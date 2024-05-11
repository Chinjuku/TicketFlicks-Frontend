import { TheatreTypes } from "@/app/types/theatre";

export interface MovieTypes {
    id: string;
    movie_name: string;
    movie_img: string; // Assuming the movie_img field stores the URL of the movie image
    movie_description: string;
    price: number;
    showing_date: Date; // Assuming the showing_date field is stored as a string in ISO format
    show_time_mins: number;
    rating: number;
    actors: ActorTypes[]; // Assuming Actor is a separate export interface representing actors
    categories: CategoryTypes[]; // Assuming Category is a separate export interface representing categories
    showing_due: Date; // Assuming the showing_due field is stored as a string in ISO format
    theatre: TheatreTypes[]; // Assuming Theatre is a separate export interface representing theatres
}

export interface ActorTypes {
    id: string;
    actor_name: string;
    actor_img: string;
}

export interface CategoryTypes {
    category_name: string;
}