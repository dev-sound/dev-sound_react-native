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
