import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useStyles from './style.js'
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch } from "react-redux";
import { HiDocumentPlus } from "react-icons/hi2";
import axios from 'axios';
import {addProductData} from '../../actions/sellerActions.js'
import  {  message, Upload  } from 'antd';
const { Dragger } = Upload;

const Form = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const user = JSON.parse(localStorage.getItem('profile'));

    const [productFormData, setProductFormData] = useState({
        productName: '',
        brandName: '',
        category: '',
        sellingPrice: '',
        color : '',
        quantity : '',
        shippingWeight: '',
        productSpecifications: '',
        aboutProduct: '',
        technicalDetails: '',
        productImages: [],
    });

    useEffect(() => {
        if(productFormData) {
            setProductFormData(productFormData);
        }
    }, [productFormData])


    const sendToIPFS = async (e) => {

        if (productFormData) {
            try {

                const formData = new FormData();
                formData.append("file", productFormData.selectedFile);
                // console.log(productFormData);
                const res = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    maxContentLength: 'Infinity',
                    data: formData,
                    headers: {
                        'pinata_api_key': 'cc191261f396747f3039',
                        'pinata_secret_api_key': '3fd1334847be6f5e8cf577f8ba2e219e952ad470c87b7545bf8f3761d1f33105',
                        "Content-Type": "multipart/form-data"
                    },
                });

                const hash = `ipfs://${res.data.IpfsHash}`;
                message.success(`Product save @ ${hash}`);
                return hash;
            } catch (error) {
                console.log(error);
                message.error("Error uploding product @ PINATA!");
                throw error("Product upload failed")
            }
        }
    }

    const handleSubmit = async(e) => {
        console.log(productFormData);
        e.preventDefault();
        try {
            if(productFormData.productImages.length == 0) {
                message.error("Add product images!");

            } else {
                //uploading data on IPFS from server
                // const hash = await sendToIPFS({...productFormData, sellerId: user?.result?.id});
                dispatch(addProductData({...productFormData, sellerId: user?.result?.id}, navigate));
                // clear();
            }
        } catch(error) {
            message.error("Product upload declined by Pinata");
        }
        
    }

    const clear = () => {
        
        setProductFormData({
            productName: '',
            brandName: '',
            category: '',
            sellingPrice: '',
            color : '',
            quantity : '',
            shippingWeight: '',
            productSpecifications: '',
            aboutProduct: '',
            technicalDetails: '',
            productImages: []
        });

    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.pageContainer}>
                <Typography variant="h6" align="center" >
                    Plese Sign In.
                </Typography>
            </Paper>
        )
    }

    return (
        <div className={classes.pageContainer}>
            <form autoComplete="off"  noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Paper className={classes.paper} elevation={6} >

                    <Grid className={classes.Grid} container spacing={5}>
                        <Grid item xs={20}>
                            <TextField 
                                className={classes.TextField}
                                name="productName" 
                                variant="outlined" 
                                label="Product Name" 
                                fullWidth
                                required = {true}
                                value={productFormData.productName}                    
                                onChange={(e) => setProductFormData({...productFormData, productName: e.target.value})}/>

                            <TextField 
                                className={classes.TextField}
                                name="brandName" 
                                variant="outlined" 
                                label="Brand Name" 
                                required = {true}
                                fullWidth
                                value={productFormData.brandName}                    
                                onChange={(e) => setProductFormData({...productFormData, brandName: e.target.value})}/>

                        </Grid>
                    </Grid>
                </Paper>

                <Paper className={classes.paper} elevation={6} >
                    <Grid className={classes.Grid} container spacing={5}>
                        <Grid item xs={20}>
                            <TextField 
                                className={classes.TextField}
                                name="category" 
                                variant="outlined" 
                                label="Category" 
                                fullWidth
                                required = {true}
                                value={productFormData.category}                    
                                onChange={(e) => setProductFormData({...productFormData, category: e.target.value})}/>

                            <TextField 
                                className={classes.TextField}
                                name="sellingPrice" 
                                variant="outlined" 
                                label="Selling Price" 
                                fullWidth
                                required = {true}
                                value={productFormData.sellingPrice}                    
                                onChange={(e) => setProductFormData({...productFormData, sellingPrice: e.target.value})}/>
                            
                            <TextField 
                                className={classes.TextField}
                                name="color" 
                                variant="outlined" 
                                label="Color" 
                                fullWidth
                                required = {true}
                                value={productFormData.color}                    
                                onChange={(e) => setProductFormData({...productFormData, color: e.target.value})}/>
                                

                        </Grid>
                    </Grid>    
                </Paper>
                
                <Paper className={classes.paper} elevation={6} >
                    <Grid className={classes.Grid} container spacing={5}>
                        <Grid item xs={20}>
                            <TextField 
                                className={classes.TextField}
                                name="quantity" 
                                variant="outlined" 
                                label="Quantity" 
                                fullWidth
                                required = {true}
                                value={productFormData.quantity}                    
                                onChange={(e) => setProductFormData({...productFormData, quantity: e.target.value})}/>
                            <TextField 
                                className={classes.TextField}
                                name="productSpecifications" 
                                variant="outlined" 
                                label="Product Specification" 
                                fullWidth
                                required = {true}
                                value={productFormData.productSpecifications}                    
                                onChange={(e) => setProductFormData({...productFormData, productSpecifications: e.target.value})}/>
                            
                            <TextField 
                                className={classes.TextField}
                                name="shippingWeight" 
                                variant="outlined" 
                                label="Shipping Weight" 
                                fullWidth
                                required = {true}
                                value={productFormData.shippingWeight}                    
                                onChange={(e) => setProductFormData({...productFormData, shippingWeight: e.target.value})}/>

                        </Grid>
                    </Grid>
                </Paper>
                
                <Paper className={classes.paper} elevation={6} >
                    <Grid className={classes.Grid} container spacing={5}>
                        <TextField 
                                className={classes.LongTextField}
                                name="aboutProduct" 
                                variant="outlined" 
                                label="About Product" 
                                fullWidth
                                multiline
                                required = {true}
                                rows={5}
                                value={productFormData.aboutProduct}                    
                                onChange={(e) => setProductFormData({...productFormData, aboutProduct: e.target.value})}/>
                        
                        <TextField 
                                className={classes.LongTextField}
                                name="technicalDetails" 
                                variant="outlined" 
                                label="Technical Details" 
                                fullWidth
                                multiline
                                required = {true}
                                rows={5}
                                value={productFormData.technicalDetails}                    
                                onChange={(e) => setProductFormData({...productFormData, technicalDetails: e.target.value})}/>
                                
                    </Grid>
                </Paper>
                
                <Paper className={classes.paper} elevation={6} >
                    <Grid className={classes.Grid} container spacing={5} justify="center" >
                        <Grid item xs={20}>
                            <Dragger
                                className={classes.draggerContainer}
                                listType="picture"
                                name="productImages"
                                multiple={true}
                                required
                                fileList={productFormData.productImages}
                                accept=".png,.jpeg,.jpg,.svg"
                                onChange={(info) => {
                                    setProductFormData({
                                        ...productFormData,
                                        productImages: info.fileList
                                      });                                                                            
                                }}
                                onDrop={(e) => {
                                    console.log('Dropped files', e.dataTransfer.files);
                                }}
                            >
                                <p className="ant-upload-drag-icon">
                                    {/* <InboxOutlined /> */}
                                    <HiDocumentPlus />
                                </p>
                                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                                <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading banned files.
                                </p>
                            </Dragger>
                        </Grid>
                    </Grid>
                </Paper>

                {/* <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={true}
                        onDone={({ base64 }) => setProductFormData({ ...productFormData, selectedFile: base64 })}/>
                </div> */}

                <Grid item xs={20}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                    <Button  className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
                </Grid>
                
            </form>
        </div>
    );
}

export default Form;