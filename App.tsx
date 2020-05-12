import React from 'react';
import Login from './Src/Screens/Login';
import {StatusBar} from 'react-native';

const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <Login />
    </>
  );
};

export default App;
