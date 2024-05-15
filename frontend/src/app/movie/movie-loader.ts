import { fetchAllMovies, fetchCommingMovie, fetchFavoriteMovie, fetchOnShowMovie, fetchRecommandMovie } from "@/app/api/get/movie-data";

// suspense-fetcher.ts
const cache = new Map();

export function wrapPromise(promise: Promise<any>) {
    let status = "pending";
    let result: any;
    const suspender = promise.then(
        (res) => {
            status = "success";
            result = res;
        },
        (err) => {
            status = "error";
            result = err;
        }
    );
    return {
        read() {
            if (status === "pending") {
                throw suspender;
            } else if (status === "error") {
                throw result;
            } else if (status === "success") {
                return result;
            }
        }
    };
}

export function fetchMovieData(type: string) {
    if (!cache.has(type)) {
        const promise = (async () => {
            switch (type) {
                case "NOW SHOWING":
                    return await fetchOnShowMovie();
                case "COMMING SOON":
                    return await fetchCommingMovie();
                case "RECCOMMANDED":
                    return await fetchRecommandMovie();
                case "FAVORITE":
                    return await fetchFavoriteMovie().then(favMovies => favMovies.map(m => m.movieId));
                case "ALL MOVIES":
                default:
                    return await fetchAllMovies();
            }
        })();
        const wrappedPromise = wrapPromise(promise);
        cache.set(type, wrappedPromise);
    }
    return cache.get(type);
}
