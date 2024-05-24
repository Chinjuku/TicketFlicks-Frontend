import axios from 'axios'

export const fetchCountReview = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/countreview/")
        if (res.status === 200) {
            return res.data
        } else {
            return []
        }
    } catch (err) {
        return []
    }
}