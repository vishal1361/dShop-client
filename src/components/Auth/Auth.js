import React, {useState, useEffect} from 'react';
import { ethers, JsonRpcProvider, AlchemyProvider, Web3Provider } from 'ethers';
import { FormControlLabel, Radio, RadioGroup, Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined.js';
import useStyles from './style.js';
import Input from './Input.js';
import Icon from './icon.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../actions/auth.js'
import { message } from 'antd';
import MetaMaskOnboarding from '@metamask/onboarding'
const initialState = {firstName: '', lastName: '', email: '',  password: '', confirmPassword: ''};


const Auth = () => {
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [userBalance, setUserBalance] = useState(null);
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const provider = ((window.ethereum != null) ? new ethers.providers.Web3Provider(window.ethereum) : ethers.providers.getDefaultProvider());
    const installMetaMask = () => {
        const onboarding = new MetaMaskOnboarding();
        onboarding.startOnboarding();
    }

    const connectwalletHandler = async() => {
        try {
            if (window.ethereum && window.ethereum.isMetaMask) {
            
                // await provider.send({
                //     method: "wallet_switchEthereumChain",
                //     params: [{ chainId: "0x31337" }],
                //   });
    
                provider.send("eth_requestAccounts", []).then(async () => {
                    await accountChangedHandler(provider.getSigner());
                })
                message.success({content: "Metamask available!"});
            } else {
                message.error({content: "Installing MetaMask..."});
                installMetaMask();
            }
            return true;
        } catch(err) {
            message.error({content: 'Error boarding MetaMask!', key: 'loading'});
            return false;
        }
    }
    const accountChangedHandler = async (newAccount) => {
        const address = await newAccount.getAddress();
        setDefaultAccount(address);
        const balance = await newAccount.getBalance()
        setUserBalance(ethers.utils.formatEther(balance));
        await getuserBalance(address)
    }
    const getuserBalance = async (address) => {
        const balance = await provider.getBalance(address, "latest")
    }


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const state = null;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = async(e) => {
        console.log(formData)
        e.preventDefault()
        
        if(connectwalletHandler()) {
            const metaMaskSigner = await provider.getSigner();
            if(isSignUp) {
                dispatch(signup(formData, metaMaskSigner,  navigate));
            } else {
                dispatch(signin(formData,metaMaskSigner, navigate))
            }
        }
    };
    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    };

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId:"40228939995-gmmqrbqga75ljvh8gmcgfbm7k5f7mh5u.apps.googleusercontent.com",
                scope: 'email',
            });
        }
        gapi.load('client:auth2', start);
    }, []);

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;
        try {
            dispatch({type:'AUTH', data: {result, token}});
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    };

    const googleFailure = (error) => {
        console.log(error);
    };

    return (
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                                    <Input name="lastName" label="Last Name" handleChange={handleChange} half /> 
                                    
                                    <Input name="account" label='Account' handleChange={handleChange} type='password' />
                                </>
                            )
                        }
                        
                        <RadioGroup className={classes.Radio} name="userType" row onChange={handleChange}>
                            <FormControlLabel  value="BUYER" control={<Radio />} label="Buyer" />
                            <FormControlLabel  value="SELLER" control={<Radio />} label="Seller" />
                        </RadioGroup>
                        
                        <Input name="email" label='Email Address' handleChange={handleChange} type='email' />
                        <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                        {
                            isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
                        }
                    </Grid> 
                    <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit}>
                        { isSignUp ? "Sign Up" : "Sign In"}
                    </Button>
                    <GoogleLogin
                        clientId = "40228939995-gmmqrbqga75ljvh8gmcgfbm7k5f7mh5u.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button 
                                className={classes.googleButton} 
                                color='primary' 
                                fullWidth 
                                onClick={renderProps.onClick} 
                                disabled={renderProps.disabled} 
                                startIcon={<Icon />}
                                variant='contained'
                            >Google Sign In</Button>
                        )}
                        isSignedIn = {false}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy= {'single_host_origin'}
                    />
                    <Grid container justifyContent='flex-end'>
                        <Grid item >
                            <Button onClick={switchMode}>
                                {
                                    isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    )
}

export default Auth