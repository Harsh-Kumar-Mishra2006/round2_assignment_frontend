import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { postAPI, commentAPI } from "../services/api";
import {
  FiHeart,
  FiMessageCircle,
  FiTrash2,
  FiEdit,
  FiArrowLeft,
} from "react-icons/fi";
import toast from "react-hot-toast";
import Loader from "../components/common/Loader";

interface Comment {
  _id: string;
  text: string;
  user: {
    _id: string;
    name: string;
  };
  createdAt: string;
}

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
  createdAt: string;
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [submittingComment, setSubmittingComment] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPostAndComments();
    }
  }, [id]);

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      // Fetch post
      const postRes = await postAPI.getById(id!);
      const postData = postRes.data.data || postRes.data;
      setPost(postData);

      // Fetch comments
      try {
        const commentsRes = await commentAPI.getByPost(id!);
        const commentsData = commentsRes.data.data || commentsRes.data || [];
        setComments(Array.isArray(commentsData) ? commentsData : []);
      } catch (commentError) {
        console.error("Failed to fetch comments:", commentError);
        setComments([]);
      }
    } catch (error: any) {
      console.error("Failed to fetch post:", error);
      if (error.response?.status === 404) {
        toast.error("Post not found");
      } else {
        toast.error("Failed to load post");
      }
      navigate("/");
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!user) {
      toast.error("Please login to like posts");
      return;
    }

    setIsLiking(true);
    try {
      const response = await postAPI.like(post!._id);
      const newLikes = Array.isArray(response.data) ? response.data : [];
      setPost((prev) => (prev ? { ...prev, likes: newLikes } : null));
    } catch (error: any) {
      console.error("Like error:", error);
      toast.error(error.response?.data?.message || "Failed to like post");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDelete = async () => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action cannot be undone.",
      )
    ) {
      return;
    }

    try {
      await postAPI.delete(post!._id);
      toast.success("Post deleted successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete post");
    }
  };

  const handleAddComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to comment");
      return;
    }
    if (!commentText.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    setSubmittingComment(true);
    try {
      const response = await commentAPI.create(commentText, post!._id);
      console.log("Comment API Response:", response.data); // Debug log

      // Handle different response structures
      let newComment;
      if (response.data.data) {
        newComment = response.data.data;
      } else if (response.data.comment) {
        newComment = response.data.comment;
      } else {
        newComment = response.data;
      }

      // Validate comment structure
      if (newComment && newComment._id) {
        setComments((prev) => [newComment, ...prev]);
        setCommentText("");
        toast.success("Comment added!");
      } else {
        console.error("Invalid comment structure:", newComment);
        toast.error("Failed to add comment: Invalid response");
      }
    } catch (error: any) {
      console.error("Comment error:", error);
      toast.error(error.response?.data?.message || "Failed to add comment");
    } finally {
      setSubmittingComment(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    if (!confirm("Delete this comment?")) return;

    try {
      await commentAPI.delete(commentId);
      setComments((prev) => prev.filter((c) => c._id !== commentId));
      toast.success("Comment deleted");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  if (loading) return <Loader />;
  if (!post) return <div className="text-center py-12">Post not found</div>;

  const isAuthor = user?._id === post.author?._id;
  const isLiked =
    user && Array.isArray(post.likes) ? post.likes.includes(user._id) : false;
  const likesCount = Array.isArray(post.likes) ? post.likes.length : 0;

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-600 hover:text-teal-600 mb-6 transition-colors"
      >
        <FiArrowLeft /> Back to Home
      </button>

      {/* Post Header */}
      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-6 pb-6 border-b">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-600 to-cyan-600 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
              {post.author?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-gray-800">
                {post.author?.name || "Unknown Author"}
              </p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              disabled={isLiking}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isLiked
                  ? "bg-rose-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <FiHeart className={isLiked ? "fill-white" : ""} />
              <span>
                {likesCount} {likesCount === 1 ? "Like" : "Likes"}
              </span>
            </button>

            {isAuthor && (
              <div className="flex gap-2">
                <Link
                  to={`/edit/${post._id}`}
                  className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <FiEdit /> Edit
                </Link>
                <button
                  onClick={handleDelete}
                  className="flex items-center gap-2 px-4 py-2 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition-colors"
                >
                  <FiTrash2 /> Delete
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="prose max-w-none">
          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiMessageCircle /> Comments ({comments.length})
        </h2>

        {/* Add Comment Form */}
        {user ? (
          <form onSubmit={handleAddComment} className="mb-8">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-3"
            />
            <button
              type="submit"
              disabled={submittingComment}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:from-teal-700 hover:to-cyan-700 transition-all disabled:opacity-50"
            >
              {submittingComment ? "Posting..." : "Post Comment"}
            </button>
          </form>
        ) : (
          <div className="bg-gray-50 rounded-lg p-4 text-center mb-8">
            <p className="text-gray-600">
              <Link to="/login" className="text-teal-600 hover:underline">
                Login
              </Link>{" "}
              to join the conversation
            </p>
          </div>
        )}

        {/* Comments List */}
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div
                key={comment._id}
                className="border-b border-gray-100 pb-4 last:border-0"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-gray-800">
                        {comment.user?.name || "Unknown User"}
                      </span>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{comment.text}</p>
                  </div>
                  {user?._id === comment.user?._id && (
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-gray-400 hover:text-rose-500 transition-colors"
                    >
                      <FiTrash2 />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
