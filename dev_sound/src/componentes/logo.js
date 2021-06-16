import React from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import Logo from '../../assets/img/logo.png'

export default () => {
    return (

        <View style={style.headerArea} >      
            <TouchableOpacity>
                    <View style={style.container}>
                        <Image source={Logo}/>
                        <Text style={style.textLogo}>INSTRUMENTOS</Text>
                    </View>
            </TouchableOpacity>
        </View>
    )
}


const style =  StyleSheet.create(
    {
        textLogo:{
            color:(0, 0, 0, 0,65),
            fontSize:12,
            letterSpacing:0.6,
            position:'relative',
            bottom:5,
            fontWeight:'bold'
        },

        container:{
            position:'relative',
            top:8
        }

    }
)
