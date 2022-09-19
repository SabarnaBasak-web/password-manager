import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './AddItemButton.css';

function AddItemButton({onClickHandler}) {
    return (
        <div className='button-container'>
        <IconButton aria-label="add button" className='add-button' onClick={onClickHandler}>
            <AddIcon />            
        </IconButton>
        </div>
    )
}

export default AddItemButton