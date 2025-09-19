// components/PostCard.jsx
import React, { useState } from "react";
import { toggleFavorite } from "../services/favoriteService";

const PostCard = ({ post }) => {
  const postId = post._id || post.id;
  const [isFav, setIsFav] = useState(Boolean(post.isFavorite)); // if your API adds this flag
  const [busy, setBusy] = useState(false);

  const onToggleFav = async (e) => {
    e.stopPropagation(); // don't trigger parent clicks
    e.preventDefault();  // don't navigate if inside a link
    if (busy) return;

    setBusy(true);
    const prev = isFav;
    setIsFav(!prev); // optimistic UI

    try {
      await toggleFavorite(postId, prev);
    } catch (err) {
      console.error("Favorite toggle failed:", err);
      setIsFav(prev); // revert on error
      // TODO: show toast if you have one
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
      {/* Favorite button (top-right) */}
      <button
        onClick={onToggleFav}
        disabled={busy}
        aria-label={isFav ? "Remove from favorites" : "Add to favorites"}
        className={[
          "absolute top-3 right-3 z-10 rounded-full px-3 py-1.5 flex items-center gap-2 text-sm font-medium transition",
          "backdrop-blur-sm",
          isFav
            ? "bg-red-500 text-white border border-red-500 hover:brightness-95"
            : "bg-white text-gray-900 border border-black hover:bg-gray-50",
          busy ? "opacity-70 cursor-not-allowed" : "cursor-pointer",
        ].join(" ")}
      >
        {/* Heart icon */}
        <svg
          className={`w-4 h-4 ${isFav ? "fill-current" : ""}`}
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          fill={isFav ? "currentColor" : "none"}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span>{isFav ? "Saved" : "Save"}</span>
      </button>

      {/* Card Body */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.userID?.name?.charAt(0).toUpperCase() || "U"}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {post.userID?.name || "Unknown Author"}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {post.title || "Untitled Post"}
        </h3>

        {/* Post Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {post.description || "No description available for this post."}
        </p>

        {/* Post Stats/Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likeCount || 0}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comment?.length || 0}</span>
            </div>
          </div>

          <button
            className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 px-3 py-1 rounded-md transition-all duration-200"
            onClick={() => (window.location.href = `/post/${postId}`)}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
