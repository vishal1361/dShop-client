import React, { useEffect, useState } from "react";
import useStyles from './style.js'
import  { TextField, Button, Typography, Paper } from '@material-ui/core'
// import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from "react-redux";
// import { createPost, updatePost } from "../../actions/posts.js";
import { useNavigate } from "react-router-dom";
import { Empty } from "antd";
import { Link } from "react-router-dom";

const MyOrders = ({buyerId}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id == currentId) : null);
  const user = JSON.parse(localStorage.getItem('profile'));

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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
                height: 200, // Adjust the height as needed
            }}
            description={
              <span>
              No orders yet! Explore our products and <Link to='/products'>shop here</Link>.
              </span>
          
            }
        >
            {/* <Button type="primary">Create Now</Button> */}
        </Empty>
  </div>
  )
}

export default MyOrders