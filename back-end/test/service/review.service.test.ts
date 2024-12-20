import { Review } from '../../model/review'; // Adjust the import according to your project structure
import reviewService from '../../service/review.service';
import reviewDb from '../../repository/review.db';
import productDb from '../../repository/product.db';
import { UserInput, ProductInput } from '../../types';
import { User } from '../../model/user';
import { Product } from '../../model/product';

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
const validReviewInput = {
    id: 123,
    score: 4.5,
    comment: 'Great product!',
    date: new Date(),
    user: user,
    product: product,
};

const validProductId = 1;
const invalidProductId = 999;
const userId = user.getId();
const review = new Review(validReviewInput);

let createReviewMock: jest.Mock;
let mockProductDbGetProductById: jest.Mock;
let mockReviewDbCreateReviewForProduct: jest.Mock;

beforeEach(() => {
    createReviewMock = jest.fn();
    mockProductDbGetProductById = jest.fn();
    mockReviewDbCreateReviewForProduct = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given an invalid product ID, when creating a review, then an error is thrown', async () => {
    // given
    mockProductDbGetProductById.mockReturnValue(Promise.resolve(null));
    productDb.getProductById = mockProductDbGetProductById;

    // when
    const createReview = async () => {
        if (userId) {
            await reviewService.createReviewForProduct(invalidProductId, review, userId);
        }
    };
    // then
    await expect(createReview()).rejects.toThrow('Product not found');
});
test('given a valid product ID and review, when review is created, then the review is added to the product', async () => {
    // given
    mockProductDbGetProductById.mockReturnValue(
        Promise.resolve({ id: validProductId, name: 'Test Product' })
    );
    productDb.getProductById = mockProductDbGetProductById;

    mockReviewDbCreateReviewForProduct.mockReturnValue(Promise.resolve(review));
    reviewDb.createReviewForProduct = mockReviewDbCreateReviewForProduct;

    // when
    const createdReview = await reviewService.createReviewForProduct(
        validProductId,
        review,
        userId as number
    );

    // then
    expect(mockReviewDbCreateReviewForProduct).toHaveBeenCalledWith(validProductId, review, userId);
    expect(createdReview).toEqual(review);
});
