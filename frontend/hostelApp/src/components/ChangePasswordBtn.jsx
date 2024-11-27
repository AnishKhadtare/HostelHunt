import React from 'react'
import { useNavigate } from 'react-router-dom';

const ChangePasswordBtn = () => {
  const navigate = useNavigate();
  return (
    <div>
        <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        onClick={() => navigate("/change-password")}>Change Password</button>
    </div>
  )
}

export default ChangePasswordBtn