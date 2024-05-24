import axios from 'axios'

export const fetchReviewData = async (id: string) => {
    try {
        const res = await axios.get(`http://localhost:8000/review/${id}`)
        if (res.status === 200) {
            return res.data
        } else {
            return []
        }
    } catch (err) {
        return []
    }
}