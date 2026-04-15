import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiPlusCircle, FiUser, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            BlogSphere
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors">
              <FiHome /> Home
            </Link>

            {user ? (
              <>
                <Link to="/create" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors">
                  <FiPlusCircle /> Create Blog
                </Link>
                <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors">
                  <FiUser /> Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-gradient-to-r from-rose-500 to-rose-600 text-white px-4 py-2 rounded-lg hover:from-rose-600 hover:to-rose-700 transition-all"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center gap-2 text-gray-700 hover:text-teal-600 transition-colors">
                  <FiLogIn /> Login
                </Link>
                <Link to="/signup" className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all">
                  <FiUserPlus /> Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button (simplified) */}
          <div className="md:hidden">
            {user ? (
              <button onClick={handleLogout} className="text-rose-600">
                <FiLogOut size={24} />
              </button>
            ) : (
              <Link to="/login" className="text-teal-600">
                <FiLogIn size={24} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;