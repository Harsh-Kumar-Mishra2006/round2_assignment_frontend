import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiHeart,
  FiMessageCircle,
  FiUser,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { postAPI } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

interface Post {
  _id: string;
  title: string;
  content: string;
  author: {
    _id: string;
    name: string;
    email: string;
  };
  likes: string[] | any;
  comments?: any[];
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  onLikeUpdate?: (postId: string, newLikes: string[]) => void;
  onDelete?: (postId: string) => void;
}

const PostCard: React.FC<PostCardProps> = ({
  post,
  onLikeUpdate,
  onDelete,
}) => {
  const { user } = useAuth();
  const [isLiking, setIsLiking] = useState(false);
  // Ensure likes is always an array
  const [likes, setLikes] = useState<string[]>(
    Array.isArray(post.likes) ? post.likes : [],
  );
  const isLiked = user ? likes.includes(user._id) : false;

  const handleLike = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to like posts");
      return;
    }

    setIsLiking(true);
    try {
      const response = await postAPI.like(post._id);
      // Ensure response data is an array
      const newLikes = Array.isArray(response.data) ? response.data : [];
      setLikes(newLikes);
      if (onLikeUpdate) {
        onLikeUpdate(post._id, newLikes);
      }
    } catch (error: any) {
      console.error("Like error:", error);
      toast.error(error.response?.data?.message || "Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await postAPI.delete(post._id);
      toast.success("Post deleted successfully!");
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      toast.error("Failed to delete post");
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

        <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiUser className="text-teal-500" />
            <span>{post.author?.name || "Unknown Author"}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>

          {user && user._id === post.author?._id && (
            <div className="flex items-center gap-2">
              <Link
                to={`/edit/${post._id}`}
                onClick={(e) => e.stopPropagation()}
                className="text-gray-400 hover:text-teal-600 transition-colors"
                title="Edit post"
              >
                <FiEdit2 size={16} />
              </Link>
              <button
                onClick={handleDelete}
                className="text-gray-400 hover:text-rose-500 transition-colors"
                title="Delete post"
              >
                <FiTrash2 size={16} />
              </button>
            </div>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content?.substring(0, 150) || ""}...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-1 transition-colors ${
                isLiked ? "text-rose-500" : "text-gray-500 hover:text-rose-500"
              }`}
            >
              <FiHeart className={isLiked ? "fill-rose-500" : ""} />
              <span>{likes.length}</span>
            </button>

            <Link
              to={`/post/${post._id}`}
              className="flex items-center gap-1 text-gray-500 hover:text-teal-600"
            >
              <FiMessageCircle />
              <span>
                {Array.isArray(post.comments) ? post.comments.length : 0}
              </span>
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
