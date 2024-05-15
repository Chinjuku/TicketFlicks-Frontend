import { unstable_noStore as noStore } from 'next/cache';
import axios from 'axios';
import { FavMovieTypes, MovieTypes } from '@/app/types/movie';

export const fetchAllMovies = async (): Promise<MovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<MovieTypes[]>("http://localhost:8000/api/movie/")
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const fetchOnShowMovie = async (): Promise<MovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<MovieTypes[]>("http://localhost:8000/api/movie/onshow/")
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const fetchCommingMovie = async (): Promise<MovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<MovieTypes[]>("http://localhost:8000/api/movie/comming/")
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const fetchRecommandMovie = async (): Promise<MovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<MovieTypes[]>("http://localhost:8000/api/movie/recommand/")
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const fetchTopFiveMovie = async (): Promise<MovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<MovieTypes[]>("http://localhost:8000/api/movie/topfive/")
        if (res.status === 200) {
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}

export const fetchFavoriteMovie = async (): Promise<FavMovieTypes[]> => {
    noStore();
    try {
        const res = await axios.get<FavMovieTypes[]>("http://localhost:8000/api/movie/fav/")
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return [];
        }
    } catch (err) {
        console.error(err);
        return [];
    }
}



