import React, { useState } from 'react';
import { registerUser } from '../api.js';
import HeaderPage from '../components/HeaderPage.jsx';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const isLoginPage = false;
  const isRegisterPage = window.location.pathname === '/register'; 
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
    isBuyer: false,
    isSeller: false,
    phone: ''
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    if (value === 'buyer') {
      setFormData({ ...formData, isBuyer: true, isSeller: false });
    }
    else if (value === 'seller') {
      setFormData({ ...formData, isBuyer: false, isSeller: true });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = await registerUser(formData);
      console.log('Registration Successful:', res.data);
      navigate('/login');
    }
    catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
    }
  };

  return (
    <>
      <HeaderPage isRegister = {isRegisterPage} isLogin = {isLoginPage}/>
      <div className=" flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="userName"
            id="userName"
            autoComplete="username"
            required
            className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Username"
            value={formData.userName}
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            required
            className="block w-full px-3 py-2 border mt-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            value={formData.email}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            id="password"
            autoComplete="new-password"
            required
            className="block w-full px-3 py-2 border mt-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
          />
          <div className="flex items-center space-x-4 mt-4">
            <label className="block text-sm font-medium text-gray-700">Account Type:</label>
            <div className="flex items-center">
              <input
                type="radio"
                id="buyer"
                name="userType"
                value="buyer"
                checked={formData.isBuyer}
                onChange={handleRadioChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="buyer" className="ml-2 block text-sm text-gray-900">
                Buyer
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="seller"
                name="userType"
                value="seller"
                checked={formData.isSeller}
                onChange={handleRadioChange}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label htmlFor="seller" className="ml-2 block text-sm text-gray-900">
                Seller
              </label>
            </div>
          </div>
          <input
            type="tel"
            name="phone"
            id="phone"
            autoComplete="tel"
            required
            className="block w-full px-3 py-2 border mt-4 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
          />
          <div>
            <button
              type="submit"
              className="w-full mt-4 py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Register;
