import React, { useState, useEffect } from 'react';
import { getAllHostels, getAverageHostelRating } from '../api';
import { useUser } from '../context/userContext';
import Logout from '../components/Logout';
import { Link } from 'react-router-dom';
import cities from '../assets/data/cities';

const HostelPage = () => {
  const citiesName = cities.map((city) => city.city);
  const [hostels, setHostels] = useState([]);
  const [filteredHostels, setFilteredHostels] = useState([]);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const [searchInput, setSearchInput] = useState('');
  const [filteredCities, setFilteredCities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [ratingFilter, setRatingFilter] = useState(0);

  const fetchHostels = async () => {
    try {
      const response = await getAllHostels();
      const hostelsWithRatings = await Promise.all(
        response.hostels.map(async (hostel) => {
          const ratingResponse = await getAverageHostelRating(hostel._id);
          return { ...hostel, rating: ratingResponse.data.averageRating };
        })
      );
      setHostels(hostelsWithRatings);
      setFilteredHostels(hostelsWithRatings);
      console.log('Fetched hostels with ratings:', hostelsWithRatings);
    } catch (error) {
      console.error('Failed to fetch hostels. ERROR:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleCityChange = (e) => {
    const currInput = e.target.value;
    setSearchInput(currInput);
    if (currInput) {
      const filtered = citiesName.filter((city) =>
        city.toLowerCase().startsWith(currInput.toLowerCase())
      );
      setFilteredCities(filtered);
    } else {
      setFilteredCities([]);
      filterHostels();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchInput(suggestion);
    setFilteredCities([]);
    filterHostelsByCity(suggestion);
  };

  const filterHostelsByCity = (city) => {
    const filtered = hostels.filter((hostel) =>
      hostel.location.toLowerCase().includes(city.toLowerCase())
    );
    setFilteredHostels(filtered);
  };

  const handlePriceRangeChange = (e) => {
    const [min, max] = e.target.value.split(',').map(Number);
    setPriceRange([min, max]);
    filterHostels();
  };

  const handleRatingChange = (e) => {
    setRatingFilter(Number(e.target.value));
    filterHostels();
  };

  const filterHostels = () => {
    let filtered = hostels;

    if (searchInput) {
      filtered = filtered.filter((hostel) =>
        hostel.location.toLowerCase().includes(searchInput.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (hostel) =>
        hostel.rent >= priceRange[0] &&
        hostel.rent <= priceRange[1] &&
        hostel.rating >= ratingFilter
    );

    setFilteredHostels(filtered);
  };

  useEffect(() => {
    fetchHostels();
  }, []);

  useEffect(() => {
    filterHostels();
  }, [priceRange, ratingFilter]);

  return (
    <div className="container mx-auto mt-8 px-4 sm:px-6 lg:px-8">
      <div className="flex shadow-lg p-4 w-full justify-between items-center mb-6">
        <h1 className="text-gray-800 text-3xl font-semibold">Amber</h1>
        <Logout />
      </div>

      <div className="flex">
        {/* Sidebar Filters */}
        <div className="w-1/4 p-4 bg-white shadow-lg rounded-lg">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-700">Filters</h2>

            {/* City Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                City
              </label>
              <input
                type="search"
                value={searchInput}
                onChange={handleCityChange}
                className="px-4 py-2 border rounded-lg w-full focus:outline-none focus:bg-gray-200"
                placeholder="Search by city name"
              />
              {filteredCities.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded-lg mt-2 max-h-40 overflow-y-auto">
                  {filteredCities.map((city, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                      onClick={() => handleSuggestionClick(city)}
                    >
                      {city}
                    </li>
                  ))}
                </ul>
              )}
            </div>


            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Price Range
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  min="0"
                  max="100000"
                  value={priceRange[0]}
                  onChange={(e) =>
                    setPriceRange([Number(e.target.value), priceRange[1]])
                  }
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none"
                />
                <input
                  type="number"
                  min="0"
                  max="100000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], Number(e.target.value)])
                  }
                  className="w-1/2 border rounded-lg px-4 py-2 focus:outline-none"
                />
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>{priceRange[0]}</span>
                <span>{priceRange[1]}</span>
              </div>
            </div>


            {/* Rating Filter */}
            <div className="mb-4">
              <label className="block text-gray-700 font-semibold mb-2">
                Minimum Rating
              </label>
              <input
                type="number"
                min="0"
                max="5"
                value={ratingFilter}
                onChange={handleRatingChange}
                className="w-full border rounded-lg px-4 py-2 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Hostels Display */}
        <div className="w-3/4">
          {error ? (
            <p className="text-red-600">Error: {error}</p>
          ) : (
            <div className="flex flex-col items-center space-y-6">
              {filteredHostels.length > 0 ? (
                filteredHostels.map((hostel) => (
                  <div
                    key={hostel._id}
                    className="bg-white rounded-lg overflow-hidden w-full flex flex-col sm:flex-row m-4 shadow-xl border-solid border-2"
                  >
                    <div className="bg-blue-200 w-full sm:w-1/3 h-48 sm:h-auto flex items-center justify-center">
                      {hostel.photos && hostel.photos.length > 0 ? (
                        <img
                          className="w-full h-full object-cover"
                          src={hostel.photos[0]}
                          alt={hostel.name}
                        />
                      ) : (
                        <p className="text-gray-600">No Image Available</p>
                      )}
                    </div>
                    <div className="p-4 w-full sm:w-2/3">
                      <div className="flex justify-between items-start">
                        <h2 className="text-lg font-semibold text-gray-800">
                          {hostel.name}
                        </h2>
                        {hostel.rating && (
                          <div className="flex items-center justify-end">
                            <span className="bg-blue-800 text-white rounded-full px-4 py-2 text-sm font-semibold">
                              {Math.round(hostel.rating)}/5
                            </span>
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600">{hostel.location}</p>
                      <p className="text-gray-600">{hostel.description}</p>
                      <p className="text-gray-600 mt-2">
                        Rent: {hostel.rent}
                      </p>
                      <Link
                        to={`/get-single-hostel/${hostel._id}`}
                        className="mt-4 inline-block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
                      >
                        View Hostel
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-600">No hostels available.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HostelPage;
