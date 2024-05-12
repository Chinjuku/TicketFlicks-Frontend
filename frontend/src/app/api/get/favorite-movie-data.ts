import { unstable_noStore as noStore } from 'next/cache';
import axios from "axios"

export const getFavorite = async (id: string) => {
    noStore();
    try {
        const res = await axios.get(`http://localhost:8000/api/ip/fav/${id}/`)
        if (res.status === 200) return res.data

    } catch (err) {
        return false
    }
}