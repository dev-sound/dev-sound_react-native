import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import Home from './src/Views/screens/Home';
import Category from './src/Views/screens/Category';
import OrderDone from './src/Views/screens/OrderDone'


export default () => {
  return (
     <SafeAreaView style={styles.container} >

        <Category/>
        
      </SafeAreaView>
)

}

const styles =  StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: "#F1F1F1",
    }

  })



// export default Navigator
