import React from 'react';
import { useNavigate } from 'react-router-dom';
const LearnMore = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <header className="w-full bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">Learn More</h1>
        </div>
      </header>

      <main className="flex-1 w-full">
        <section className="container mx-auto px-6 py-12 text-center">
          <h2 className="text-2xl font-semibold mb-6">Welcome to HostelHunt</h2>
          <p className="text-gray-700 mb-8">
            Discover how HostelHunt can effectively reduce your hustle in finding the right hostel for you with our powerful and easy-to-use platform.
          </p>
        </section>

        <section className="container mx-auto px-6 py-12 bg-white shadow-md rounded-lg mb-12">
          <h3 className="text-xl font-semibold mb-4">Why Choose HostelHunt?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-bold mb-2">Easy Management</h4>
              <p className="text-gray-700">
                Manage all your hostel operations in one place with our intuitive interface and powerful features.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-bold mb-2">Secure Authentication</h4>
              <p className="text-gray-700">
                Ensure the safety and security of your data with our robust authentication system.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-bold mb-2">Comprehensive Features</h4>
              <p className="text-gray-700">
                From room listings to tenant management, HostelHunt covers all aspects of hostel management.
              </p>
            </div>
            <div className="p-6 border rounded-lg bg-gray-50">
              <h4 className="text-lg font-bold mb-2">24/7 Support</h4>
              <p className="text-gray-700">
                Get round-the-clock support from our dedicated team to ensure your operations run smoothly.
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 py-12 text-center">
          <h3 className="text-xl font-semibold mb-4">Ready to Get Started?</h3>
          <p className="text-gray-700 mb-8">
            Join hundreds of hostel owners who are using HostelHunt to simplify their operations and enhance their tenant experience.
          </p>
          <button onClick={() => navigate('/register')}className="bg-gray-800 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300">
            Sign Up Now
          </button>
        </section>
      </main>

      <footer className="w-full bg-gray-800 text-white py-6">
        <div className="container mx-auto px-6">
          <p className="text-center">&copy; 2024 HostelHunt. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LearnMore;
