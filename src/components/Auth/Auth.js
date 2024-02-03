import React, {useState, useEffect} from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined.js';
import useStyles from './style.js';
import Input from './Input.js';
import Icon from './icon.js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {signin, signup} from '../../actions/auth.js'
const initialState = {firstName: '', lastName: '', email: '',  password: '', confirmPassword: ''};
const Auth = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const state = null;

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);
    const handleSubmit = (e) => {
        e.preventDefault()
        if(isSignUp) {
            dispatch(signup(formData, navigate));
        } else {
            dispatch(signin(formData, navigate))
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
                                </>
                            )
                        }
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