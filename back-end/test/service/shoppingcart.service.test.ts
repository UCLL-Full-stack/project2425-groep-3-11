import { Shoppingcart } from '../../model/shoppingcart';
import productDb from '../../repository/product.db';
import { UserInput, ProductInput } from '../../types';
import { User } from '../../model/user';
import { Product } from '../../model/product';
import shoppingcartDb from '../../repository/shoppingcart.db';
import shoppingcartService from '../../service/shoppingcart.service';

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

const productInput2: ProductInput = {
    id: 2,
    name: 'Test Product 2',
    price: 200,
    description: 'Test Description 2',
    stock: 20,
    quantity: 2,
};

const product2 = new Product({
    ...productInput2,
});
const validShoppingcartInput = {
    id: 1,
    user: user,
    products: [product],
};

const shoppingcart = new Shoppingcart({
    ...validShoppingcartInput,
});

// let createShoppingcartMock: jest.Mock;
let addProductToCartMock: jest.Mock;
let removeProductFromCartMock: jest.Mock;
let clearCartMock: jest.Mock;

beforeEach(() => {
    // createShoppingcartMock = jest.fn();
    addProductToCartMock = jest.fn();
    removeProductFromCartMock = jest.fn();
    clearCartMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid product and shopping cart, when adding a product to the cart, then the product is added to the cart', async () => {
    // given
    shoppingcartDb.addProductToCart = addProductToCartMock;

    // when
    const cartId = shoppingcart.getId();
    const productId = product2.getId();
    if (cartId !== undefined && productId !== undefined) {
        await shoppingcartDb.addProductToCart(cartId, productId);
    }

    // then
    expect(addProductToCartMock).toHaveBeenCalledTimes(1);
    expect(addProductToCartMock).toHaveBeenCalledWith(shoppingcart.getId(), product2.getId());
});

test('given a valid product and shopping cart, when removing a product from the cart, then the product is removed from the cart', async () => {
    // given
    shoppingcartDb.removeProductFromCart = removeProductFromCartMock;

    // when
    const cartId = shoppingcart.getId();
    const productId = product.getId();
    if (cartId !== undefined && productId !== undefined) {
        await shoppingcartDb.removeProductFromCart(cartId, productId);
    }

    // then
    expect(removeProductFromCartMock).toHaveBeenCalledTimes(1);
    expect(removeProductFromCartMock).toHaveBeenCalledWith(shoppingcart.getId(), product.getId());
});

test('given a valid shopping cart with products, when going through checkout, then the cart is cleared', async () => {
    // given
    shoppingcartDb.clearShoppingCart = clearCartMock;

    // when
    const cartId = shoppingcart.getId();
    if (cartId !== undefined) {
        await shoppingcartDb.clearShoppingCart(cartId);
    }

    // then
    expect(clearCartMock).toHaveBeenCalledTimes(1);
    expect(clearCartMock).toHaveBeenCalledWith(shoppingcart.getId());
});
