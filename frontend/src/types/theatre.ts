export type Theatre = {
    id: string;
    theatre_num: number;
    show_time: Date;
    is_show: boolean;
}

export interface TheatreTypes {
    map(arg0: (data: Theatre) => import("react").JSX.Element): import("react").ReactNode;
    [key: number]: Theatre[]
}