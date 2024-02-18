import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySellerId } from '../../actions/sellerActions.js';
import SellerProductCard from "./SellerProductCard.jsx";

const MyProducts = () => {
  console.log("Rendering Myproducts.");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const myProducts = useSelector((state) => state.sellerReducer.myProducts); 
  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (user && user.result) {
      console.log("UseEffect Issue.");
      dispatch(getProductsBySellerId(user.result.id , navigate));
    }
  }, [user]);

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {myProducts.map((product) => (
          <SellerProductCard key={product.productId} productData={product} />
        ))}
      </div>
    </div>
  );
};

export default MyProducts;
