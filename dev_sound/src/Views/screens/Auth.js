import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome'

import Portrait from '../components/Register/Portrait'
import Logo from '../components/Header/logo'
import Input from '../components/Input'
import Btn from '../components/Button'
let initialState = {
    name: '',
    email: '',
    password: '',
    telefone:'',
    email:'',
    confirmPassword: '',
    register: false,
    login: true
}

export default class Auth extends Component {

state = {...initialState}

    render(){
        
        return(
            <ScrollView style={styles.container}>
                <View style={styles.logoArea}>
                    <Logo/>
                </View>
                <Portrait>
                    <Text style={styles.text}>
                        {this.state.register ? 'Crie a sua conta': ''}
                    </Text>              
                    {this.state.register && 
                    <Input label= 'Nome' placeholder= 'Insira seu nome' style={styles.input} />}
                    {this.state.register && 
                    <Input label= 'Sobrenome'placeholder= 'Insira seu sobrenome' style={styles.input} />}
                    {this.state.register &&
                    <Input label= 'E-mail'placeholder= 'Insira seu e-mail' style={styles.input} />}
                    {this.state.register && 
                    <Input label= 'Telefone' placeholder= '(00)XXXXX-XXXX' style={styles.input}/>} 
                    {this.state.register &&                  
                    <Input label= 'Senha'placeholder= 'Crie uma senha' style={styles.input} />}
                    {this.state.register && 
                    <Input label= 'Confirme sua senha' placeholder= 'Confirme a senha' style={styles.input} />}
                    {this.state.login &&
                    <Input  left={<TextInput.Icon name="account" />}
                    fieldLabel= 'Login' placeholder= 'Digite seu e-mail' style={styles.input} />}
                    {this.state.login &&                  
                    <Input fieldLabel= 'Senha' left={<TextInput.Icon name="lock" />} placeholder= 'Crie uma senha' style={styles.input}  secureTextEntry/>}
                </Portrait>
                {this.state.login && 
                <TouchableOpacity style={styles.create} 
                    onPress={()=>this.setState({login: false},this.setState({register: true}))}>
                        <Text style={styles.textCreate}>Criar minha conta</Text>
                </TouchableOpacity>}
                <Btn label='Entrar'/>
            </ScrollView>
        )
     }
}
const styles = StyleSheet.create({
    container:{
    },
    logoArea:{
        justifyContent:'center',
        alignItems:'center',
        padding:35,
      
    },
    input:{
        fontSize: 25,
        
        
    },
    text: {
        fontSize: 28,
        textAlign: 'center'
    },
    create: {
        justifyContent:'center',
        alignItems:'center',
        padding:35,
        
    },
    textCreate: {
        color:'#17133B'
    }
})
