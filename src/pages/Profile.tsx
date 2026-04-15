import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { postAPI } from '../services/api';
import PostCard from '../components/common/PostCard';
import { FiUser, FiMail, FiCalendar, FiFileText } from 'react-icons/fi';
import Loader from '../components/common/Loader';

// Define Post type locally
interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[];
  comments?: any[];
  createdAt: string;
}

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserPosts();
  }, []);

  const fetchUserPosts = async () => {
    try {
      const response = await postAPI.getAll();
      const allPosts = response.data.data || [];
      const filtered = allPosts.filter((post: Post) => post.author._id === user?._id);
      setUserPosts(filtered);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (postId: string, newLikes: string[]) => {
    setUserPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId ? { ...post, likes: newLikes } : post
      )
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl p-8 text-white mb-8">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="bg-white/20 p-4 rounded-full">
            <FiUser className="text-4xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
            <div className="flex items-center gap-4 mt-2 text-white/90">
              <span className="flex items-center gap-1">
                <FiMail /> {user?.email}
              </span>
              <span className="flex items-center gap-1">
                <FiCalendar /> Member since {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiFileText className="text-3xl text-teal-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">{userPosts.length}</h3>
          <p className="text-gray-500">Posts Written</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiUser className="text-3xl text-teal-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">1</h3>
          <p className="text-gray-500">Followers</p>
        </div>
        <div className="bg-white rounded-xl shadow-md p-6 text-center">
          <FiUser className="text-3xl text-teal-600 mx-auto mb-2" />
          <h3 className="text-2xl font-bold">1</h3>
          <p className="text-gray-500">Following</p>
        </div>
      </div>

      {/* User's Posts */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Posts</h2>
      {userPosts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-md p-12 text-center">
          <p className="text-gray-500">You haven't written any posts yet.</p>
          <a href="/create" className="text-teal-600 hover:text-teal-700 font-semibold mt-2 inline-block">
            Create your first post →
          </a>
        </div>
      ) : (
        <div className="space-y-6">
          {userPosts.map((post) => (
            <PostCard key={post._id} post={post} onLikeUpdate={handleLikeUpdate} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;