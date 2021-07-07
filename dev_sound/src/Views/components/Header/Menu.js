import React, { Component } from 'react'
import {View, TouchableOpacity, Image,Text,StyleSheet} from 'react-native'
import { DrawerItems } from 'react-navigation-drawer'
import Logo from './logo'




export default class Menu extends Component  {
    
    
    state = {}
    
    
    render() {



        return (
            
            <View style={styles.containerMenu}>

                <View style={styles.logoArea}>

                </View>
                <Text> Bem vindo </Text>

                <DrawerItems {...this.props}/>
            
            </View>
        )
    }
}



const styles = StyleSheet.create({
    containerMenu:{

    }
})