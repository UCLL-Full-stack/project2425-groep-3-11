import { Product } from './product';
import { User } from './user';
import {
    Product as ProductPrisma,
    Review as ReviewPrisma,
    User as UserPrisma,
} from '@prisma/client';

export class Review {
    private id?: number;
    private score: number;
    private comment: string;
    private date: Date;
    private user: User;
    private product: Product;

    constructor(review: {
        id?: number;
        score: number;
        comment: string;
        date: Date;
        user: User;
        product: Product;
    }) {
        this.validate(review);
        this.id = review.id;
        this.score = review.score;
        this.comment = review.comment;
        this.date = review.date;
        this.product = review.product;
        this.user = review.user;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getScore(): number {
        return this.score;
    }

    public getComment(): string {
        return this.comment;
    }

    public getDate(): Date {
        return this.date;
    }

    public getUser(): User {
        return this.user;
    }

    public getProduct(): Product {
        return this.product;
    }
    validate(review: { score: number; comment: string; date: Date }) {
        if (!review.score) {
            throw new Error('Score is required');
        }
        if (!review.comment?.trim()) {
            throw new Error('Comment is required');
        }
        if (!review.date) {
            throw new Error('Date is required');
        }
    }
    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.score === review.getScore() &&
            this.comment === review.getComment() &&
            this.date === review.getDate()
        );
    }
    static from({
        id,
        score,
        comment,
        date,
        user,
        product,
    }: ReviewPrisma & { user: UserPrisma; product: ProductPrisma }) {
        return new Review({
            id,
            score,
            comment,
            date,
            user: User.from(user),
            product: Product.from(product),
        });
    }
}
