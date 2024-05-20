import { unstable_noStore as noStore} from 'next/cache'
import axios from 'axios';
import { SeatTypes } from '@/types/seat';

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