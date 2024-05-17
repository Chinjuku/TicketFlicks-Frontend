import { fetchSelectMovie } from "@/app/api/get/select-movie";
import { MovieTypes } from "@/app/types/movie";

const cache = new Map<string, ReturnType<typeof wrapPromise>>();

export function wrapPromise(promise: Promise<MovieTypes | null>) {
    let status = "pending";
    let result: MovieTypes | null;
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

export function selectMovieData(id: string) {
    if (!cache.has(id)) {
        const promise = fetchSelectMovie(id);
        const wrappedPromise = wrapPromise(promise);
        cache.set(id, wrappedPromise);
    }
    return cache.get(id);
}
