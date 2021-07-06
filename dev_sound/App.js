import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';


import Home from './src/Views/screens/Home'
import Auth from './src/Views/screens/Auth';

export default () => {
  return (
     <SafeAreaView style={style.container} >
        <Auth/>
      </SafeAreaView>
)

}


const style =  StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: "#F1F1F1",
      
    }

  }
)
