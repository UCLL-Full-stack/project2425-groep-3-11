import { Product } from '../../model/product';
import { Review } from '../../model/review';
import { User } from '../../model/user';
import { UserInput, ProductInput } from '../../types';

const userInput: UserInput = {
    id: 1,
    username: 'John',
    password: 'johnpassword',
    email: 'john@gmail.com',
    role: 'user',
};
const user = new User({
    ...userInput,
});
const productInput: ProductInput = {
    id: 1,
    name: 'Test Product',
    price: 100,
    description: 'Test Description',
    stock: 10,
    quantity: 1,
};

const product = new Product({
    ...productInput,
});

const validDate = new Date('2021-01-01T00:00:00.000Z');

test('given: valid values for review, when: review is created, then: review is created', () => {
    //given

    //when
    const review = new Review({
        id: 1,
        score: 5,
        comment: 'good',
        date: validDate,
        user: user,
        product: product,
    });
    //then
    expect(review.getId()).toBe(1);
    expect(review.getScore()).toBe(5);
    expect(review.getComment()).toBe('good');
    expect(review.getDate()).toBe(validDate);
});

test('given: invalid score, when: review is created, then: throw error', () => {
    //given

    //when
    const review = () =>
        new Review({ score: 0, comment: 'good', date: validDate, user: user, product: product });
    //then
    expect(review).toThrow('Score is required');
});

test('given: invalid comment, when: review is created, then: throw error', () => {
    //given

    //when
    const review = () =>
        new Review({ id: 1, score: 5, comment: '', date: validDate, user: user, product: product });
    //then
    expect(review).toThrow('Comment is required');
});
