import { unstable_noStore as noStore } from 'next/cache';
import { MovieTypes } from "@/types/movie";
import axios from "axios";
import { redirect } from "next/navigation";

export const fetchSelectMovie = async (id: string) => {
    noStore();
    try {
        const res = await axios.get<MovieTypes>(`http://localhost:8000/api/movie/${id}/`);
        if (res.status === 200) {
            await new Promise((resolve) => setTimeout(resolve, 1000));
            return res.data;
        } else {
            return null
        }
    } catch (err) {
        console.error(err);
        return null
    }
}
