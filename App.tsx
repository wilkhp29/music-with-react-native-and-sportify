import React, {useEffect} from 'react';
import Login from './Src/Screens/Login';
import Home from './Src/Screens/Home';
import PlayLists from './Src/Screens/PlayLists';
import PlayList from './Src/Screens/PlayList';
import Track from './Src/Screens/Track';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from './Src/Helps';
import {categorie, playlist, track, Listernes} from './Src/Service/Sportify';

export type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  PlayLists: {categorie: categorie};
  PlayList: {playlist: playlist};
  Track: {track: track};
};

const Stack = createStackNavigator();
const App = () => {
  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(0,0,0,0)"
        barStyle="light-content"
      />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerTransparent: true,
            headerTintColor: Colors.textPrimary,
          }}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{title: 'Categorias'}}
          />
          <Stack.Screen name="PlayLists" component={PlayLists} />
          <Stack.Screen name="PlayList" component={PlayList} />
          <Stack.Screen name="Track" component={Track} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
