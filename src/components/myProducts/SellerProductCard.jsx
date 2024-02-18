import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Avatar, Card  } from 'antd';
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from '@mui/icons-material/More';
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'antd';
import { removeProductByProductId } from "../../actions/sellerActions";
const { Meta } = Card;
const confirm = Modal.confirm;
// TODO: on click should get the chart data for product performance.



const SellerProductCard = ({key, productData}) => {
      console.log(productData.product);
      const dispatch = useDispatch();
      const navigate = useNavigate();

      const expandProduct = (key) => {

      }
      function showDeleteConfirm() {
            confirm({
                  title: 'Are you sure delete this item?',
                  content: 'The data associated will be permanently deleted!',
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk() {
                        console.log('OK');
                        // dispatch(removeProductByProductId( productData?.product?.sellerId, productData?.product?.productId, navigate));
                  },
                  onCancel() {
                        console.log('Cancel');
                  },
            });
      }
      


  return (
      <Card
            style={{ width: 300,}}
            cover={
                  <img alt="product" src={productData?.product?.productImages?.[0]} />
            }
            actions={[
                  
                  <MoreIcon className='icon1' onClick={expandProduct}/>,
                  <DeleteIcon className="icon1" onClick={showDeleteConfirm}/>
                  
            ]}
            
      >
            <Meta
                  // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title={`${productData?.product?.productName}`}
                  // description={`${productData?.product?.productSpecifications}`}
            />

      </Card>
  )
}

export default SellerProductCard