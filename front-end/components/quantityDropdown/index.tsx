import { useState, useEffect } from 'react';
import ShoppingCartService from '@services/ShoppingCartService';

type Props = {
    cartId: number;
    productId: number;
    quantity: number;
    stock: number;
    onQuantityChange: () => void;
};

const QuantityDropdown = ({ cartId, productId, quantity, stock, onQuantityChange }: Props) => {
    const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);

    useEffect(() => {
        setSelectedQuantity(quantity);
    }, [quantity]);

    const updateQuantity = async (newQuantity: number) => {
        try {
            await ShoppingCartService.changeProductQuantity(cartId, productId, newQuantity);
            console.log('Quantity updated successfully.');
        } catch (error) {
            console.error('Failed to update quantity:', error);
        }
    };

    const refreshCart = () => {
        onQuantityChange();
    };

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('quantity change event:', event.target.value);
        const newQuantity = parseInt(event.target.value, 10);
        setSelectedQuantity(newQuantity);

        await updateQuantity(newQuantity);

        refreshCart();
    };

    const quantityOptions = Array.from({ length: stock }, (_, index) => index + 1);

    return (
        <div>
            {stock === 0 ? (
                <span className="text-red-500">Out of Stock</span>
            ) : (
                <select
                    id="quantity"
                    value={selectedQuantity}
                    onChange={handleQuantityChange}
                    className="p-2 border rounded"
                >
                    {quantityOptions.map((optionValue) => (
                        <option key={optionValue} value={optionValue}>
                            {optionValue}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
};

export default QuantityDropdown;
