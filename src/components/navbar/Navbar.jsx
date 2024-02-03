import React, { useState, useEffect} from 'react'
import './Navbar.css'
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core';
import useStyles from './styles'
import logo from '../assets/logo.jpeg'
import cart from '../assets/cart.svg'
import {Link} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import decode from 'jwt-decode';

const Navbar = () => {
  const classes = useStyles();
  const [useMenu, setMenu] = useState("Men");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

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
        <li onClick={()=>{setMenu("Shop")}}> <Link style={{textDecoration: 'none'}} to='/products'>Shop</Link> {useMenu === "Shop" ? <hr/> : <></>}</li>
        <li onClick={()=>{setMenu("Sell")}}> <Link style={{textDecoration: 'none'}} to='/sell'>Sell</Link> {useMenu === "Sell" ? <hr/> : <></>}</li>
        <li onClick={()=>{setMenu("MyOrders")}}> <Link style={{textDecoration: 'none'}}to='/myOrders'>My Orders</Link> {useMenu === "MyOrders" ? <hr/> : <></>}</li>
        
      </ul>


      
      <div className='nav-login-cart'>
        <Link style={{textDecoration: 'none'}}to='/cart'> 
            <img src={cart} alt="cart" />
          </Link>
        <div className="nav-cart-count">0</div>
        <div>
          {
            user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    
                </div>
            ) : (
              <Link style={{textDecoration: 'none'}}to='/auth'> <button>Login</button> </Link>
            )
          }

        </div>
      </div>
    </div>
  )
}

export default Navbar;
