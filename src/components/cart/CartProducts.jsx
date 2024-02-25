import React, { useEffect, useState } from "react";
import useStyles from './style.js'
import  { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ItemCard from "../card/ItemCard.jsx";
import { getCart } from "../../actions/buyerActions.js";
import { Empty } from "antd";
import emptyCart from '../assets/emptyCart.webp'
import { Link } from "react-router-dom";
const CartProducts = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const myCart = useSelector((state) => state.buyerReducer.myCart); 
    const user = useSelector((state) => state.auth.authData);
    console.log("myCart: ", myCart);
    
    useEffect(() => {
        if (user && user.result) {
          dispatch(getCart(user.result.id, navigate));
        }
    }, [dispatch, navigate, user]);


    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center" >
                    Plese Sign In.
                </Typography>
            </Paper>
        )
    }


    return (
        <div>
        {
            (myCart.length !== 0) ? (
                <div className="popular-item">
                    {
                        myCart.map((product) => { 
                            return <ItemCard key={product?.productId} productData={product} inCart={true} />
                        })
                    }
                </div>
            ) : (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Empty
                        image={emptyCart}
                        imageStyle={{
                            height: 170,
                        }}
                        description={
                            <span>
                                Your cart is empty. <Link to='/products'>Shop now!</Link>
                            </span>


                        }
                    >
                        {/* <Button type="primary">Create Now</Button> */}
                    </Empty>
                </div>
            )
        }
        </div>
    )
}

export default CartProducts