import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';
import { DetailScreen } from '../screens/DetailScreen';
import { Movie } from '../interfaces/movieInterface';
import SplashScreen from 'react-native-splash-screen'

export type RootStackParams = {
    
    HomeScreen: undefined,
    DetailScreen: Movie,
    
}
const Stack = createStackNavigator<RootStackParams>();

export const Navigation = () => {
  
useEffect(() => {
  SplashScreen.hide();
},[]);

  return (
    <Stack.Navigator
    screenOptions={{
        headerShown: false,
        cardStyle:{
            //Aqui se cambuia el fondo de toda la APP
            //backgroundColor:'white'
        }
    }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailScreen"  component={DetailScreen} />
    </Stack.Navigator>
  );
}