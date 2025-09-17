import React, { useEffect, useState } from 'react';
import { createPost } from '../services/postService';
import { getUserInfo } from '../services/auth';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Send, AlertCircle, ArrowLeft } from 'lucide-react';

const CreatePostPage = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserInfo();
                if (user) {
                    setUserName(user.name);
                    setUserEmail(user.email);
                }
            } catch (error) {
                setError("Failed to load user information");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        try {
            setSubmitting(true);
            
            if (!title.trim() || !description.trim()) {
                setError("Title and Description are required");
                return;
            }

            const post = {
                title: title.trim(),
                description: description.trim(),
            };

            const response = await createPost(post);
            console.log("Post created:", response);
            navigate('/home');
        } catch (error) {
            setError(error.message || "Failed to create post. Please try again.");
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
                <div className="bg-white rounded-xl shadow-lg p-8 flex items-center space-x-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                    <span className="text-gray-600 font-medium">Loading...</span>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header with User Info */}
            <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-4xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBack}
                            className="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="font-medium">Back</span>
                        </button>
                        
                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="h-10 w-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-white" />
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-900">{userName || 'User'}</p>
                                    <p className="text-xs text-gray-500">{userEmail || 'user@example.com'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
                        <div className="flex items-center space-x-3">
                            <FileText className="h-6 w-6 text-white" />
                            <h1 className="text-2xl font-bold text-white">Create New Post</h1>
                        </div>
                        <p className="text-indigo-100 mt-2">Share your thoughts with the community</p>
                    </div>

                    {/* Form Content */}
                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3">
                                <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0" />
                                <div>
                                    <p className="text-sm text-red-800 font-medium">Error</p>
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            </div>
                        )}

                        {/* Title Input */}
                        <div className="space-y-2">
                            <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                                Post Title
                            </label>
                            <input
                                id="title"
                                type="text"
                                placeholder="Enter your post title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500"
                                disabled={submitting}
                            />
                        </div>

                        {/* Description Input */}
                        <div className="space-y-2">
                            <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                                Description
                            </label>
                            <textarea
                                id="description"
                                placeholder="Write your post description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200 text-gray-900 placeholder-gray-500 resize-none"
                                disabled={submitting}
                            />
                            <p className="text-xs text-gray-500">
                                {description.length}/500 characters
                            </p>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end pt-4">
                            <button
                                type="submit"
                                disabled={submitting || !title.trim() || !description.trim()}
                                className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-4 focus:ring-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                {submitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                        <span>Creating Post...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        <span>Create Post</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Author Info Card */}
                <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">Author Information</h3>
                    <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-base font-semibold text-gray-900">{userName || 'Loading...'}</p>
                            <p className="text-sm text-gray-500">{userEmail || 'Loading...'}</p>
                            <p className="text-xs text-gray-400 mt-1">This post will be published under your name</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default CreatePostPage;