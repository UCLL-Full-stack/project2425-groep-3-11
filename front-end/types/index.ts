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
    quantity: number;
    reviews?: Review[];
};

export type User = {
    id?: number;
    username?: string;
    password?: string;
    email?: string;
    role?: string;
};

export type ShoppingCart = {
    id?: number;
    products?: Product[];
    totalPrice?: number;
};
