import React,{useState,useEffect, Component} from 'react';
import {StyleSheet,Text,View,Image,TouchableOpacity} from 'react-native';
import MenuIcon from '../../../../assets/icons/menu_icon.png'
import Logo from './logo';
import CartIcon from './Cart';


export default class Header  extends Component {

    // async componentDidUpdate(){
    //     await this.captureCartQuant()

    // }

    // captureCartQuant = async () =>  {
    //     const productImport = await AsyncStorage.getItem('product')
    //     const productParse = JSON.parse(productImport)
    //     console.warn(productParse)
    //     this.setState({Cart:6})
    // }

    // state = {
    //     Cart:0
    // }



    render(){

        return (
            <View style={style.headerArea} >
            
                <TouchableOpacity onPress={this.props.drawer} >
                
                  <Image source={MenuIcon} />  
               
                </TouchableOpacity>
                
                <TouchableOpacity>
                        <Logo />
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
        }
    }
)

