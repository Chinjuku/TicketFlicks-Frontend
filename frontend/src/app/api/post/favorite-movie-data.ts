import axios from "axios"

export const createFavorite = async (id: string) => {
    try {
        const res = await axios.post(`http://localhost:8000/api/ip/fav/${id}/`)
        if (res.status === 200) return res.data

    } catch (err) {
        return false
    }
}