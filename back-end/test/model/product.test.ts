import { Product } from '../../model/product';

test('given: valid values for product, when: product is created, then: product is created', () => {
    //given

    //when
    const product = new Product({
        id: 1,
        name: 'product1',
        price: 10,
        description: 'description1',
        stock: 10,
    });
    //then
    expect(product.getId()).toBe(1);
    expect(product.getName()).toBe('product1');
    expect(product.getPrice()).toBe(10);
    expect(product.getDescription()).toBe('description1');
    expect(product.getStock()).toBe(10);
    // expect(product.getReviews()).toStrictEqual([]);
});

test('given: invalid name, when: product is created, then: throw error', () => {
    //given

    //when
    const product = () =>
        new Product({
            id: 2,
            name: '',
            price: 10,
            description: 'description1',
            stock: 10,
        });
    //then
    expect(product).toThrow('Name is required');
});

test('given: invalid price, when: product is created, then: throw error', () => {
    //given

    //when
    const product = () =>
        new Product({
            id: 2,
            name: 'product1',
            price: 0,
            description: 'description1',
            stock: 10,
        });
    //then
    expect(product).toThrow('Price is required');
});
