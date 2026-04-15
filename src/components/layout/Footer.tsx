import React from 'react';
import { FiHeart, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent mb-4">
              BlogSphere
            </h3>
            <p className="text-gray-400">
              Share your stories, inspire others, and be part of a growing community of writers.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-teal-400">Home</a></li>
              <li><a href="/create" className="hover:text-teal-400">Write a Story</a></li>
              <li><a href="/profile" className="hover:text-teal-400">Profile</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-teal-400">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-teal-400">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-400"><FiTwitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-teal-400"><FiGithub size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-teal-400"><FiLinkedin size={24} /></a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>Made with <FiHeart className="inline text-rose-500" /> by Harsh Kumar</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;