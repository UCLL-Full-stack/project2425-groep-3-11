import { Review } from './review';
import { Product as ProductPrisma, Review as ReviewPrisma } from '@prisma/client';

export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private description: string;
    private stock: number;
    // private reviews: Review[];

    constructor(product: {
        id?: number;
        name: string;
        price: number;
        description: string;
        stock: number;
        // reviews: Review[];
    }) {
        this.validate(product);
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock;
        // this.reviews = product.reviews;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStock(): number {
        return this.stock;
    }
    // public getReviews(): Review[] {
    //     return this.reviews;
    // }
    validate(product: {
        name: string;
        price: number;
        description: string;
        stock: number;
        // reviews: Review[];
    }) {
        if (!product.name?.trim()) {
            throw new Error('Name is required');
        }
        if (!product.price) {
            throw new Error('Price is required');
        }
        if (!product.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!product.stock) {
            throw new Error('Stock is required');
        }
    }
    equals(product: Product): boolean {
        return (
            this.id === product.getId() &&
            this.name === product.getName() &&
            this.price === product.getPrice() &&
            this.description === product.getDescription() &&
            this.stock === product.getStock()
            // this.reviews === product.getReviews()
        );
    }
    // addReviewToProduct(review: Review) {
    //     this.reviews.push(review);
    // }
    static from({ id, name, price, description, stock }: ProductPrisma) {
        return new Product({
            id,
            name,
            price,
            description,
            stock,
            // reviews,
        });
    }
}
