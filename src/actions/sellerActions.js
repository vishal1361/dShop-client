import { CREATE, UPDATE, DELETE } from '../constants/actionTypes';
import * as api from '../api';
import {message} from 'antd';

// action creators
export const addProductData = (productFormData) => async (dispatch) => {
    try {
        const { data } = await api.addProductData(productFormData);
        dispatch({ type: CREATE, payload: { product: data } });
        message.success("Product details uploded successfully!");
    } catch (error) {
        console.log(error);
        message.error("Product uploded failed!");
    }
};