"use client"
import { SeatTypes } from "@/types/seat";
import React, { createContext, useState, ReactNode, useEffect } from "react";

interface SeatContextProps {
    seat: SeatTypes[] | undefined;
    setSeat: React.Dispatch<React.SetStateAction<SeatTypes[] | undefined>>;
    price: number | undefined;
    setPrice: React.Dispatch<React.SetStateAction<number | undefined>>;
}

export const seatContext = createContext<SeatContextProps>({
    seat: [],
    setSeat: () => {},
    price: 0,
    setPrice: () => {}
});

interface SeatProviderProps {
    children: ReactNode;
}

export const SeatProvider: React.FC<SeatProviderProps> = ({ children }) => {
    const [seat, setSeat] = useState<SeatTypes[] | undefined>([]);
    const [price, setPrice] = useState<number | undefined>(0);
    // useEffect(() => {
    //     console.log(seat)
    //     console.log(price)
    // }, [seat, price])
    return (
        <seatContext.Provider value={{ seat, setSeat, price, setPrice }}>
            {children}
        </seatContext.Provider>
    );
};
