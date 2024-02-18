import { CREATE, UPDATE, DELETE, FETCH_MY_PRODUCTS } from '../constants/actionTypes';
import * as api from '../api';
import {message} from 'antd';


export const addProductData = (productFormData) => async (dispatch) => {
    try {
        const data = await api.addProductData(productFormData);
        console.log(data);
        dispatch({ type: CREATE, payload: { product: productFormData } });
        message.success("Product details uploded successfully!");
    } catch (error) {
        console.log(error);
        message.error("Product uploded failed!");
    }
};

export const getProductsBySellerId = (sellerId) => async (dispatch) => {
    try {
      message.loading({ content: `Fetching seller's products...`, key: 'loading' }); // Show loading message
      const res = await api.getProductsBySellerId(sellerId);
      dispatch({ type: FETCH_MY_PRODUCTS, payload: res.data.sellerProducts});
      message.success({ content: "Products loaded successfully", key: 'loading' }); // Show success message
    } catch (error) {
      console.log(error);
      message.error({ content: "Failed to get products.", key: 'loading' }); // Show error message
    }
  };


export const removeProductByProductId = (sellerId, productId) => async(dispatch) => {
    try {
        const status = await api.deleteProductByProductId(sellerId, productId);
        dispatch({ type: DELETE, payload: productId });
        message.success("Displaying seller's products...");
    } catch(error) {
        console.log(error);
        message.error("Failed to remove product from sale!");
    }
}