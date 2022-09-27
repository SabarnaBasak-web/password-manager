import React, { useState } from 'react'
import { Modal, Box, Button, FormControl, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import './AlertModal.css';
import { useDispatch } from 'react-redux';
import { createPasswordEntry } from '../../Redux/Saga/Firebase/firebaseActions';

function AddModal({ open, handleClose, createItemHandler }) {
    const [url, setUrl] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch();

    const resetStates = () => {
        setUrl('');
        setDescription('');
        setPassword('');
        setUsername('');
    }

    const createEntryHandler = async () => {
        dispatch(createPasswordEntry({ url, password, username, description }))
        resetStates();
        handleClose();
    }

    return (
        <Modal
            open={open}
            aria-labelledby="create-password-modal"
            aria-describedby="create-password-modal"
        >
            <Box className='modalStyle'>
                <div>
                    <h1 className='modal-heading'>Add Entry</h1>
                    <FormControl style={{ width: '100%' }}>
                        <TextField
                            id="url"
                            variant="standard"
                            name='URL'
                            label='URL'
                            value={url}
                            onChange={e => setUrl(e.target.value)}
                        />
                        <TextField
                            id="username"
                            variant="standard"
                            name='username'
                            label='Username'
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            style={{ marginTop: 20 }}
                        />
                        <TextField
                            id="password"
                            variant="standard"
                            type='password'
                            name='password'
                            label='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            style={{ marginTop: 20 }}
                        />
                        <TextField
                            id="description"
                            variant="standard"
                            name='description'
                            label='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            style={{ marginTop: 20 }}
                        />
                        <div style={{ marginTop: 20 }}>
                            <Button
                                color="error"
                                variant='outlined'
                                startIcon={<CloseIcon />}
                                className="margin-3"
                                onClick={handleClose}
                            >
                                Close
                            </Button>
                            <Button
                                color="secondary"
                                variant='outlined'
                                startIcon={<CheckIcon />}
                                className="margin-3"
                                onClick={createEntryHandler}
                            >
                                Add
                            </Button>
                        </div>
                    </FormControl>
                </div>
            </Box>
        </Modal>
    )
}

export default AddModal