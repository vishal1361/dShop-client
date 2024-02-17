import { CREATE, DELETE } from '../constants/actionTypes';


const productReducer = (state = { isLoading: true, products: [] }, action) => {
    switch (action.type) {
        case CREATE:
            return { ...state, products: [...state.products, action.payload] };
        case DELETE:
            return { ...state, products: state.products.filter((product) => product._id !== action.payload) };
        default:
            return state;
    }
};

export default productReducer;