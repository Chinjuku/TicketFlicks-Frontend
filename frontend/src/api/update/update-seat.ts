import axios from "axios"

export const setIdleSeat = async (seats: string[] | undefined) => {
    try {
        const res = await axios.put('http://localhost:8000/api/place/update_seat/', {
            seats: seats
        })
        if (res.status === 200) {
            return res.data
        }
    } catch (error) {
        console.error("error")
    }
}