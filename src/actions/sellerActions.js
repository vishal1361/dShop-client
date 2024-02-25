import { CREATE, UPDATE, DELETE, FETCH_MY_PRODUCTS } from '../constants/actionTypes';
import * as api from '../api';
import {message} from 'antd';


export const addProductData = (productFormData, navigate) => async (dispatch) => {
    try {
        message.loading({ content: `Adding product to shop...`, key: 'loading' }); 
        const data = await api.addProductData(productFormData);
        console.log(data);
        dispatch({ type: CREATE, payload: { product: productFormData } });
        message.success({content: "Product details uploded successfully!", key: 'loading'});
        navigate('/myProducts');
    } catch (error) {
        console.log(error);
        message.error("Product uploded failed!");
    }
};

export const getProductsBySellerId = (sellerId) => async (dispatch) => {
    try {
      message.loading({ content: `Fetching seller's products...`, key: 'loading' }); 
      const res = await api.getProductsBySellerId(sellerId);
      dispatch({ type: FETCH_MY_PRODUCTS, payload: res.data.sellerProducts});
      message.success({ content: "Products loaded successfully", key: 'loading' }); 
    } catch (error) {
      console.log(error);
      message.error({ content: "Failed to get products.", key: 'loading' }); 
    }
  };


  export const removeProductByProductId = (sellerId, productId, navigate) => async (dispatch) => {
    try {
      const status = await api.deleteProductByProductId(sellerId, productId);
  
      if (status) {
        dispatch({ type: DELETE, payload: productId });
        message.success('Product successfully removed from sale.');
      } else {
        message.warning('Unexpected response while removing product from sale.');
      }
      navigate('/myProducts');
    } catch (error) {
      console.error(error);
      message.error('Failed to remove product from sale. Please try again later.');
    }
  };