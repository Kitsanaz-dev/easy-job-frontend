// HomePage.jsx
import { useEffect, useState } from "react";
import { getAllPosts } from "../services/postService";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService"; // keep spelling consistent!
import PostCard from "../components/PostCard"; // case-sensitive path
import Aboutus from "../components/Aboutus";

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // fetch posts + favorites (favorites are user-scoped via token)
        const [allPosts, favs] = await Promise.all([
          getAllPosts(),
          getFavorites().catch(() => []), // if not logged in, fallback to []
        ]);

        const favoriteArray = Array.isArray(favs) ? favs : favs?.posts || [];
        const favIds = new Set(favoriteArray.map(p => String(p._id)));

        // normalize ids & mark favorites
        const merged = (allPosts || []).map(p => {
          const _id = p._id || p.id; // normalize
          return { ...p, _id, isFavorite: favIds.has(String(_id)) };
        });
        setPosts(merged);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleFavorite = async (postId, nextState) => {
    if (!postId) return;
    try {
      if (nextState) {
        await addFavorite(postId);
      } else {
        await removeFavorite(postId);
      }
      // update local state
      setPosts(prev =>
        prev.map(p =>
          String(p._id || p.id) === String(postId) ? { ...p, isFavorite: nextState } : p
        )
      );
    } catch (e) {
      console.error("Favorite toggle failed:", e);
      // optional: toast error
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* skeletons (kept from your version) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                    <div className="ml-3">
                      <div className="h-4 bg-gray-300 rounded w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                  <div className="h-6 bg-gray-300 rounded w-full mb-3"></div>
                  <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 rounded w-full"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                    <div className="h-8 bg-gray-200 rounded w-20"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* hero */}
      <div className="relative w-full">
        <img src="/jobfinding.png" alt="jobfinding" className="w-full h-[500px] object-cover opacity-80" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl font-bold text-black mb-4">Let's find the job</h1>
          <p className="text-lg text-black max-w-2xl mb-6">Don’t just search—discover your dream job.</p>
          <button
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition duration-200 hover:bg-blue-600 hover:scale-105"
            onClick={() => (window.location.href = "/create-post")}
          >
            Get the post
          </button>
        </div>
      </div>

      {/* Posts grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15"/>
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No posts yet</h3>
            <p className="text-gray-500 mb-6">Be the first to share something amazing with the community!</p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200">
              Create First Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard
                key={post._id || post.id}
                post={post}
                isFavorite={!!post.isFavorite}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </div>

      <Aboutus />
    </div>
  );
};

export default HomePage;
