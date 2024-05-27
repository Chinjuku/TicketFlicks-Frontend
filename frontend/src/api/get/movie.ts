import { FavMovieTypes, MovieTypes } from '@/types/movie';
import { tryCatchGetDelayMethod, tryCatchGetMethod } from '@/utils/api-helper';
import { unstable_noStore as noStore } from 'next/cache';

export const fetchAllMovies = async (): Promise<MovieTypes[]> => {
    const data: MovieTypes[] = await tryCatchGetDelayMethod(`/movie/`, [])
    return data;
}

export const fetchOnShowMovie = async (): Promise<MovieTypes[]> => {
    const data: MovieTypes[] = await tryCatchGetDelayMethod(`/movie/onshow/`, [])
    return data;
}

export const fetchCommingMovie = async (): Promise<MovieTypes[]> => {
    const data: MovieTypes[] = await tryCatchGetDelayMethod(`/movie/comming/`, [])
    return data;
}

export const fetchRecommandMovie = async (): Promise<MovieTypes[]> => {
    const data: MovieTypes[] = await tryCatchGetDelayMethod(`/movie/recommand/`, [])
    return data;
}

export const fetchTopFiveMovie = async (): Promise<MovieTypes[]> => {
    const data: MovieTypes[] = await tryCatchGetDelayMethod(`/movie/topfive/`, [])
    return data;
}

export const fetchFavoriteMovie = async (): Promise<FavMovieTypes[]> => {
    const data: FavMovieTypes[] = await tryCatchGetDelayMethod(`/movie/fav/`, [])
    return data;
}

export const fetchSelectMovie = async (id: string) => {
    noStore();
    const data: MovieTypes | null = await tryCatchGetMethod(`/movie/${id}/`, null)
    return data;
}

export const getFavorite = async (id: string) => {
    noStore();
    const data: boolean = await tryCatchGetMethod(`/ip/fav/${id}/`, null)
    return data;
}



