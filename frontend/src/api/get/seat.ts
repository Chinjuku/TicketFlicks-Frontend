import { unstable_noStore as noStore} from 'next/cache'
import axios from 'axios';
import { SeatPriceTypes, SeatTypes } from '@/types/seat';

export const fetchSeat = async (theatreId : string | undefined) => {
    noStore()
    try {
        const res = await axios.get<SeatTypes[]>(`http://localhost:8000/api/place/${theatreId}/`)
        if (res.status === 200) {
            return res.data
        } else {
            return []
        }
    } catch (err) {
        return []
    }
}

export const fetchPriceSeat = async (seatArray : string[]) => {
    noStore()
    try {
        const data = {
            "seats" : seatArray
        }
        const res = await axios.post<SeatPriceTypes>(`http://localhost:8000/api/place/select_seat/`, data)
        if (res.status === 200) {
            return res.data
        } else {
            return null
        }
    } catch (err) {
        return null
    }
}