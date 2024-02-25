import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { listAllProducts } from "../../actions/buyerActions.js";
import ItemCard from "../card/ItemCard.jsx";
import './ForSale.css'
import { Empty } from "antd";
import { Link } from "react-router-dom";
import outOfStock from '../assets/emptyShop.webp';

const ForSale = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const productsForSale = useSelector((state) => state.buyerReducer.productsForSale); 
    const user = useSelector((state) => state.auth.authData);
    console.log("Product to be sold: ", productsForSale);
    useEffect(() => {
        if (user && user.result) {
          dispatch(listAllProducts(user.result.id , navigate));
        }
    }, [dispatch, navigate, user]);


  return (
    <div>
        {(productsForSale.length !== 0) ? (
            <div className="popular-item">
                {
                    productsForSale.map((product) => {
                        console.log("ProductId in shop: ", product.product.productId);
                        return <ItemCard productData = {product} inCart={false}/>
                    })
                }
            </div>
        ) : (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
                <Empty
                    image={outOfStock}
                    imageStyle={{
                        height: 150, // Adjust the height as needed
                    }}
                    description={
                        <span>
                            Oops! Out of stock. 
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

export default ForSale