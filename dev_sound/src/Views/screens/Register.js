import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

import Logo from '../components/Header/logo'
import Portrait from '../components/Register/Portrait'

export default class Register extends Component {

    render(){

        return(
            <View style={styles.container}>
                <View style={styles.logo} >
                    <Logo/> 
                </View>
                <Portrait>
                    
                </Portrait>
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
        marginTop: 30
    }
})