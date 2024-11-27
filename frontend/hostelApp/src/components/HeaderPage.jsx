import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = ({isLogin, isRegister}) => {
  return (
    <header className="bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-white text-2xl font-semibold mr-4">
              <NavLink to="/" className="text-white">
                Amber
              </NavLink>
            </h1>
          </div>
          <ul className="flex space-x-4">
            {
                !isLogin ? <li>
              <NavLink
                to="/login"
                className="text-white hover:text-gray-300 transition duration-300"
                activeClassName="font-bold"
              >
                Login
              </NavLink>
            </li> : null
            }
            {
                !isRegister ? <li>
              <NavLink
                to="/register"
                className="text-white hover:text-gray-300 transition duration-300"
                activeClassName="font-bold"
              >
                Register
              </NavLink>
            </li> : null
            }
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
