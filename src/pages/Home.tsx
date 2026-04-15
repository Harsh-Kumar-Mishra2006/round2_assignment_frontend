import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import PostCard from '../components/common/PostCard';
import { postAPI } from '../services/api';
import { dummyPosts } from '../utils/dummyData';
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

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingDummyData, setUsingDummyData] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getAll();
      if (response.data.data && response.data.data.length > 0) {
        setPosts(response.data.data);
      } else {
        // Use dummy data if no posts in DB
        setPosts(dummyPosts as Post[]);
        setUsingDummyData(true);
      }
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      setPosts(dummyPosts as Post[]);
      setUsingDummyData(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (postId: string, newLikes: string[]) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post._id === postId ? { ...post, likes: newLikes } : post
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800">
              {usingDummyData ? 'Featured Stories' : 'Latest Blog Posts'}
            </h2>
            {usingDummyData && (
              <span className="text-sm text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                Sample Posts
              </span>
            )}
          </div>
          
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet. Be the first to create one!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post._id} post={post} onLikeUpdate={handleLikeUpdate} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;