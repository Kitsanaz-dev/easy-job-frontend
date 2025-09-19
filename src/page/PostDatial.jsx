import React from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getPostById } from "../services/postService";
import { updatePostDetails } from "../services/postService";
import { deletePost } from "../services/postService";
import { commentPost } from "../services/postService";
import { likePost } from "../services/postService";
import { unLikePost } from "../services/postService";
import { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import {
  Heart,
  MessageCircle,
  Clock,
  User,
  Send,
  Edit3,
  Save,
  X,
  Trash,
  HeartCrack,
} from "lucide-react";
import Swal from "sweetalert2";

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [onlikeCheck, setOnlikeCheck] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await getPostById(id);
        console.log("Fetched post:", data);
        setPost(data);
        setEditTitle(data.title);
        setEditDescription(data.description);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch post:", error);
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await commentPost(id, { comment: newComment });

        if (response) {
          setPost((prev) => ({
            ...prev,
            comment: [...(prev.comment || []), newComment],
            updatedAt: new Date().toISOString(),
          }));
        }

        setNewComment(""); // clear input
      } catch (error) {
        if (error.response && error.response.status === 404) {
          Swal.fire({
            icon: "error",
            title: "Comment Failed",
            text: error.response.data?.message || "Post not found.",
            timer: 1500,
          });
        } else {
          console.error("Failed to update post:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong while updating the post.",
            timer: 1500,
          });
        }
      }
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    try {
      // Here you would typically make an API call to update the post
      const response = await updatePostDetails(id, {
        title: editTitle,
        description: editDescription,
      });
      console.log("Post updated:", response);

      console.log("post ni :", post);
      // Update local state (you should replace this with actual API call)
      setPost((prev) => ({
        ...prev,
        title: editTitle || prev.title,
        description: editDescription || prev.description,
        updatedAt: new Date().toISOString(),
      }));
      console.log(post);
      setIsEditing(false);
      // You can add API call here like: await updatePost(id, { title: editTitle, description: editDescription });
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Not your post");
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text:
            error.response.data?.message || "You can only edit your own posts.",
          timer: 1500,
        });
      } else {
        console.error("Failed to update post:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating the post.",
          timer: 1500,
        });
      }
      // Handle error (you can set an error state if needed)
    }
  };

  const handleCancelEdit = () => {
    setEditTitle(post.title);
    setEditDescription(post.description);
    setIsEditing(false);
  };

  const handleOnDeleteClick = async () => {
    try {
      const response = await deletePost(id);
      console.log(response);
      if (response) {
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Not your post");
        Swal.fire({
          icon: "error",
          title: "Delete Failed",
          text:
            error.response.data?.message || "You can only edit your own posts.",
          timer: 1500,
        });
      } else {
        console.error("Failed to update post:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating the post.",
          timer: 1500,
        });
      }
    }
  };

  const handleOnLikeClick = async () => {
    try {
      //call like method
      if (onlikeCheck === false) {
        const response = await likePost(id);
        if (response) {
          setOnlikeCheck(true);
          setPost((prev) => ({
            ...prev,
            likeCount: (prev.likeCount || 0) + 1,
            updatedAt: new Date().toISOString(),
          }));
        }
      } else {
        const response = await unLikePost(id);
        if (response) {
          setOnlikeCheck(false);
          setPost((prev) => ({
            ...prev,
            likeCount: (prev.likeCount || 0) - 1,
            updatedAt: new Date().toISOString(),
          }));
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.log("Not your post");
        Swal.fire({
          icon: "error",
          title: "Like Failed",
          text:
            error.response.data?.message || "You can only edit your own posts.",
          timer: 1500,
        });
      } else {
        console.error("Failed to update post:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Something went wrong while updating the post.",
          timer: 1500,
        });
      }
    }
  };

  const backToHome = () => {
    navigate("/home");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4">
          <div className="text-red-500 text-6xl mb-4 text-center">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            Oops!
          </h2>
          <p className="text-gray-600 text-center">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="absolute top-6 left-6 cursor-pointer">
        <FaArrowLeft className="w-8 h-8 text-blue-600" onClick={backToHome} />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Post Card */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8 transform hover:scale-[1.01] transition-all duration-300">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {post.userID?.name || "Unknown"}
                    </h3>
                    <div className="flex items-center text-purple-100 text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {new Date(post.createdAt).toLocaleString()}
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                {!isEditing ? (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleEditClick}
                      className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                      onClick={handleOnDeleteClick}
                    >
                      <Trash className="w-4 h-4" />
                      <span>delete</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    >
                      <X className="w-4 h-4" />
                      <span>Cancel</span>
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              {isEditing ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full p-4 text-3xl font-bold border-2 border-gray-200 rounded-2xl focus:border-purple-500 focus:ring-0 transition-colors duration-200"
                      placeholder="Enter post title..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      className="w-full p-4 text-lg border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:ring-0 transition-colors duration-200"
                      rows="6"
                      placeholder="Enter post description..."
                    />
                  </div>
                </div>
              ) : (
                <>
                  <h1 className="text-4xl font-bold text-gray-800 mb-6 leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {post.description}
                  </p>
                </>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-6 border-t pt-6">
                <div className="flex items-center space-x-2 px-4 py-2 rounded-full">
                  <button
                    className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2"
                    onClick={handleOnLikeClick}
                  >
                    <Heart className="w-5 h-5" />
                    <span className="font-semibold">{post.likeCount}</span>
                  </button>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">
                    {post.comment?.length || 0} Comments
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <MessageCircle className="w-6 h-6 mr-3" />
                Comments ({post.comment?.length || 0})
              </h2>
            </div>

            <div className="p-8">
              {/* Add Comment Form */}
              <div className="mb-8">
                <div className="flex space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-4 border-2 border-gray-200 rounded-2xl resize-none focus:border-purple-500 focus:ring-0 transition-colors duration-200"
                      rows="3"
                    />
                    <button
                      onClick={handleAddComment}
                      disabled={!newComment.trim()}
                      className="mt-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center space-x-2"
                    >
                      <Send className="w-4 h-4" />
                      <span>Post Comment</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Comments List */}
              <div className="space-y-6">
                {!post.comment || post.comment.length === 0 ? (
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No comments yet</p>
                    <p className="text-gray-400">
                      Be the first to share your thoughts!
                    </p>
                  </div>
                ) : (
                  post.comment.map((comment, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-2xl p-6 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-semibold text-gray-800">
                              {comment.author ||
                                comment.userID?.name ||
                                "Anonymous"}
                            </h4>
                            <span className="text-gray-400 text-sm">
                              {comment.createdAt
                                ? new Date(
                                    comment.createdAt
                                  ).toLocaleDateString()
                                : "Just now"}
                            </span>
                          </div>
                          <p className="text-gray-600 leading-relaxed">
                            {comment || "No content"}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
