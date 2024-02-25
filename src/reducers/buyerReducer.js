import { FETCH_ALL_PRODUCTS, BUY, FETCH_MY_ORDERS, CANCEL_MY_ORDER, ADD_TO_CART, FETCH_MY_CART, REMOVE_FROM_CART } from '../constants/actionTypes';

const buyerReducer = (state = {isLoading: true, productsForSale: [], myOrders: [], myCart: []}, action) => {
    console.log("Buyer Actions : ", action);
    switch (action.type) {
        case FETCH_ALL_PRODUCTS:
            return { ...state, productsForSale: action.payload};
        case BUY:
            return {...state, myOrders: [...state.myOrders, action.payload]};
        case FETCH_MY_ORDERS:
            return { ...state, myOrders: action.payload};
        case CANCEL_MY_ORDER:
            return { ...state, myOrders: state.myOrders.filter((order) => order.order.orderId !== action.payload) };
        case FETCH_MY_CART:
            return {...state, myCart: action.payload};
        case REMOVE_FROM_CART:
            return {...state, myCart: state.myCart.filter((product) => product.product.productId !== action.payload)};
        case ADD_TO_CART:
            return {...state, myCart: [...state.myCart, action.payload]};
        default:
            return state;
    }
}
export default buyerReducer;