import React, { useState, useEffect } from 'react';
import { Drawer, Button } from 'antd';
import './ItemCard.css';
import ProductDetails from './ProductDetails.jsx';

const ItemCard = ({ productId, image, name, price }) => {

    const [open, setOpen] = useState(false);
  
    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

    const addToCart = (productId) => {

    }

    const buy = (productId) => {
        
    }

    return (
        <>
        
            <div className="item-card" onClick={showDrawer}>
                <img className="item-image" src={image} alt={name} />
                
                <div className="item-details">
                    <p className="product-id">Product ID: {productId}</p>
                    <h3 className="item-name">{name}</h3>
                    <div className="price-and-button">
                        <p className="item-price">Price: {price}</p>
                    </div>
                </div>
            </div>

            <Drawer 
                open={open}
                title={name} 
                width={750} 
                closable={true}
                maskClosable={true}
                onClose={onClose} 
                 
                footer={
                    <div className='drawer-footer'>
                        <Button type="primary" danger onClick= {buy(productId)}> {price} </Button>
                        <Button type="primary" onClick={addToCart(productId)}> Add to cart </Button>
                    </div>
                    
                }
            >
                <div className='item-images-container'>
                    <img className="item-drawer-image" src={image} alt={name} />
                </div>

                <hr/>
                <h1>Product details -</h1>
                    <ProductDetails />
                <hr/>
                
                
            </Drawer>
        </>
        
    );
};

export default ItemCard;
