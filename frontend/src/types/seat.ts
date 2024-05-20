import { Theatre } from "@/types/theatre"

export type SeatTypes = {
    id: string
    seat_num: string
    type: "normal" | "vip"
    isIdle: boolean
    theatre: Theatre
}