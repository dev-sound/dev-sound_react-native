import React from 'react'
import {View, Text, TouchableOpacity, Image} from 'react-native'
import CartIcon from '../../assets/icons/cart_icon1.png'


export default () => {
    return (
       <View>
           <TouchableOpacity>
               <Image source={CartIcon}/>  
           </TouchableOpacity>
       </View>
    )
}
