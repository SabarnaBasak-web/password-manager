import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './TopNav.css';
import PhonelinkLockIcon from '@mui/icons-material/PhonelinkLock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { logout } from '../../Redux/Saga/User/UserActions';
import { clearData } from '../../Redux/Reducers/passwordSlice';
import PasswordModal from '../Modal/PasswordModal';

function TopNav() {
    const [showDropDown, setShowDropDown] = useState(false);
    const { email, displayName } = useSelector(state => state.userSlice.user);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const onShowModalHandler = () => {
        setShowModal(true);
    }
    const onLogoutButtonHandler = () => {
        dispatch(logout());
        dispatch(clearData())
    }
    const DropdownItem = () => {
        return (
            <>
                <div className='dropdown-item'>
                    <ul className='dropdown-item-list'>
                        <li>Display Name {displayName}</li>
                        <li onClick={onShowModalHandler}>Change Password</li>
                        <li onClick={onLogoutButtonHandler} >Logout</li>
                    </ul>
                </div>
                <PasswordModal open={showModal} handleClose={() => setShowModal(false)} />
            </>
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