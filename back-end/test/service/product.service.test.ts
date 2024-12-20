import { Product } from '../../model/product'; // Adjust the import as per your structure
import productDb from '../../repository/product.db';
import productService from '../../service/product.service';
import { ProductInput } from '../../types';

const product = new Product({
    id: 123,
    name: 'product1',
    price: 10,
    description: 'description1',
    stock: 10,
    // reviews: [],
});

let createProductMock: jest.Mock;
let mockProductDbGetProductById: jest.Mock;
let mockProductDbCreateProduct: jest.Mock;

beforeEach(() => {
    mockProductDbGetProductById = jest.fn();
    mockProductDbCreateProduct = jest.fn();
    createProductMock = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid product, when product is created, then product is created with those values', () => {
    // given
    productDb.createProduct = mockProductDbCreateProduct;

    // when
    productService.createProduct(product);

    // then
    expect(mockProductDbCreateProduct).toHaveBeenCalledTimes(1);
    expect(mockProductDbCreateProduct).toHaveBeenCalledWith(product);
});

test('given an existing product, when retrieving the product by ID, then return the product', async () => {
    // given
    mockProductDbGetProductById = jest.fn().mockReturnValue(product);
    productDb.getProductById = mockProductDbGetProductById;

    // when
    const retrievedProduct = await productService.getProductById({ id: 123 });

    // then
    expect(mockProductDbGetProductById).toHaveBeenCalledTimes(1);
    expect(retrievedProduct).toEqual(product);
});
