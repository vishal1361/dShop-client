import { FETCH_ALL_PRODUCTS, BUY, FETCH_MY_ORDERS, CANCEL_MY_ORDER, ADD_TO_CART, FETCH_MY_CART, REMOVE_FROM_CART } from '../constants/actionTypes';
import * as api from '../api';
import {message} from 'antd';

export const listAllProducts = () => async (dispatch) => {
    try {
        message.loading({ content: 'Fetching products...', key: 'loading' });
        
        const res = await api.listAllProducts();
        dispatch({ type: FETCH_ALL_PRODUCTS, payload: res.data.productsForSale });

        message.success( {content: 'Products retrieved successfully.', key: 'loading' }); 
    } catch (error) {
        console.error(error);

        if (error.response) {
            const { status, data } = error.response;

            if (status === 404) {
                message.error('Products not found. Please try again later.');
            } else {
                message.error(`Server error: ${status} - ${data.message}`);
            }
        } else if (error.request) {
            message.error('No response from the server. Please check your internet connection.');
        } else {
            message.error('An unexpected error occurred. Please try again later.');
        }
    }
};

export const addToCart = (buyerId, productData, navigate) => async (dispatch) => {
    try {
        console.log(buyerId, productData.product.productId);
        if(buyerId===undefined || productData === undefined || productData.product.productId === undefined) {
            message.error({content: `Failed to add product to the cart.` , key: 'loading'});
            return;
        }
        console.log("Adding to cart: ", productData.product);
        message.loading({ content: 'Adding product to the cart...', key: 'loading' });
        const res = await api.addToCart(buyerId, productData.product.productId);
        dispatch({ type: ADD_TO_CART, payload: productData});
        message.success( { content: 'Product added to the cart successfully.', key: 'loading' }); 
    } catch (error) {
        console.error(error);
        message.error({content: `Failed to add product to the cart!` , key: 'loading'});
    }
};

export const removeFromCart = (buyerId, productId, navigate) => async (dispatch) => {
    try {
        if(buyerId===undefined || productId === undefined) {
            message.error({content: `Failed to remove product from the cart.` , key: 'loading'});
            return;
        }
        message.loading({ content: 'Removing product from the cart...', key: 'loading' });

        const status = await api.removeFromCart(buyerId, productId);

        dispatch({ type: REMOVE_FROM_CART, payload: productId });

        message.success( {content: 'Product removed from the cart successfully.', key: 'loading' }); 
        navigate('/cart');
    } catch (error) {
        console.error(error);
        message.error('Failed to remove product from the cart. Please try again.');
    }
};

export const getCart = (buyerId) => async (dispatch) => {
    try {
        message.loading({ content: 'Fetching cart...', key: 'loading' });

        const res = await api.getCart(buyerId);

        dispatch({ type: FETCH_MY_CART, payload: res.data.myCart });
        message.success( {content:'Cart retrieved successfully.', key: 'loading' }); 
    } catch (error) {
        console.error(error);
        message.error('Failed to retrieve cart. Please try again.');
    }
};