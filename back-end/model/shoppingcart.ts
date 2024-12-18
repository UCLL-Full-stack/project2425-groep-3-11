import { Product } from './product';
import {
    User as UserPrisma,
    ShoppingCart as ShoppingcartPrisma,
    Product as ProductPrisma,
} from '@prisma/client';

export class Shoppingcart {
    private id?: number;
    private products: Product[];
    private totalPrice: number;

    constructor(shoppingcart: { id?: number; products: Product[]; totalPrice?: number }) {
        this.id = shoppingcart.id;
        this.products = shoppingcart.products;
        this.totalPrice = shoppingcart.totalPrice || this.calculateTotalPrice();
    }

    public addProductToCart(product: Product): void {
        this.products.push(product);
        this.totalPrice = this.calculateTotalPrice();
    }

    public removeProductFromCart(product: Product): void {
        this.products = this.products.filter((p) => !p.equals(product));
        this.totalPrice = this.calculateTotalPrice();
    }

    public calculateTotalPrice(): number {
        return this.products.reduce((sum, product) => sum + product.getPrice(), 0);
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public getId(): number | undefined {
        return this.id;
    }

    equals(shoppingcart: Shoppingcart): boolean {
        return (
            this.id === shoppingcart.getId() &&
            JSON.stringify(this.products) === JSON.stringify(shoppingcart.getProducts()) &&
            this.totalPrice === shoppingcart.getTotalPrice()
        );
    }

    static from({
        id,
        products,
    }: ShoppingcartPrisma & { products: ProductPrisma[] }): Shoppingcart {
        return new Shoppingcart({
            id,
            products: products.map(Product.from),
            totalPrice: products.reduce(
                (sum: number, product: ProductPrisma) => sum + product.price,
                0
            ),
        });
    }
}
