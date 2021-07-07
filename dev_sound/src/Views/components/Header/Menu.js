import React, { Component } from 'react'
import {View, TouchableOpacity, Image,Text,StyleSheet} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import Logo from './logo'
import Icon from 'react-native-vector-icons/FontAwesome'



export default class Menu extends Component  {
    
    
    state = {}
    

    render() {



        return (
            
            <View style={styles.containerMenu}>

                <View style={styles.areaLogo}>
                        <Logo /> 
                </View>

                <View style={styles.headerMenu}>

                        <View>
                           <Icon name='user-circle'  size={43} color={'#5D5D5D'}/>
                        </View>

                        <View style={styles.areaTextsHeader}>
                           
                            <Text style={styles.HiUser}>Olá, faça o login</Text>
                            <TouchableOpacity>
                                <Text style={styles.AcessUserArea}>Acessar a aréa do usuário</Text>
                            </TouchableOpacity>
                        </View>

                </View>
            
                <DrawerItems {...this.props}/>
            
            </View>
        )
    }
}



const styles = StyleSheet.create({
    containerMenu:{

    },

    areaLogo:{
        padding:20,
        paddingTop:45,
        paddingBottom:35
    },

    headerMenu:{
        borderBottomWidth:0.5,
        flexDirection:'row',
        alignItems:'center',
        paddingHorizontal:15,
        paddingBottom:30,
    },

    areaTextsHeader:{
        marginLeft:10
    },

    HiUser:{
        fontSize:18,
        letterSpacing:0.3,
        color:'rgba(50, 50, 50, 1)',
        fontWeight:'bold',
        paddingBottom:2.8,
        textAlign:'center'
    },

    AcessUserArea:{
        textAlign:'center',
        color:'rgba(22, 21, 102, 0.7)',
        borderTopWidth:0.5,
        paddingTop:2.8,
    }
})