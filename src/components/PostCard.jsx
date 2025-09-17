// PostCard.jsx
import React from 'react'

const PostCard = ({ post }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-gray-200 group">
      {/* Card Header */}
      <div className="p-6">
        {/* Author Info */}
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">
              {post.userID?.name?.charAt(0).toUpperCase() || 'U'}
            </span>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">
              {post.userID?.name || 'Unknown Author'}
            </p>
            <p className="text-xs text-gray-500">
              {new Date(post.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Post Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
          {post.title || 'Untitled Post'}
        </h3>

        {/* Post Description */}
        <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
          {post.description || 'No description available for this post.'}
        </p>

        {/* Post Stats/Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>{post.likeCount || 0}</span>
            </div>
            <div className="flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{post.comment?.length || 0}</span>
            </div>
          </div>
          
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm hover:bg-blue-50 px-3 py-1 rounded-md transition-all duration-200"
            onClick={() => window.location.href = `/post/${post._id}`}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  )
}

export default PostCard