import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';


import Home from './src/Views/screens/Home'
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';
import Category from './src/Views/screens/Category';
import Menu from './src/Views/components/Header/Menu';


import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';



const Navigator = createAppContainer(
  createDrawerNavigator({
    Home,
    Payment

  },{
    initialRouteName:'Home',
    contentComponent: Menu

  })
)


export default Navigator
