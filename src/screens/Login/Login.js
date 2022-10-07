import React, { useCallback, useEffect, useState } from 'react';
import './Login.css';
import { TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import { useDispatch, useSelector } from 'react-redux';
import { signUpUserAction, signInUserAction } from '../../Redux/Saga/User/UserActions';

function Login() {
    const [renderType, setRenderType] = useState('login');
    const [userEmail, setUserEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const dispatch = useDispatch();
    const errorMsg = useSelector(state => state.userSlice.error);
    const [userCreated, setUserCreated] = useState(false);
    const isUserCreated = useSelector(state => state.userSlice.userCreated)
    const loggedUser = useSelector(state => state.userSlice.user)

    const onClickHandler = (type) => {
        setRenderType(type);
    }


    const onSignUpSuccessHandler = useCallback(() => {
        if (isUserCreated) {
            setSuccessMsg('User Account has been created! You will be redirected to Login page after few seconds');
            setTimeout(() => {
                setSuccessMsg('');
                setRenderType('login');
                resetFormHandler()
            }, 4000);
        }
    }, [isUserCreated])
    // set the state to re-render the component to show the success or error modal after creating new user. 
    useEffect(() => {
        if (isUserCreated)
            setUserCreated(isUserCreated);
        onSignUpSuccessHandler();
    }, [userCreated, isUserCreated, onSignUpSuccessHandler])

    const resetFormHandler = () => {
        setUserEmail('');
        setPassword('');
        setConfirmPassword('');
    }
    const validateFormHandler = useCallback(() => {
        const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!regex.test(userEmail) || password.length < 6 || password !== confirmPassword) {
            setError(true);
            return false;
        }
        return true;
    }, [userEmail, password, confirmPassword]);

    const createAccountHandler = useCallback(() => {
        if (error) {
            setError(false);
        }
        if (validateFormHandler()) {
            dispatch(signUpUserAction({ userEmail, password }));
        }
    }, [error, validateFormHandler, dispatch, userEmail, password])

    const loginAccountHandler = useCallback(() => {
        dispatch(signInUserAction({ userEmail, password }));
        if (Object.entries(loggedUser).length) {
            setSuccessMsg('Login successfull');
            resetFormHandler()
        }
    }, [dispatch, loggedUser, password, userEmail])

    const renderComponent = useCallback(() => (
        <div className='login-content-container'>
            {error && <p className='error-message'>Incorrect email type or password length is less than 6 or passwords don't match</p>}
            {Object.entries(errorMsg).length ? <p className='error-message'>{errorMsg?.message}  </p> : <></>}
            {
                successMsg &&
                <p className='success-message'>
                    {successMsg}
                </p>}
            {renderType === 'SignUp' ? (<form className='form-container'>
                <TextField
                    id="email"
                    variant="standard"
                    type='email'
                    name='Email'
                    label='Email'
                    value={userEmail}
                    onChange={e => setUserEmail(e.target.value)}
                    style={{ marginTop: 20, width: '100%' }}
                />
                <TextField
                    id="password"
                    variant="standard"
                    type='password'
                    name='password'
                    label='Password'
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={{ marginTop: 20, width: '100%' }}
                />
                <TextField
                    id="confirmpassword"
                    variant="standard"
                    type='password'
                    name='confirmpassword'
                    label='Confirm Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    style={{ marginTop: 20, width: '100%' }}
                />
                <Button
                    color="primary"
                    variant='outlined'
                    className="margin-3"
                    onClick={createAccountHandler}
                >
                    Sign Up
                </Button>
            </form>) : (
                <>
                    <form className='form-container'>
                        <TextField
                            id="username"
                            variant="standard"
                            type='text'
                            name='username'
                            label='Username'
                            value={userEmail}
                            onChange={e => setUserEmail(e.target.value)}
                            style={{ marginTop: 20, width: '100%' }}
                        />
                        <TextField
                            id="password"
                            variant="standard"
                            type='password'
                            name='password'
                            label='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ marginTop: 20, width: '100%' }}
                        />
                        <Button
                            color="primary"
                            variant='outlined'
                            className="margin-3"
                            onClick={loginAccountHandler}
                        >
                            Login
                        </Button>
                    </form>
                </>
            )}
        </div>
    ), [error, errorMsg, successMsg, renderType, userEmail, password, confirmPassword, createAccountHandler, loginAccountHandler]);

    return (
        <div className='login-card'>
            <div className='login-card-header'>
                <h4 className='login-card-header-button' onClick={() => onClickHandler('login')}>Login</h4>
                <h4 className='login-card-header-button' onClick={() => onClickHandler('SignUp')}>Sign Up</h4>
            </div>
            <div>{renderComponent()}</div>
        </div>
    )
}

export default Login