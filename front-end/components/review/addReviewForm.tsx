import React, { useState } from 'react';
import { Review } from '@types';
import ReviewService from '@services/ReviewService';
import UserService from '@services/UserService';

interface ReviewFormProps {
  productId: number; 
  onAddReview: (reviewData: { review: Review; productId: number }) => void; 
}

const ReviewForm: React.FC<ReviewFormProps> = ({ productId, onAddReview }) => {
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const newReview: Review = {
      score,
      comment,
      date: new Date(),
    };
    const loggedInUserString = sessionStorage.getItem('loggedInUser');
    const parsedLoggedInUser = loggedInUserString ? JSON.parse(loggedInUserString) : null;
    const user = await UserService.getUserByUsername(parsedLoggedInUser.username);
    console.log("User:", user);
    try {
      await ReviewService.addReviewToProduct(productId.toString(), newReview, user.id);
      onAddReview({ review: newReview, productId });
      setFeedbackMessage('Review submitted successfully!');
    } catch (error) {
      console.error("Failed to submit review:", error);
      setFeedbackMessage('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
      setScore(0);
      setComment('');
    }
  };

  return (
    <form onSubmit={handleReviewSubmit} className="flex flex-col p-4 border rounded-lg shadow-md bg-white mt-4">
      <h4 className="text-lg font-semibold mb-3 text-gray-700">Write a Review</h4>
      <div className="flex items-center mb-3">
        <select 
          value={score} 
          onChange={e => setScore(Number(e.target.value))} 
          className="border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value={0}>0 Stars</option>
          {Array.from({ length: 5 }, (_, index) => (
            <option key={index + 1} value={index + 1}>
              {index + 1} Star{index > 0 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>
      <textarea 
        value={comment} 
        onChange={e => setComment(e.target.value)} 
        placeholder="Write your review here..." 
        className="border border-gray-300 rounded p-2 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-400"
        required
      />
      <button 
        type="submit" 
        className={`bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition duration-200 mt-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
      {feedbackMessage && <p className="mt-4 text-red-600">{feedbackMessage}</p>}
    </form>
  );
};

export default ReviewForm;
