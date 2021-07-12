import React from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import MenuIcon from '../../../../assets/icons/menu_icon.png'
import Logo from './logo';
import CartIcon from './Cart';


export default props => {

    return (
        <View style={style.headerArea} >
         
            <TouchableOpacity onPress={props.drawer} >
               <Image source={MenuIcon} />  
            </TouchableOpacity>
            
            <TouchableOpacity onPress={props.comeBackHome}>
                    <Logo />
            </TouchableOpacity>

            <TouchableOpacity onPress ={props.cart}>
                    <View style={style.elipse}>
                        <Text style={style.textElipse}>0</Text>
                    </View>
                    <CartIcon/>
            </TouchableOpacity>

        </View>
    )

}


const style =  StyleSheet.create(
    {
        headerArea:{
            paddingTop:45,
            padding:15,
            flexDirection:'row',
            justifyContent:'space-between',
            alignItems:'center'
        },

        elipse:{
            backgroundColor:"#EA9413",
            width:17,
            height:17,
            borderRadius:30,
            position:'relative',
            left:10,
            top:17,
            zIndex:5
        },

        textElipse:{
            color:"#fff",
            fontWeight:'bold',
            fontSize:16,
            textAlign:"center",
            position:'relative',
            bottom:3
        }
    }
)

