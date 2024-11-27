import React, { useEffect, useState } from 'react';
import { getPostedHostels } from '../api';
import { Link } from 'react-router-dom';

const SellerPostedHostels = () => {
  const [postedHostels, setPostedHostels] = useState([]);

  const fetchPostedHostels = async () => {
    try {
      const res = await getPostedHostels();
      setPostedHostels(res.data.hostels);
      console.log('Fetched Posted Hostels:', res.data);
    } catch (error) {
      console.error('Fetching Posted Hostels Error:', error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchPostedHostels();
  }, []);

  return (
    <div className="w-full flex flex-col justify-center items-center mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Posted Hostels</h1>

      <div className="flex flex-col -mx-4 w-full justify-center items-center">
        {postedHostels.map((hostel) => (
          <div key={hostel._id} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="bg-gray-200 h-48 flex items-center justify-center">
                {hostel.photos && hostel.photos.length > 0 ? (
                  <img className="h-full w-full object-cover" src={hostel.photos[0]} alt={hostel.name} />
                ) : (
                  <p className="text-gray-600">No Image Available</p>
                )}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{hostel.name}</h2>
                <p className="text-gray-600 mb-2">{hostel.location}</p>
                <p className="text-gray-600 mb-2">{hostel.description}</p>
                <p className="text-gray-600 mb-2">Rent: {hostel.rent}</p>
                <p className="text-gray-600 mb-4">Status: {hostel.status}</p>
                <Link
                  to={`/get-single-hostel/${hostel._id}`}
                  className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                >
                  View Hostel
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SellerPostedHostels;
