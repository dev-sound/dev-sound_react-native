import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';


import Home from './src/Views/screens/Home'
import Auth from './src/Views/screens/Auth';
import Payment from './src/Views/screens/Payment';

export default () => {
  return (
     <SafeAreaView style={style.container} >

          <Payment/>
    
      </SafeAreaView>
)

}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f1f1f1',
    flex: 1,
  }
})
const style =  StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: "#F1F1F1",
    }

  }
)
