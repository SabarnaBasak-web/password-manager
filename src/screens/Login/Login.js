import React, { useCallback, useState } from 'react';
import './Login.css';
import { TextField, Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

function Login() {
    const [renderType, setRenderType] = useState('login');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const onClickHandler = (type) => {
        setRenderType(type);
    }

    const createAccountHandler = () => {
        console.log('Create account');
    }

    const renderComponent = useCallback(() => (
        <div className='login-content-container'>
            {renderType === 'SignUp' ? (<form className='form-container'>
                <TextField
                    id="username"
                    variant="standard"
                    type='text'
                    name='username'
                    label='Username'
                    value={username}
                    onChange={e => setUsername(e.target.value)}
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
                            value={username}
                            onChange={e => setUsername(e.target.value)}
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
                            onClick={createAccountHandler}
                        >
                            Login
                        </Button>
                    </form>
                    <Button
                        variant="outlined"
                        startIcon={<GoogleIcon />}
                        className="google-btn"
                        color="primary"
                    >
                        Login with Google
                    </Button>
                </>
            )}
        </div>
    ), [renderType, confirmPassword, password, username]);

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