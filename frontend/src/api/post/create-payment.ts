import { savePaymentTypes } from '@/types/payment';
import axios from 'axios';

export const savePayment = async (savePaymentData : savePaymentTypes) => {
    try {
        const res = await axios.post(`http://localhost:8000/api/payment/`, savePaymentData)
        if (res.status === 200) {
            return res.data
        }
    } catch (err) {
        console.error(err)
    }
}