import React, { useState } from 'react';
import { postReview } from '../api';

const PostReview = ({ id }) => {
  const [formData, setFormData] = useState({ rating: '', review: '' });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await postReview(formData, id);
      console.log(res);
      // Optionally, clear the form after successful submission:
      setFormData({ rating: '', review: '' });
    } catch (error) {
      console.error('Error submitting review:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="max-w-lg mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Post a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center">
          <label className="mr-2 font-medium text-gray-700">Rating:</label>
          <input
            type="number"
            min={1}
            max={5}
            name="rating"
            value={formData.rating}
            placeholder="Enter rating (1-5)"
            onChange={handleChange}
            className="py-2 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <textarea
          name="review"
          value={formData.review}
          placeholder="Write your review..."
          onChange={handleChange}
          rows={4}
          className="w-full py-2 px-3 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
      </form>

      {error && <p className="text-red-500 mt-2">Error: {error}</p>}
    </div>
  );
};

export default PostReview;
