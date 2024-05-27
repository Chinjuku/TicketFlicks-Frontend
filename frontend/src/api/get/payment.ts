import axios from "axios"
import { unstable_noStore as noStore } from 'next/cache';

export const fetchPayment = async (paymentId : string) => {
    noStore()
    try {
        const res = await axios.get(`http://localhost:8000/api/payment/${paymentId}/`)
        if (res.status === 200) {
            return res.data
        } else {
            return []
        }
    } catch (err) {
        console.error(err)
        return []
    }
}
