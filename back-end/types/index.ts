type UserInput = {
    id?: number;
    username: string;
    email: string;
    password: string;
    role: Role;
};

type ReviewInput = {
    id?: number;
    score: number;
    comment: string;
};

type ProductInput = {
    id?: number;
    name: string;
    price: number;
    description: string;
    stock: number;
};

type ShoppingCartInput = {
    id?: number;
    products: ProductInput[];
    totalPrice: number;
};
// TODO: Add role to authentication response
type AuthenticationResponse = {
    token: string;
    username: string;
    role: string;
};
type Role = 'admin' | 'student' | 'lecturer' | 'guest';

export { UserInput, ReviewInput, ProductInput, ShoppingCartInput, Role, AuthenticationResponse };
