import React from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import Logo from './logo'


const Header = props => {

    return (

        <View style={style.headerArea} >
           
            <TouchableOpacity>
                    <Text> Nav </Text>
            </TouchableOpacity>
            
            <TouchableOpacity>
                    <Logo/>
                 
            </TouchableOpacity>

            <TouchableOpacity>
                    <Text> Cart </Text>
            </TouchableOpacity>

        </View>
    )

}


const style =  StyleSheet.create(
    {
        headerArea:{
            paddingTop:45,
            padding:15,
            backgroundColor:"#F1F1F1",
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        }
    }
)

export default Header