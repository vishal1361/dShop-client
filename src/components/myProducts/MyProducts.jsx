import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySellerId } from '../../actions/sellerActions.js';
import SellerProductCard from "./SellerProductCard.jsx";
import { Empty } from "antd";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Link } from 'react-router-dom';
import emptyStoreImage from '../assets/empty store.jpeg';
import './MyProducts.css'

const MyProducts = () => {
  console.log("Rendering Myproducts.");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [updateFlag, setUpdateFlag] = useState(false);
  
  const myProducts = useSelector((state) => state.sellerReducer.myProducts); 
  const user = useSelector((state) => state.auth.authData);

  useEffect(() => {
    if (user && user.result) {
      console.log("UseEffect Issue.");
      dispatch(getProductsBySellerId(user.result.id , navigate));
      setUpdateFlag(false);
    }
  }, [dispatch, navigate, user]);

  const handleDeleteCard = (productId) => {
    console.log("Rerendering...");
    setUpdateFlag(true);
  };

  return (
    myProducts.length !== 0 ? (
      <div className="productContainer">
        {myProducts.map((product) => (
          <div key={product.productId} className="productCard">
            <SellerProductCard productData={product} updateProducts={handleDeleteCard} />
          </div>
        ))}
      </div>
    ) : (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh' }}>
        <Empty
            image={emptyStoreImage}
            imageStyle={{
                height: 200, // Adjust the height as needed
            }}
            description={
              <span>
              Your store is empty! <Link to='/sell'>Start selling now...</Link>
              </span>
          
            }
        >
            {/* <Button type="primary">Create Now</Button> */}
        </Empty>
    </div>
  
    )
);


};

export default MyProducts;
