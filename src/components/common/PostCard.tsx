import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiMessageCircle, FiUser } from 'react-icons/fi';
import { postAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

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

interface PostCardProps {
  post: Post;
  onLikeUpdate?: (postId: string, newLikes: string[]) => void;
}

const PostCard: React.FC<PostCardProps> = ({ post, onLikeUpdate }) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  const [likes, setLikes] = useState(post.likes || []);
  const isLiked = user ? likes.includes(user._id) : false;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to like posts');
      return;
    }

    setIsLiking(true);
    try {
      const response = await postAPI.like(post._id);
      setLikes(response.data);
      if (onLikeUpdate) {
        onLikeUpdate(post._id, response.data);
      }
    } catch (error) {
      toast.error('Failed to like post');
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden card-hover">
      <div className="p-6">
        <Link to={`/post/${post._id}`}>
          <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-teal-600 transition-colors line-clamp-2">
            {post.title}
          </h2>
        </Link>
        
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
          <FiUser className="text-teal-500" />
          <span>{post.author.name}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? 'text-rose-500' : 'text-gray-500 hover:text-rose-500'
              }`}
            >
              <FiHeart className={isLiked ? 'fill-rose-500' : ''} />
              <span>{likes.length}</span>
            </button>
            
            <Link to={`/post/${post._id}`} className="flex items-center gap-1 text-gray-500 hover:text-teal-600">
              <FiMessageCircle />
              <span>{post.comments?.length || 0}</span>
            </Link>
          </div>
          
          <Link
            to={`/post/${post._id}`}
            className="text-teal-600 hover:text-teal-700 font-semibold"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;