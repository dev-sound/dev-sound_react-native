import React from 'react'
import {View, TouchableOpacity, Image} from 'react-native'
import MenuIcon from '../../assets/icons/menu.png'


export default () => {
    return (
       <View>
           <TouchableOpacity>
               <Image source={MenuIcon}/>  
           </TouchableOpacity>
       </View>
    )
}

