import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Drawer, Button, Divider, message } from 'antd';
import  { Grid, Typography, Paper } from '@material-ui/core'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import './ItemCard.css';
import ProductDetails from './ProductDetails.jsx';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { addToCart, removeFromCart } from "../../actions/buyerActions.js";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Delete from "@mui/icons-material/Delete.js";
import More from "@mui/icons-material/More.js";
import {Modal} from 'antd';

const confirm = Modal.confirm;
const ItemCard = ({ key, productData, inCart }) => {
    console.log("Inside item card: ", productData, inCart);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const myCart = useSelector((state) => state.buyerReducer.myCart); 
    const user = useSelector((state) => state.auth.authData);

    const addToMyCart = () => {
        
        const isProductInCart = myCart.find(item => item.product.productId === productData.product.productId);
    
        if (!isProductInCart) {
            dispatch(addToCart(user.result.id, productData, navigate));
        } else {
            message.error({content: 'Product already in cart!'});
        }
    }

    function showDeleteConfirm() {
        confirm({
              title: 'Are you sure delete this item?',
              content: 'The data can\'t be recovered later!',
              okText: 'Yes',
              okType: 'danger',
              cancelText: 'No',
              onOk() {
                const isProductInCart = myCart.find(item => item.product.productId === productData.product.productId);
                if(isProductInCart) {
                    dispatch(removeFromCart(user.result.id, productData.product.productId, navigate));
                } else {
                    message.error({content: 'Product not in cart!'});
                }
              },
              onCancel() {
                    console.log('Cancel');
              },
        });
  }

    const buy = (productId) => {
        
    }


    const [open, setOpen] = useState(false);
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };
    
    return (
        productData?.product?.productId !== 'undefined' ? (
            <>
                <div className="item-card" >
                    <div className="image-container" onClick={showDrawer}>
                        <img className="item-image" src={productData?.product?.productImages?.[0]} alt={productData?.product?.productName} />
                    </div>
                    
                    <div className="item-details">
                        <p className="product-id">Product ID: {productData?.product?.productId}</p>
                        <h3 className="item-name">{productData?.product?.productName}</h3>
                        <div className="price-and-button">
                            <p className="item-price">Price: {productData.product.sellingPrice}</p>
                            <div >
                                <IconButton aria-label="Expand" color="primary" onClick={showDrawer}>
                                    <More />
                                </IconButton>

                                {(inCart == true) ? (<IconButton aria-label="remove item" color="error">
                                    <Delete onClick={showDeleteConfirm}/>
                                </IconButton>) : null}
                                
                            </div>
                        </div>
                    </div>
                </div>



    
                <Drawer 
                    open={open}
                    title={productData.product.productName} 
                    width={1000} 
                    closable={true}
                    maskClosable={true}
                    onClose={onClose} 
                    
                    footer={
                        <div className='drawer-footer'>
                            <Button type="primary" danger onClick={() => buy(productData.product.productId)}> {productData.product.sellingPrice} </Button>
                            <Button type="primary" style={{ display: inCart ? 'none' : 'block' }} onClick={addToMyCart}> Add to cart </Button>
                        </div>
                    }
                >
    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
    
                        <div style={{ flex: 1 }}>
                            <ProductDetails product={productData.product} />
                        </div>
    
                        <Divider type="vertical" />
    
                        <div style={{ flex: 1, marginLeft: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card sx={{ maxWidth: 345 }} >
                                <CardMedia
                                    component="img"
                                    alt={productData.product.productName}
                                    height="500"
                                    image={productData?.product?.productImages?.[0]}
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        {productData.product.productName}
                                    </Typography>
                                </CardContent>

                                {/* {inCart === true ? (
                                        <CardActions disableSpacing>
                                            <IconButton aria-label="add to favorites">
                                                <FavoriteIcon />
                                            </IconButton>
                                            <IconButton aria-label="share">
                                                <ShareIcon />
                                            </IconButton>
                                        </CardActions>
                                    ) : null
                                } */}
                            </Card>
                        </div>
                    </div>
                </Drawer>
            </>
        ) : null
    );
        
};

export default ItemCard;
