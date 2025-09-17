import api from "./api";
//get all posts
export const getAllPosts = async () => {
    try {
        const res = await api.get('/posts');
        return res.data;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error;
    }
};
//get single post by id
export const getPostById = async (postId) => {
    try {
        const res = await api.get(`/posts/${postId}`);
        return res.data;
    } catch (error) {
        console.error("Error fetching post by ID:", error);
        throw error;
    }
};
//create a post
export const createPost = async (postData) => {
    try {
        const res = await api.post('/posts', postData);
        return res.data;
    } catch (error) {
        console.error("Error creating post:", error);
        throw error;
    }
};

//update a post
export const updatePostDetails = async (postId, postData) => {
    try {
        const res = await api.put(`/posts/${postId}`, postData);
        return res.data;
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}
