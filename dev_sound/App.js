import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import Home from './src/Views/screens/Home';
import Payment from './src/Views/screens/Payment';

export default () => {
  return (
     <SafeAreaView style={style.container} >
        
      <Payment/>
        
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
