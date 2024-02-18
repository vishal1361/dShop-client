import axios from 'axios';
import { URL } from '../constants/url.js';

const API = axios.create({baseURL: URL})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});
// export const fetchPost = (id) => API.get(`/posts/${id}`);
// export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags ||'none'}`);
// export const createPost = (newPost) => API.post('/posts', newPost);
// export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
// export const deletePost = (id) => API.delete(`/posts/${id}`);
// export const likePost = (id) => API.patch(`/posts/${id}/likePost`);


export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const addProductData = (productFormData) => API.post('/seller/addProduct', productFormData);
export const getProductsBySellerId = (sellerId) => API.get(`/seller/${sellerId}/myProducts`);
export const deleteProductByProductId = (sellerId, productId) => API.delete(`/seller/${sellerId}/myProducts/${productId}`);