import { Product } from "./product";

export class Shoppingcart {
    private id?: number;
    private products: Product[];
    private totalPrice: number;

    constructor(shoppingcart:{id?: number, products: Product[], totalPrice: number}) {
        this.id = shoppingcart.id;
        this.products = shoppingcart.products;
        this.totalPrice = shoppingcart.totalPrice;
    }

    addProductToShoppingCart(product: Product) {
        this.products.push(product);
        this.totalPrice += product.getPrice();
    }

    removeProductFromShoppingCart(productId: number): boolean {
        const productIndex = this.products.findIndex(product => product.getId() === productId);

        if (productIndex === -1) {
            return false; 
        }

        const productToRemove = this.products[productIndex];
        this.products.splice(productIndex, 1); 
        this.totalPrice -= productToRemove.getPrice(); 
        return true; 
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }
    
    equals(shoppingcart: Shoppingcart): boolean {
        return (
            this.id === shoppingcart.getId() &&
            this.products === shoppingcart.getProducts() &&
            this.totalPrice === shoppingcart.getTotalPrice()
        )
    }
}