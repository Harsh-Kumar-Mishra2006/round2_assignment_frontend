import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { FiEdit, FiTrendingUp, FiUsers } from 'react-icons/fi';

const Hero: React.FC = () => {
  const { user } = useAuth();

  return (
    <section className="bg-gradient-to-br from-teal-600 via-cyan-600 to-rose-500 text-white rounded-3xl mx-4 md:mx-6 mt-6 p-8 md:p-16">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Share Your Stories with the World
        </h1>
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Join thousands of writers sharing their thoughts, ideas, and experiences on BlogSphere
        </p>
        
        {user ? (
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FiEdit /> Start Creating
          </Link>
        ) : (
          <Link
            to="/signup"
            className="inline-flex items-center gap-2 bg-white text-teal-600 px-8 py-3 rounded-full font-semibold hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            Get Started - It's Free
          </Link>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <FiEdit className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Write Freely</h3>
            <p className="text-sm text-white/80">Express your thoughts beautifully</p>
          </div>
          <div className="text-center">
            <FiTrendingUp className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Grow Audience</h3>
            <p className="text-sm text-white/80">Reach readers worldwide</p>
          </div>
          <div className="text-center">
            <FiUsers className="text-3xl mx-auto mb-3" />
            <h3 className="font-semibold mb-2">Join Community</h3>
            <p className="text-sm text-white/80">Connect with fellow writers</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;