import React, { useState, useEffect} from 'react'
import './Navbar.css'
import { AppBar, Avatar, Toolbar, Typography, Button, Modal, Paper} from '@material-ui/core';
import {  Popover, ConfigProvider  }  from 'antd';
import useStyles from './styles'
import logo from '../assets/logo.jpeg'
import cart from '../assets/cart.svg'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';
import Profile from './Profile';

const Navbar = () => {
  const classes = useStyles();


  const [useMenu, setMenu] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  console.log("User : ", user);


  
  useEffect(() => {
    const token = user?.token;
    if(token) {
        const decodedToken = decode(token);
        if(decodedToken.exp * 1000 < new Date().getTime()) {
            logout();
        }
    }
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const logout = () => {
      dispatch({type: 'LOGOUT'});
      navigate('/');
  }

            
  return (
    <div className='navbar'>

      <div className='nav-logo'>
        <Link style={{textDecoration: 'none'}}to='/'>
          <img src={logo} alt="" />
        </Link>
        <p>dShop</p>
      </div>

      <ul className='nav-menu'>
        
        {user && user.result.userType === "BUYER" && (
          <>
            <li onClick={()=>{setMenu("Shop")}}> 
              <Link style={{textDecoration: 'none'}} to='/products'>Shop Now</Link> 
              {useMenu === "Shop" ? <hr/> : <></>}
            </li>

            <li onClick={()=>{setMenu("MyOrders")}}> 
              <Link style={{textDecoration: 'none'}}to='/myOrders'>My Orders</Link> 
              {useMenu === "MyOrders" ? <hr/> : <></>}
            </li>

            <div className='nav-cart'>
            {user && user.result.userType === "BUYER" && (
              <>
                <Link style={{textDecoration: 'none'}}to='/cart'> 
                  <img src={cart} alt="cart" style={{ width: '35px', height: '35px' }}/>
                </Link>
                <div className="nav-cart-count">0</div>
              </>
              
            )}
            </div>
          </>
        )}


        {user && user.result.userType === "SELLER" && (
          <>
            <li onClick={() => {setMenu("Sell")}}>
              <Link style={{textDecoration: 'none'}} to='/sell'>Sell Now</Link>
              {useMenu === "Sell" ? <hr/> : <></>}
            </li>

            <li onClick={()=>{setMenu("MyProducts")}}> 
              <Link style={{textDecoration: 'none'}}to='/myProducts'>My Products</Link> 
              {useMenu === "MyProducts" ? <hr/> : <></>}
            </li>

            <li onClick={()=>{setMenu("Dashboard")}}> 
              <Link style={{textDecoration: 'none'}}to='/dashboard'>Dashboard</Link> 
              {useMenu === "Dashboard" ? <hr/> : <></>}
            </li>
          </>
        )}
      </ul>
        
      {
        (user) ? (
            <div className={classes.profile}>
                <Popover placement="bottom"  content={<Profile user={user}/>}>
                  <Avatar
                      className={classes.purple}
                      alt={user.result.name}
                      src={user.result.imageUrl}
                  >
                    {user.result.name.charAt(0)}
                  </Avatar>
                </Popover>

                <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
        ) : (
          <div className={classes.profile}>
            <Link style={{textDecoration: 'none'}} to='/auth'> 
              <Button variant="contained"  color="Primary" >Login</Button>
            </Link>
          </div>
        )
      }

             
    </div>
  )
}

export default Navbar;
