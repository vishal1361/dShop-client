import {AUTH, LOGOUT} from '../constants/actionTypes.js'
import * as api from '../api/index.js'
import {message} from 'antd';

export const signin = (formData, navigate) => async (dispatch) => {
    try {
        message.loading({ content: `Signing in...`, key: 'loading' }); 
        const { data } = await api.signin(formData);
        dispatch({ type: AUTH, data });
        message.success({ content: `Welcome back, ${data.result.name}!`, key: 'loading' }); 
        navigate('/');
    } catch (error) {
        console.log(error);
        message.error({ content: "Login failed. Please check your credentials and try again.", key: 'loading' });
    }
}

export const signup = (formData, navigate) => async (dispatch) => {
    try {
        message.loading({ content: `Setting up. Please wait...`, key: 'loading' }); 
        const { data } = await api.signup(formData);
        dispatch({ type: AUTH, data });
        message.success({ content: `Welcome, ${data.result.name}! Your account has been created successfully.`, key: 'loading' }); 
        navigate('/');
    } catch (error) {
        console.log(error);
        message.error({ content: "Account creation failed. Please ensure all information is valid and try again.", key: 'loading' });
    }
}
