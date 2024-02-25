import axios from 'axios';
import { URL } from '../constants/url.js';

const API = axios.create({baseURL: URL})

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});


export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);

export const addProductData = (productFormData) => API.post('/seller/addProduct', productFormData);
export const getProductsBySellerId = (sellerId) => API.get(`/seller/${sellerId}/myProducts`);
export const deleteProductByProductId = (sellerId, productId) => API.delete(`/seller/${sellerId}/myProducts/${productId}`);

export const listAllProducts = () => API.get('/buyer/shop');
export const placeOrder = (buyerId, productId, orderDetails) => API.post(`buyer/${buyerId}/placeOrder/${productId}`, orderDetails);
export const myOrders = (buyerId) => API.get(`/buyer/${buyerId}/myOrders`);
export const cancelOrder = (buyerId, orderId) => API.delete(`/buyer/${buyerId}/myOrders/${orderId}`);

export const addToCart = (buyerId, productId) => API.post(`/buyer/${buyerId}/addToCart/${productId}`);
export const getCart = (buyerId) => API.get(`/buyer/${buyerId}/myCart`);
export const removeFromCart = (buyerId, productId) => API.delete(`/buyer/${buyerId}/removeFromCart/${productId}`);