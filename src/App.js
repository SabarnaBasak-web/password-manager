import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login/Login';


function App() {

  return (
    <Routes>
      {/* <Route path="/" exact element={<HomeScreen />} /> */}
      <Route path="/" exact element={<Login />} />
    </Routes>
  );
}

export default App;
