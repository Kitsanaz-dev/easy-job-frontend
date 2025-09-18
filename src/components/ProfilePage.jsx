import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import { getUserInfo } from "../services/auth";

export default function ProfilePage() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder “my posts”
  const myPosts = []; // fetch from API later

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const u = await getUserInfo();
        if (u) {
          setUserName(u.name || u.username || "Guest");
          setUserEmail(u.email || "");
        }
      } catch (err) {
        setError("Failed to load user information");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Loading State */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
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
    <div className="max-w-5xl mx-auto px-4 py-8">
      <section className="flex items-center gap-4 mb-8">
        <FaUser className="text-2xl text-gray-700" />
        <div>
          <h1 className="text-2xl font-bold">@{userName}</h1>
          <p className="text-gray-600">{userEmail}</p>
        </div>
      </section>

      <h2 className="text-xl font-semibold mb-4">My Posts</h2>
      {myPosts.length === 0 ? (
        <p className="text-gray-600">
          You haven’t posted yet.{" "}
          <Link to="/create-post" className="text-blue-600 underline">
            Create one
          </Link>
          .
        </p>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {myPosts.map((p) => (
            <li key={p._id} className="border rounded-lg p-4 hover:shadow">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {p.description}
              </p>
              <Link
                to={`/post/${p._id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                View
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
