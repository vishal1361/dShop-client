import React, { useEffect, useState } from "react";
import useStyles from './style.js'
import  { Grid, TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
// import { createPost, updatePost } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";

const Form = ({ currentId, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id == currentId) : null);
    const user = JSON.parse(localStorage.getItem('profile'));

    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    });

    useEffect(() => {
        if(post) {
            setPostData(post);
        }
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault();

        // if(currentId) {
        //     dispatch(updatePost(currentId, {...postData, name: user?.result?.name}));
        // }
        // else {
        //     dispatch(createPost({...postData, name: user?.result?.name}, navigate));
        // }
        clear();
    }
    const clear = () => {
        setCurrentId(null);
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        });
    }

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
        <Paper className={classes.paper} elevation={6} >
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                {/* <Typography variant="h5">Adding product.</Typography> */}
                
                <Grid className={classes.Grid} container spacing={5}>
                    <Grid item xs={20}>
                        <TextField 
                            className={classes.TextField}
                            name="productName" 
                            variant="outlined" 
                            label="Product Name" 
                            fullWidth
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                        <TextField 
                            className={classes.TextField}
                            name="brandName" 
                            variant="outlined" 
                            label="Brand Name" 
                            fullWidth
                            value={postData.message}                    
                            onChange={(e) => setPostData({...postData, message: e.target.value})}/>

                    </Grid>

                    <Grid item xs={20}>
                        <TextField 
                            className={classes.TextField}
                            name="category" 
                            variant="outlined" 
                            label="Category" 
                            fullWidth
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                        <TextField 
                            className={classes.TextField}
                            name="sellingPrice" 
                            variant="outlined" 
                            label="Selling Price" 
                            fullWidth
                            value={postData.message}                    
                            onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                            
                    </Grid>

                    <Grid item xs={20}>
                        <TextField 
                            className={classes.TextField}
                            name="quantity" 
                            variant="outlined" 
                            label="Quantity" 
                            fullWidth
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                        <TextField 
                            className={classes.TextField}
                            name="productSpecification" 
                            variant="outlined" 
                            label="Product Specification" 
                            fullWidth
                            value={postData.message}                    
                            onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                            
                    </Grid>

                    <Grid item xs={20}>
                        <TextField 
                            className={classes.TextField}
                            name="shippingWeight" 
                            variant="outlined" 
                            label="Shipping Weight" 
                            fullWidth
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>

                        <TextField 
                            className={classes.TextField}
                            name="color" 
                            variant="outlined" 
                            label="Color" 
                            fullWidth
                            value={postData.message}                    
                            onChange={(e) => setPostData({...postData, message: e.target.value})}/>
                            
                    </Grid>
                    <Grid item xs={20}>
                        <TextField 
                            className={classes.LongTextField}
                            name="aboutProduct" 
                            variant="outlined" 
                            label="About Product" 
                            fullWidth
                            multiline
                            rows={5}
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                    </Grid>
                    <Grid item xs={20}>
                        <TextField 
                            className={classes.LongTextField}
                            name="technicalDetails" 
                            variant="outlined" 
                            label="Technical Details" 
                            fullWidth
                            multiline
                            rows={5}
                            value={postData.title}                    
                            onChange={(e) => setPostData({...postData, title: e.target.value})}/>
                            
                    </Grid>
                </Grid>

                

                <div className={classes.fileInput}>
                    <FileBase 
                        type="file" 
                        multiple={false}
                        onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}/>
                </div>

                <Grid item xs={20}>
                    <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth >Submit</Button>
                    <Button  className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth >Clear</Button>
                </Grid>
                
            </form>
        </Paper>
    );
}

export default Form;