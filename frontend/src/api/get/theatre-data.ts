import { unstable_noStore as noStore } from 'next/cache';
import { TheatreTypes } from "@/types/theatre";
import axios from "axios";

export const fetchTheatre = async (movieId : string) => {
    noStore();
    try {
        const res = await axios.get<TheatreTypes[]>(`http://localhost:8000/api/alltheatre/${movieId}/`)
        if (res.status === 200) {
            return res.data;
        } else {
            return []
        }
    } catch (err) {
        console.error(err);
        return []
    }
}