import React from 'react'
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import './AddItemButton.css';

const AddItemButton = ({onClickHandler}) =>{
    return (
        <div className='button-container'>
        <IconButton aria-label="add button" className='add-button' onClick={onClickHandler}>
            <AddIcon />            
        </IconButton>
        </div>
    )
}

export default React.memo(AddItemButton)