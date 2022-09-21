import React, { useState } from 'react';
import AllList from './AllList';
import AddItemButton from '../components/AddButton/AddItemButton';
import AddModal from '../components/Modal/AddModal';

function HomeScreen() {
    const [showAddModal, setShowAddModal] = useState(false);
    const onAddButtonHandler = () => {
        setShowAddModal(true);
    }
    return (
        <>
            <AllList />
            <AddItemButton onClickHandler={onAddButtonHandler} />
            <AddModal
                open={showAddModal}
                handleClose={() => {
                    setShowAddModal(false);
                }}
            />
        </>
    );
}

export default HomeScreen;
