import { SeatTypes } from "./seat"

export type savePaymentTypes = {
    amounts: number
    payment_id: string
    ticket_seats: string[] | undefined
    client_secret: string
    payment_method: string
}

export type StripeApperance = {
    theme : "stripe" | "night" | "flat" | undefined
    variables: {
        colorPrimary: string | undefined
    }
    rules: {
        [cssPropertyName: string]: {
            color: string;
        }
    }
}

export type PaymentTypes = {
    amounts: number
    payment_id: string
    seats: SeatTypes[] 
    client_secret: string
    payment_method: string
}