import React, { useEffect, useState, useCallback, } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoadingIndicator from 'react-loading-indicator';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import './AllListStyle.css';
import DoneIcon from '@mui/icons-material/Done';
import AlertModal from '../components/Modal/AlertModal';
import { decryptText } from '../Crypto/CryptoConfig';
import CloseIcon from '@mui/icons-material/Close';
import EmptyList from '../components/EmptyList/EmptyList';
import {useDispatch, useSelector} from 'react-redux';
import {firebaseActions, updateDetails, deletePasswordEntry} from '../Redux/Saga/firebaseActions';

function AllList({refresh}) {
  const [shouldEdit, setShouldEdit] = useState(false);
  const [inputText, setInputText] = useState('');
  const [inputField, setInputField] = useState('');
  const [showPassword, setShowPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [rowId, setRowId] = useState('');

  const {loading, list} = useSelector(state=> state.passwordSlice);
  const dispatch =  useDispatch();


  useEffect(()=>{
    dispatch({ type: firebaseActions.FETCH_ALL_PASSWORDS })
  },[dispatch]);

  const onEditButtonHandler = (type, docId) => {
    setShouldEdit(true);
    setInputField(type);
    setRowId(docId)
  }

  const onDeleteButtonHandler = useCallback(async (docId) => {         
    dispatch(deletePasswordEntry(docId));
    setShowModal(false);
  }, [dispatch]);

  const onDoneHandler = async (docId, updateText, type) => {
    dispatch(updateDetails({docId, updateText, type}));    
    setShouldEdit(false);    
    setInputText('');
    setRowId('');
    setShowPassword('');
  };

  // handler to render cancel button
  const onCancelHandler = ()=>{
    setShouldEdit(false)
  }

  // Render text or input field based on the condition 
  const renderTextOrInputContent = (renderText, docId, type) => {     
    if (shouldEdit && type === inputField && rowId===docId ) {
      return (
        <>
          <TextField
            id={docId}
            variant="standard"
            name={type}
            value={inputText}
            placeholder={type === 'password' ? decryptText(renderText) : renderText }
            onChange={e => setInputText(e.target.value)} />
          <DoneIcon className='done-icon' onClick={() => onDoneHandler(docId, inputText, type)} />
          <CloseIcon className='pointer' onClick={onCancelHandler} />
        </>
      )
    }
    else {
      if (type === 'password') {
        return (
          <>
            <span className={(showPassword !== docId) ? 'blurText' : ''}>{decryptText(renderText)}</span>
            <VisibilityIcon className='edit-icon' onClick={() => {
              setShowPassword(prevValue => {                
                if(!prevValue){                  
                  return docId
                } else{
                  return ''
                }
              })              
            }} />
            <EditIcon className='edit-icon' onClick={() => onEditButtonHandler(type, docId)} />
          </>
        )
      }
      return (<>
        {renderText}&nbsp;
        <EditIcon className='edit-icon' onClick={() => onEditButtonHandler(type,docId)} /> </>)
    }
  };


  const renderTableContent = (
    <div className='table-container'>
      <h1 className='text-center'>All Password list</h1>
      <TableContainer component={Paper}>
        <Table  size="small" aria-label="a dense table">
          <TableHead>
            <TableRow className='heading-background'>
              <TableCell align="center" className='heading-text'>Sr No.</TableCell>
              <TableCell align="center" className='heading-text'>URL</TableCell>
              <TableCell align="center" className='heading-text'>Username</TableCell>
              <TableCell align="center" className='heading-text'>Password</TableCell>
              <TableCell align="center" className='heading-text'>Description</TableCell>
              <TableCell align="center"></TableCell>

            </TableRow>
          </TableHead>
          <TableBody>            
            {!!list.length ? 
            list?.map((row, index) => (
             
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center"> {renderTextOrInputContent(row.url, row.id, 'url')}</TableCell>
                <TableCell align="center">{renderTextOrInputContent(row.username, row.id, 'username')}</TableCell>
                <TableCell align="center">{renderTextOrInputContent(row.password, row.id, 'password')}</TableCell>
                <TableCell align="center">{renderTextOrInputContent(row.description, row.id, 'description')}</TableCell>
                <TableCell align="center">
                  <DeleteIcon onClick={()=> {setShowModal(true); setRowId(row.id)}} className='pointer' />
                </TableCell>
              </TableRow>
              )):
            //Render Empty component
            <TableRow>
                <TableCell colSpan={6}> <EmptyList/></TableCell>
            </TableRow>}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );

  const renderLoadingIndicator = () => {
    return (
      <div className='loading-spinner-container'>
        <LoadingIndicator size="50" />
      </div>
    )
  }
  return (
    loading ? 
      renderLoadingIndicator() 
      : <>        
        {renderTableContent} 
        <AlertModal 
          open={showModal} 
          handleClose={()=> setShowModal(false)} 
          deleteRowHandler= {()=>onDeleteButtonHandler(rowId)}
        />
      </>
  )
}

export default AllList