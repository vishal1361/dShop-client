import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {  Avatar, Card  } from 'antd';
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from '@mui/icons-material/More';
import { useDispatch, useSelector } from "react-redux";
import { Modal, Table, Divider } from 'antd';
import { removeProductByProductId } from "../../actions/sellerActions";
const { Meta } = Card;
const confirm = Modal.confirm;
// TODO: on click should get the chart data for product performance.

const columns = [
      {
            title: 'Specifications',
            dataIndex: 'name',
            key: 'name',
      },
      {
            title: 'Details',
            dataIndex: 'value',
            key: 'value',
      },
];

const SellerProductCard = ({key, productData, updateProducts}) => {
      console.log(productData.product);
      const [open, setOpen] = useState(false);

      const dispatch = useDispatch();
      const navigate = useNavigate();

      function showDeleteConfirm() {
            confirm({
                  title: 'Are you sure delete this item?',
                  content: 'The data associated will be permanently deleted!',
                  okText: 'Yes',
                  okType: 'danger',
                  cancelText: 'No',
                  onOk() {
                        console.log('OK');
                        dispatch(removeProductByProductId( productData.product.sellerId, productData.product.productId, navigate));
                        updateProducts();
                  },
                  onCancel() {
                        console.log('Cancel');
                  },
            });
      }
      const formattedData = [
            { name: 'Product Name', value: productData.product.productName },
            { name: 'Brand Name', value: productData.product.brandName },
            { name: 'Category', value: productData.product.category },
            { name: 'Selling Price', value: productData.product.sellingPrice },
            { name: 'Color', value: productData.product.color },
            { name: 'Quantity', value: productData.product.quantity },
            { name: 'Shipping Weight', value: productData.product.shippingWeight },
            { name: 'Product Specifications', value: productData.product.productSpecifications },
            { name: 'About Product', value: productData.product.aboutProduct },
            { name: 'Technical Details', value: productData.product.technicalDetails },
      ];
        


  return (
      
      <Card
            style={{ width: 280,}}
            cover={
                  <img alt="product" src={productData?.product?.productImages?.[0]} />
            }
            actions={[
                  
                  <MoreIcon className='icon1' onClick={() => setOpen(true)}/>,
                  <DeleteIcon className="icon1" onClick={showDeleteConfirm}/>
                  
            ]}
            
      >
            <Meta
                  // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                  title={`${productData?.product?.productName}`}
                  // description={`${productData?.product?.productSpecifications}`}
            />


            <Modal
            title={`${productData?.product?.productName}`}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1200}
            bodyStyle={{ maxHeight: '100vh', backdropFilter: 'blur(5px)' }}
            maskStyle={{ backdropFilter: 'blur(5px)' }}
            // okButtonProps={{ style: { display: 'none' } }}
            // cancelButtonProps={{ style: { display: 'none' } }}
            footer = {null}
            >
                  
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                        
                        <div style={{ flex: 1 }}>
                              <Table columns={columns} dataSource={formattedData} pagination={false} scroll={{y: 600,}}/>
                        </div>

                        
                        <Divider type="vertical" />

                        
                        <div style={{ flex: 1, marginLeft: '16px', overflowY: true }}>
                              <Grid container justifyContent="center" alignItems="center" style={{ height: '300px', padding: '16px' }}>
                                    <img alt="product" src={productData?.product?.productImages?.[0]} style={{ height: '100%', width: 'auto' }} />
                              </Grid>
                              <Divider />
                              <Grid container justifyContent="center" alignItems="center" style={{ height: '300px', border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
                                    <span>Chart Space</span>
                              </Grid>
                        
                        </div>
                  </div>
            </Modal>

      </Card>
  )
}

export default SellerProductCard