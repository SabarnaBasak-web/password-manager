import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login/Login';
import {useSelector} from 'react-redux'


function App() {
  const loggedUser = useSelector(state => state.userSlice.user) 

  return (
    // <Routes>
    //   {/* <Route path="/" exact element={<HomeScreen />} /> */}
    //   <Route path="/" exact element={<Login />} />
    // </Routes>
    <div>
      {loggedUser
        ? <HomeScreen />
        : <Login/>
      }
    </div>
  );
}

export default App;
