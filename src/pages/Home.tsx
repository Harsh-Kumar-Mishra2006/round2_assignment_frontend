import React, { useState, useEffect } from "react";
import Hero from "../components/home/Hero";
import PostCard from "../components/common/PostCard";
import { postAPI } from "../services/api";
import Loader from "../components/common/Loader";

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

  useEffect(() => {
    fetchPosts();

    // Listen for comment updates from localStorage
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "commentsUpdated") {
        // Refresh posts to get updated comment counts
        fetchPosts();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Custom event for same tab
    window.addEventListener("commentsUpdated", () => fetchPosts());

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("commentsUpdated", () => fetchPosts());
    };
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postAPI.getAll();
      if (response.data.data && response.data.data.length > 0) {
        setPosts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeUpdate = (postId: string, newLikes: string[]) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId ? { ...post, likes: newLikes } : post,
      ),
    );
  };

  const handleDeletePost = (postId: string) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Hero />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">
                No posts yet. Be the first to create one!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard
                  key={post._id}
                  post={post}
                  onLikeUpdate={handleLikeUpdate}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
