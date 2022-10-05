import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './TopNav.css';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { UserActions, logout } from '../../Redux/Saga/User/UserActions';

function TopNav() {
    const [showDropDown, setShowDropDown] = useState(false);
    const { email, displayName } = useSelector(state => state.userSlice.user);
    const dispatch = useDispatch();

    const onLogoutButtonHandler = () => {
        dispatch(logout())
    }
    const DropdownItem = () => {
        return (
            <div className='dropdown-item'>
                <ul className='dropdown-item-list'>
                    <li>Display Name {displayName}</li>
                    <li >Change Password</li>
                    <li onClick={onLogoutButtonHandler} >Logout</li>
                </ul>
            </div>
        )
    }

    const showDropdownHandler = () => {
        setShowDropDown(state => !state);
    }

    return (
        <>
            <div className='top-container'>
                <p className='top-container-title'><PhonelinkLockIcon className='icon' /> Password Manager</p>
                <span>
                    <AccountCircleIcon className='icon' />
                    {
                        !showDropDown ? <ArrowDropDownIcon className='icon pointer' onClick={showDropdownHandler} />
                            : <ArrowDropUpIcon className='icon pointer' onClick={showDropdownHandler} />
                    } </span>

            </div>
            {showDropDown && <DropdownItem />}
        </>
    )
}

export default TopNav