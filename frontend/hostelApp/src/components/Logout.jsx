import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../api';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      console.log(res.data);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Logout;
