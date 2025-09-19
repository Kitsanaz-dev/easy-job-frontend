// page/FavoritePage.jsx
import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService"; // uses your axios api.js
import PostCard from "../components/postCard";
import { Link } from "react-router-dom";

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]); // array of posts
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await getFavorites();
        // your controller returns `fav.posts` directly (array), so `data` is likely an array already
        setFavorites(Array.isArray(data) ? data : data?.posts || []);
        setError("");
      } catch (e) {
        console.error(e);
        setError("Failed to load favorites. Please try again later.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full" />
                  <div className="ml-3">
                    <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-16" />
                  </div>
                </div>
                <div className="h-6 bg-gray-200 rounded w-full mb-3" />
                <div className="space-y-2 mb-4">
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-3/4" />
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="h-4 bg-gray-100 rounded w-20" />
                  <div className="h-8 bg-gray-100 rounded w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-5xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-2">Saved Jobs</h1>
        <p className="text-red-600">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
        >
          Try Again
        </button>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-2xl font-bold mb-6">Saved Jobs</h1>

      {favorites.length === 0 ? (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2.5 2.5 0 00-2.5-2.5H15" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">No favorites yet</h3>
          <p className="text-gray-500 mb-6">
            Browse the <Link to="/home" className="text-blue-600 underline">latest jobs</Link> and tap the ♥ icon to save.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favorites.map((post) => (
            <PostCard key={post._id || post.id} post={post} />
          ))}
        </div>
      )}
    </main>
  );
}
