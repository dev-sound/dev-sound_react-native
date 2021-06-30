import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'

import Logo from '../components/Header/logo'
import Portrait from '../components/Register/Portrait'
import Input from '../components/Input'
import Title from '../components/Title'
export default class Register extends Component {

    render(){

        return(
            <ScrollView>
                <View style={styles.container}>
                <View style={styles.logo} >
                    <Logo/> 
                </View>
                <Portrait>
                   
                   <Text style={styles.label}>Nome</Text>
                    <Input/>
                    <Text style={styles.label}>Senha</Text>
                    <Input isPassword={true}/>
                </Portrait>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.createAcc}>Crie sua Conta</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
        )
    }
}
const styles = StyleSheet.create({
    logo: {
        alignItems: 'center',
        marginVertical: 40
    },
    text:{
        textAlign: 'center',
        fontSize: 28,
        fontWeight: '400',
    },
    label: {
        fontSize:25,
        fontWeight: '300'
    },
    buttons:{
        alignItems:'center',
        padding: 20,
    },
    createAcc:{
        color: '#17133B',
        fontSize: 19
    }
})