import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import Home from './src/Views/screens/Home';
import Header from './src/Views/components/Header/Header'
import OrderDone from './src/Views/screens/OrderDone'

export default () => {
  return (
     <SafeAreaView style={styles.container} >
        <Header/>
        {/* Begin Pagina Home   */}
        <OrderDone/>
        {/* End Pagina Home   */}

        
      </SafeAreaView>
    )

}

const styles =  StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor: "#F1F1F1",
    }

  }
)
