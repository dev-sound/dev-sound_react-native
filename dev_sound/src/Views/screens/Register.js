import React, { Component } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

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
                   <Text style={styles.text}>Crie sua conta</Text>
                   <Text>Nome</Text>
                    <Input/>
                    <Text>Sobrenome</Text>
                    <Input/>
                    <Text>Email</Text>
                    <Input/>
                    <Text>Telefone</Text>
                    <Input typeKeyboard={'numeric'}/>
                    <Text>Senha</Text>
                    <Input isPassword={true}/>
                    <Text>Confirme sua senha</Text>
                    <Input isPassword={true}/>
                </Portrait>
            
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
    }
})