import { CREATE, DELETE, FETCH_MY_PRODUCTS } from '../constants/actionTypes';


const sellerReducer = (state = { isLoading: true, myProducts: [] }, action) => {
    console.log(action);
    switch (action.type) {
        case FETCH_MY_PRODUCTS:
            return { ...state, myProducts: action.payload};
        case CREATE:
            return { ...state, myProducts: [...state.myProducts, action.payload] };
        case DELETE:
            return { ...state, myProducts: state.myProducts.filter((product) => product.productId !== action.payload) };
        default:
            return state;
    }
};

export default sellerReducer;