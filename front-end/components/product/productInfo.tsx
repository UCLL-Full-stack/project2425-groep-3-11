import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { Product, ShoppingCart } from '@types';
import { useEffect, useState } from "react";
import ProductService from "@services/ProductService";
import ShoppingCartService from '@services/ShoppingCartService';
import ReviewService from '@services/ReviewService';


interface ProductInfoProps {
  product: Product | null;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const [cartId, setCartId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  if (!product) return null;

  const image = "https://placehold.co/600x400"; 
  // const reviews =  product.reviews ?? [];
  console.log("Product :", product);
  const reviewCount = reviews.length;

  const averageRating = reviewCount > 0 
    ? reviews.reduce((acc, review) => acc + review.score, 0) / reviewCount 
    : 2;

  useEffect(() => {
      const fetchCart = async () => {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        if (!loggedInUser) {
          setMessage('No user logged in.');
          return;
        }

        const user = JSON.parse(loggedInUser);
        try {
          const response = await ShoppingCartService.getShoppingCartByUsername(user.username);
          if (response.ok) {
            const data = await response.json();
            setCartId(data.id);
          } else {
            setMessage('Failed to fetch shopping cart.');
          }
        } catch (error) {
          console.error('Error fetching shopping cart:', error);
          setMessage('Error fetching shopping cart.');
        }
      };

      fetchCart();
    }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      if (!product || !product.id) return;

      const fetchedReviews = await ReviewService.getReviewsForProduct(product.id.toString()); // Assuming product.id is a number, convert to string
      if (fetchedReviews) {
        setReviews(fetchedReviews);  
      } else {
        setReviews([]); 
      }
    };

    fetchReviews();
  }, [product]);

  const addToCart = async () => {
    if (!cartId || !product.id) {
      setMessage('Cart or product not found.');
      return;
    }
    if (!product) return null;
    setLoading(true);
    setMessage(null);
    try {
      
      const response = await ShoppingCartService.addProductToCart(cartId, product.id);
      if (response.ok) {
        setMessage('Product added to cart successfully.');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setMessage('Error adding product to cart.');
    } finally {
      setLoading(false);
    }
  };
  
  
  return (
    <div className="flex flex-col md:flex-row items-start text-left p-4">
      <img src={image} alt={product.name} className="w-40 h-40 rounded-lg mb-4 md:mb-0 md:mr-6" />

      <div className="flex flex-col space-y-2">
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-700">{product.description}</p>
        <p className="text-lg font-medium text-gray-800">€{product.price.toFixed(2)}</p>
        
        <button 
          onClick={addToCart} 
          className="bg-black text-white py-2 px-4 rounded hover:bg-gray-800 disabled:bg-gray-400"
          disabled={loading}
        >
            {loading ? 'Adding...' : 'Add to cart'} 
        </button>
      </div>

      <div className="flex flex-col items-center mt-4 md:ml-6">
        <div className="mb-1">
          <span className="text-lg font-semibold">{averageRating.toFixed(1)} / 5</span>
        </div>
        <span className="text-sm text-gray-500">
          Based on {reviewCount} review{reviewCount !== 1 && 's'}
        </span>
      </div>

      <div className="mt-6 w-full p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-auto max-h-80">
        <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
        {reviewCount > 0 ? (
          <ul className="space-y-2">
            {reviews.map(review => (
              <li key={review.id} className="border-b pb-2">
                  <div className="flex items-center mb-1">
                    {[...Array(5)].map((_, index) => ( 
                      <FontAwesomeIcon 
                        key={index} 
                        icon={solidStar} 
                        className={`text-sm ${index < review.score ? 'text-yellow-500' : 'text-gray-300'} ${
                          index >= review.score ? 'opacity-50' : 'opacity-100'
                        }`}
                      />
                    ))}
                    <span className="text-sm text-gray-500 ml-2"> {review.score}/5 </span>
                    <span className="text-sm text-gray-500 ml-2">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                <p className="text-gray-700">{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>
    </div>
  );
};

export default ProductInfo;
