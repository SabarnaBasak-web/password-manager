import React, { useState, useCallback, useEffect } from 'react';
import { Box, Modal, FormControl, TextField, Button } from '@mui/material';
import './AlertModal.css';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserPassword } from '../../Redux/Saga/User/UserActions';
import { logout } from '../../Redux/Saga/User/UserActions';
import DoneIcon from '@mui/icons-material/Done';
function PasswordModal({ open, handleClose }) {

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [isError, setIsError] = useState(false);
    const dispatch = useDispatch();
    const isPasswordUpdated = useSelector(state => state.userSlice.passwordUpdated);

    console.log('PasswordModal', isPasswordUpdated);

    const updatePasswordHandler = useCallback(() => {
        setIsError(false);
        setErrorMsg('');

        console.log("Update Password Handler called");
        if (newPassword !== confirmPassword) {
            setIsError(true);
            setErrorMsg('Passwords don\'t match');
        }
        else {
            dispatch(updateUserPassword(newPassword))

        }
    }, [confirmPassword, dispatch, newPassword])


    useEffect(() => {
        if (isPasswordUpdated) {
            setTimeout(() => {
                dispatch(logout());
            }, 3000)
        }
    }, [isPasswordUpdated, dispatch])
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="password-modal"
            aria-describedby="show-password-modal"
        >
            <Box className='modalStyle'>
                <h2 >Change Password</h2>
                {isError && <p className='modal-error-message'>{errorMsg}</p>}
                {isPasswordUpdated && <p className='modal-success-message'>
                    <DoneIcon className='done-icon' />
                    Password Updated <br /> you will be logged out in few seconds</p>}
                <FormControl style={{ width: '100%' }}>
                    <TextField
                        id='new-password'
                        variant='standard'
                        type='password'
                        name='New Password'
                        label='Enter new password'
                        value={newPassword}
                        onChange={e => setNewPassword(e.target.value)}
                    />
                    <TextField
                        id="confirm-new-password"
                        variant='standard'
                        type='password'
                        name='confirm New Password'
                        label='Confirm new password'
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        style={{ marginTop: 20 }}
                    />
                    <div>
                        <Button
                            color="secondary"
                            variant='outlined'
                            className="margin-3"
                            onClick={updatePasswordHandler}
                        >
                            Update
                        </Button>
                    </div>
                </FormControl>
            </Box>
        </Modal>
    )
}

export default PasswordModal