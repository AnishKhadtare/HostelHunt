import React from 'react';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="px-4 py-24 bg-gradient-to-b from-gray-800 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Hostel</h1>
          <p className="text-lg text-gray-200 mb-8">
            Discover hostels, book rooms, and share your experiences.
          </p>
          <div className="flex justify-center">
            <button onClick={() => navigate("/register")} className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg font-semibold mr-4">
              Explore Hostels
            </button>
            <button onClick={() => navigate("/learn-more")} className="bg-transparent hover:bg-gray-600 text-gray-200 px-6 py-3 rounded-lg shadow-lg font-semibold">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Search Hostels</h2>
              <p className="text-gray-600">
                Find hostels based on location, amenities, and reviews.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Book Rooms</h2>
              <p className="text-gray-600">
                Reserve rooms securely with transparent pricing.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Review Hostels</h2>
              <p className="text-gray-600">
                Share your experience and help others make informed choices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-gray-200 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Sign up now and start exploring!
          </p>
          <button onClick={() => navigate("/register")} className="bg-indigo-500 hover:bg-indigo-600 text-white px-8 py-4 rounded-lg shadow-lg font-semibold">
            Sign Up
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
          <p className="text-sm">&copy; 2024 HostelHunt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
