<<<<<<< HEAD
import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Menu from './src/componentes/Menu'
import Cart from './src/componentes/Cart'

export default () => {
  return (
    <View>
      <Menu/>
      <Cart/>
    </View>
  )
}
=======
import React from 'react';
import { SafeAreaView } from 'react-native'
import Home from './src/screens/Home'

export default () => {
  return (
     <SafeAreaView >
        
        {/* Begin Pagina Home   */}
          <Home/>       
        {/* End Pagina Home   */}

        
      </SafeAreaView>
    )

}
>>>>>>> 0335afe1dded8fb9dea930ab55568b09a11322a1
