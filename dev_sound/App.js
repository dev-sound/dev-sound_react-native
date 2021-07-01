import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
// import Home from './src/Views/screens/Home';
import ShopCart from './src/Views/screens/ShopCart'

export default () => {
  return (
     <SafeAreaView style={styles.container}>
        {/* Begin Pagina Home   */}
        {/* <Home/> */}
        {/* End Pagina Home   */}
        <ShopCart/>
      </SafeAreaView>
    )

}

styles = StyleSheet.create({
  container: {
    flex: 1
  }
});