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
//delete a post
export const deletePost = async (postId) => {
    try {
        const res = await api.delete(`/posts/${postId}`);
        return res.data;
    } catch (error) {
        console.error("Error updating post:", error);
        throw error;
    }
}

//comment a post
export const commentPost = async (postId,data) => {
    try {
        const res = await api.post(`/posts/${postId}/comment`,data)
        return res.data
    } catch (error) {
        console.error("Error comment post:",error)
        throw error;
    }
}
//like a post 
export const likePost = async (postId) => {
    try {
        const res = await api.put(`posts/${postId}/like`)
        return res.data
    } catch (error) {
        console.error("Error comment post:",error)
        throw error;
    }
}
//unlike a post
export const unLikePost = async (postId) => {
    try {
        const res = await api.put(`posts/${postId}/unlike`)
        return res.data
    } catch (error) {
        console.error("Error comment post:",error)
        throw error;
    }
}