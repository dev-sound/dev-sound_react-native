import React from 'react'
import {View, Text, TouchableOpacity} from 'react-native'
import Navigation from './src/componentes/Navigation'
import Cart from './src/componentes/Cart'

export default () => {
  return (
    <View>
      <Navigation/>
      <Cart/>
    </View>
  )
}