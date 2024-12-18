export type Review = {
    id?: number;
    score: number;
    comment: string;
    date: Date;
};
export type Product = {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
    reviews?: Review[];
};
