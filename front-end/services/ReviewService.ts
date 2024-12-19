import { Review } from '@types';

const addReviewToProduct = async (productId: String, reviewData: Review) => {
    try {
        const loggedInUser = sessionStorage.getItem('loggedInUser');
        const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/reviews/review/${productId}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(reviewData),
            }
        );

        if (!response.ok) {
            throw new Error(`Failed to add review: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

const ReviewService = {
    addReviewToProduct,
};

export default ReviewService;
