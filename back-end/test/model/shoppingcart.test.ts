import { de } from 'date-fns/locale';
import { Shoppingcart } from '../../model/shoppingcart';
import { Product } from '../../model/product';

const product1 = new Product({
    id: 1,
    name: 'product1',
    price: 10,
    description: 'description1',
    stock: 10,
    quantity: 1,
});
const product2 = new Product({
    id: 2,
    name: 'product2',
    price: 20,
    description: 'description2',
    stock: 20,
    quantity: 2,
});

test('given: valid values for shoppingcart, when: shoppingcart is created, then: shoppingcart is created', () => {
    //given

    //when
    const shoppingcart = new Shoppingcart({
        id: 1,
        products: [product1, product2],
        totalPrice: product1.getPrice() + product2.getPrice(),
    });
    //then
    expect(shoppingcart.getId()).toBe(1);
    expect(shoppingcart.getProducts()).toStrictEqual([product1, product2]);
    expect(shoppingcart.getTotalPrice()).toBe(product1.getPrice() + product2.getPrice());
});
