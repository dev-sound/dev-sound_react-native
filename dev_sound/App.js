import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import Home from './src/Views/screens/Home';

export default () => {
  return (
     <SafeAreaView style={style.container} >
        
        {/* Begin Pagina Home   */}
        <Home/>
        {/* End Pagina Home   */}

        
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
