import React, { useState, useEffect } from 'react';
import { getReviews } from '../api';
import { useParams } from 'react-router-dom';

const FetchReviews = () => {
  const { id } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getHostelReviews = async () => {
      try {
        const res = await getReviews(id);
        setReviews(res.data.reviews);  // Assuming res.data has a reviews array
        console.log(res.data.reviews);
      } catch (error) {
        console.log(error.message);
      }
    };
    getHostelReviews();
  }, [id]); // Add 'id' to the dependency array

  return (
    <div className="max-w-lg mt-8"> 
      {reviews.length > 0 ? (
        <div className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <div key={review._id} className="py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-800">{review.user.userName}</h3>
                <span className="text-gray-600">{review.rating}/5</span>
              </div>
              <p className="text-gray-700 mt-2">{review.comment}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600">No reviews yet.</p>
      )}
    </div>
  );
};

export default FetchReviews;
