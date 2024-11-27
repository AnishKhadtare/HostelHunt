/* changes */
import React, { useState } from 'react';
import { postHostel } from '../api';
import { useNavigate } from 'react-router-dom';
import Logout from '../components/Logout';
import ChangePasswordBtn from '../components/ChangePasswordBtn';

const PostHostel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    address: '',
    rent: '',
    description: '',
    status: '',
    photos: [], // Add photos to the state
  });

  const handleChange = (e) => {
    if (e.target.name === 'photos') {
      setFormData({ ...formData, photos: e.target.files });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'photos') {
        Array.from(formData.photos).forEach(photo => {
          form.append('photos', photo);
        });
      } else {
        form.append(key, formData[key]);
      }
    });

    try {
      const res = await postHostel(form);
      console.log('Hostel posted successfully', res.data);
      // Optionally, you can show a success message or redirect the user
    } catch (error) {
      console.error('Hostel Posting Error:', error.response?.data || error.message);
      // Handle error display or feedback to the user
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className='flex justify-between items-center mb-4'>
        <button
          onClick={() => navigate('/posted-hostels')}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Posted Hostels
        </button>
        <div className="flex items-center space-x-4">
          <Logout />
          <ChangePasswordBtn />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Name"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="location"
          value={formData.location}
          placeholder="Location"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="address"
          value={formData.address}
          placeholder="Address"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="number"
          name="rent"
          value={formData.rent}
          placeholder="Rent"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          placeholder="Description"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="text"
          name="status"
          value={formData.status}
          placeholder="Status"
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <input
          type="file"
          name="photos"
          multiple
          onChange={handleChange}
          className="mb-4 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default PostHostel;
