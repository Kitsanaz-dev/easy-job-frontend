// page/ProfilePage.jsx
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/auth";
import { getMyPosts } from "../services/postService";
import PostCard from "../components/PostCard";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [myPosts, setMyPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // fetch user + (my posts & favorites) concurrently
        const [u, posts, favs] = await Promise.all([
          getUserInfo().catch(() => null),
          getMyPosts(),
          getFavorites().catch(() => []), // fallback if not logged in
        ]);

        if (u) {
          setUserName(u.name || u.username || "Guest");
          setUserEmail(u.email || "");
        }

        // build fav id set
        const favoriteArray = Array.isArray(favs) ? favs : favs?.posts || [];
        const favIds = new Set((favoriteArray || []).map(p => String(p._id || p.id)));

        // normalize ids & flag my posts as favorite
        const merged = (posts || []).map(p => {
          const _id = p._id || p.id;
          return { ...p, _id, isFavorite: favIds.has(String(_id)) };
        });

        setMyPosts(merged);
        setError(null);
      } catch (err) {
        console.error("Failed to load profile or posts:", err);
        setError("Failed to load user information or posts");
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
      setMyPosts(prev =>
        prev.map(p =>
          String(p._id || p.id) === String(postId) ? { ...p, isFavorite: nextState } : p
        )
      );
    } catch (e) {
      console.error("Favorite toggle failed:", e);
      // optional: toast error
    }
  };

  // ... keep your loading/error UIs
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* skeletons (kept from your version) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse"
              >
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
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Oops! Something went wrong
          </h2>
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
    <div className="max-w-7xl mx-auto px-4 py-8">
      <section className="flex items-center gap-4 mb-8">
        <FaUser className="text-2xl text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold">@{userName}</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>
        <div className="ml-auto">
          <Link
            to="/create-post"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            + New Post
          </Link>
        </div>
      </section>

      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      {myPosts.length === 0 ? (
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
            {myPosts.map((post) => (
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
  );
}
