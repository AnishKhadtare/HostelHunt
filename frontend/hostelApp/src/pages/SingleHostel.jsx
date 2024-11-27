import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getSingleHostel } from '../api';
import PostReview from '../components/PostReview';
import { useUser } from '../context/userContext';
import FetchReviews from '../components/FetchReviews';
import { getAverageHostelRating } from '../api';
import MapComponent from '../components/MapComponent';

const SingleHostel = () => {
  const [room, setRoom] = useState({});
  const [averageRating, setAverageRating] = useState(null);
  const { id } = useParams();
  const { user } = useUser();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showMap, setShowMap] = useState(false); // State to toggle map visibility

  useEffect(() => {
    const getAverageRating = async () => {
      try {
        const res = await getAverageHostelRating(id);
        setAverageRating(res.data.averageRating);
      } catch (error) {
        console.log(error.response ? error.response.data.message : error.message);
      }
    };
    getAverageRating();
  }, [id]);

  useEffect(() => {
    const fetchHostel = async () => {
      try {
        const res = await getSingleHostel(id);
        setRoom(res.data.hostel);
        console.log(res.data.hostel);
      } catch (error) {
        console.log(error.response ? error.response.data.message : error.message);
      }
    };
    fetchHostel();
  }, [id]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === room.photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? room.photos.length - 1 : prevIndex - 1
    );
  };

  const toggleMap = () => {
    setShowMap(!showMap);
  };
  return (
    <div className="max-w-4xl mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-6 flex flex-col md:flex-row md:space-x-6">
        <div>
          <div className="relative">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">{room.name}</h1>
              <div className="flex items-center justify-end">
                <span className="bg-blue-800 text-white rounded-full px-4 py-2 text-sm font-semibold">{Math.round(averageRating)}/5</span>
              </div>
            </div>
          </div>
          {room.photos && room.photos.length > 0 && (
            <div className="relative w-full h-64 overflow-hidden rounded-lg shadow-md">
              <div className="w-full h-full flex transition-transform duration-500" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                {room.photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Slide ${index}`}
                    className="w-full h-full object-cover flex-shrink-0"
                  />
                ))}
              </div>
              <button
                onClick={handlePrevImage}
                className="absolute top-1/2 transform -translate-y-1/2 left-0 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                onClick={handleNextImage}
                className="absolute top-1/2 transform -translate-y-1/2 right-0 bg-gray-800 bg-opacity-50 text-white p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
          )}
          <div className="mt-4 space-y-2">
            <p className="text-gray-600"><strong>Location:</strong> {room.location}</p>
            <p className="text-gray-600"><strong>Address:</strong> {room.address}</p>
            <p className="text-gray-600"><strong>Rent:</strong> {room.rent}</p>
            <p className="text-gray-600"><strong>Description:</strong> {room.description}</p>
            <p className="text-gray-600"><strong>Status:</strong> {room.status}</p>
            <p className="text-gray-600"><strong>Email At :</strong> {room.seller?.email}</p>
            <p className="text-gray-600"><strong>Contact:</strong> {room.seller?.phone}</p>
          </div>

          {/* Button to toggle the map */}
          <button onClick={toggleMap} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            {showMap ? 'Hide Map' : 'Open with Map'}
          </button>

          {/* Map component - only shows when showMap is true */}
          {showMap && (
            <div className="mt-4">
              <MapComponent latitude={room.latitude} longitude={room.longitude} />
            </div>
          )}
        </div>
      </div>

      {user?.isBuyer && (
        <div className="mt-6 bg-white shadow-md rounded-lg p-6">
          <PostReview id={room._id} />
        </div>
      )}

      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <FetchReviews />
      </div>
    </div>
  );
};

export default SingleHostel;
