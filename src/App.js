import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/Login/Login';
import { useSelector } from 'react-redux'



function App() {
  const loggedUser = useSelector(state => state.userSlice.user)
  return (
    <div>
      {loggedUser && Object.keys(loggedUser).length
        ? <HomeScreen />
        : <Login />
      }
    </div>
  );
}

export default App;
