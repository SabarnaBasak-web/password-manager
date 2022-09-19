import React from 'react'
import { Modal, Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import './AlertModal.css';

function AlertModal({ open, handleClose, deleteRowHandler }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-modal"
            aria-describedby="alert-modal-when-deleting-a-row"
        >
            <Box className='modalStyle'>
                <p className='alert-text'>Are you sure you want to delete this entry ? </p>
                <div >
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
                        startIcon={<DeleteIcon />} 
                        className="margin-3"
                        onClick={deleteRowHandler}
                    >
                        Delete
                    </Button>
                </div>
            </Box>
        </Modal>
    )
}

export default AlertModal