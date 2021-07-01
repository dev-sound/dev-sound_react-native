import React from 'react';
import { SafeAreaView } from 'react-native';
// import Home from './src/Views/screens/Home';
import Category from './src/Views/screens/Category';
import Header from './src/Views/components/Header/Header'

export default () => {
  return (
     <SafeAreaView >
        <Header/>
        {/* Begin Pagina Home   */}
        <Category/>
        {/* End Pagina Home   */}

        
      </SafeAreaView>
    )

}
