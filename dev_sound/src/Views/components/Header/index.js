import React,{useState,useEffect, Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import MenuIcon from '../../../../assets/icons/menu_icon.png'
import CartIcon from './Cart';
import Logo from '../../../../assets/img/logo.png'

export default class Header  extends Component {




    render(){

        return (
            <View style={style.headerArea} >
            
                <TouchableOpacity onPress={this.props.drawer} >
                
                  <Image source={MenuIcon} />  
               
                </TouchableOpacity>
                
                <TouchableOpacity style={style.areaLogo} onPress={this.props.comeBackHome}>
                
                    <Image source={Logo}/>
                    <Text style={style.textLogo}>INSTRUMENTOS</Text>
                
                </TouchableOpacity>


                <TouchableOpacity onPress ={this.props.cart}>

                        <CartIcon/>
           
                </TouchableOpacity>

            </View>
        )

    }

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
        },

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
        },

        areaLogo:{
            flexDirection:'column'
        }
    }
)

