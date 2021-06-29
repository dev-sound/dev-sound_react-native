import React from 'react';
import { SafeAreaView,StyleSheet } from 'react-native';
import Home from './src/Views/screens/Home';
import Input from './src/Views/components/Input';


export default () => {
  return (
     <SafeAreaView style={style.container} >
        
        {/* Begin Pagina Home   */}
        
        <Input
          label='Número do Crédito '
          placeholder='Insira o nome'

        /> 
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
