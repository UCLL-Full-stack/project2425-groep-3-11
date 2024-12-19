import { useState, useEffect } from "react";
import ShoppingCartService from "@services/ShoppingCartService";

type Props = {
    cartId: number;
    productId: number;
    quantity: number;
    stock: number;  
    onQuantityChange: () => void;
}

const QuantityDropdown = ({ cartId, productId, quantity, stock, onQuantityChange }: Props) => {

    const [selectedQuantity, setSelectedQuantity] = useState<number>(quantity);

    useEffect(() => {
        setSelectedQuantity(quantity);
    }, [quantity]);

    const handleQuantityChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newQuantity = parseInt(event.target.value, 10);
        setSelectedQuantity(newQuantity);
        onQuantityChange();

        try {
            await ShoppingCartService.changeProductQuantity(cartId, productId, newQuantity);
            
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    }


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
}

export default QuantityDropdown;
