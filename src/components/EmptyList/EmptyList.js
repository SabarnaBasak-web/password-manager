import React from 'react'
import PasswordIcon from '@mui/icons-material/Password';
import './EmptyList.css';
import AddIcon from '@mui/icons-material/Add';

function EmptyList() {
  return (
    <div className='empty-container'>
      <PasswordIcon className='empty-container-logo' />
      <h4 className='empty-container-title'>Nothing to show.</h4>
      <p className='empty-container-description'>
        Please try adding a new entry by clicking on the
        <AddIcon className='empty-container-span-icon' /> button
      </p>
    </div>
  )
}

export default EmptyList