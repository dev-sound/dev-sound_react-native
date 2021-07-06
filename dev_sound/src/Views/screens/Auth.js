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
    lastName: '',
    email: '',
    password: '',
    number:'',
    email:'',
    confirmPassword: '',
    password: '',
    register: false,
    login: true,
    disBtn: true,
    disFIeld: false
}

const respFront = {
    name: '',
    sobrenome: '',
    email: '',
    telefone: '',
    senhaValida: '',
}




export default class Auth extends Component {

    state = {...initialState}
    regexName = (value)=>{
        const nameValidator = /[A-Z][a-z]/;
        if(nameValidator.test(value)){
            this.setState({disFIeld: true})
        }
        console.warn(nameValidator.test(value))
    }
    regexEmail = (value)=>{
        const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    }

    regexPhone = (value)=>{
        const celphoneValidator = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    }
    regexPassword =(value) =>{
        const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
    }


     
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
                        {/* Signup Start here */}
                    {this.state.register && 
                    <Input fieldLabel= 'Nome' 
                        placeholder= 'Insira seu nome' 
                        style={styles.input} 
                        onChangeText={name =>this.setState({name})}
                        onBlur={()=>this.regexName(this.state.name)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Sobrenome'
                        placeholder= 'Insira seu sobrenome' 
                        style={styles.input}
                        editable={this.state.disFIeld}
                        onChangeText={lastName =>this.setState({lastName})}/>}
                    {this.state.register &&
                    <Input fieldLabel= 'E-mail'
                        placeholder= 'Insira seu e-mail'                         editable={this.state.disFIeld}
                        style={styles.input} 
                        onChangeText={email =>this.setState({email})} />}
                    {this.state.register && 
                    <Input fieldLabel= 'Telefone' 
                        placeholder= '(00)XXXXX-XXXX' 
                        editable={this.state.disFIeld}
                        style={styles.input}
                        onChangeText={number =>this.setState({number})}/>} 
                    {this.state.register &&                  
                    <Input fieldLabel= 'Senha'
                        placeholder= 'Crie uma senha' 
                        editable={this.state.disFIeld}
                        style={styles.input}  
                        onChangeText={password =>this.setState({password})}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Confirme sua senha' 
                        placeholder= 'Confirme a senha'
                        editable={this.state.disFIeld} 
                        style={styles.input} 
                        onChangeText={confirmPassword =>this.setState({confirmPassword})}/>}
                        {/* Signup end here */}

                        {/* Login start here */}
                    {this.state.login &&
                    <Input  left={<TextInput.Icon name="account" />}
                        fieldLabel= 'Login' 
                        placeholder= 'Digite seu e-mail' 
                        style={styles.input} />}
                    {this.state.login &&                  
                    <Input fieldLabel= 'Senha' 
                        left={<TextInput.Icon name="lock" />} 
                        left={<TextInput.Icon name="lock" />} 
                        placeholder= 'Crie uma senha' style={styles.input}  
                        secureTextEntry/>}
                </Portrait>

                        {/* Login end here */}
                {this.state.register && 
                <TouchableOpacity style={styles.create} 
                    onPress={()=>this.setState({login: true},this.setState({register: false}))}>
                        <Text style={styles.textCreate}>Voltar para o login</Text>
                </TouchableOpacity>}
                {this.state.login && 
                <TouchableOpacity style={styles.create} 
                    onPress={()=>this.setState({login: false},this.setState({register: true}))}>
                        <Text style={styles.textCreate}>Criar minha conta</Text>
                </TouchableOpacity>}
                    
                    {/* btn login/signup start here */}
                <Btn label='ENTRAR' disabled={this.state.disBtn}/>
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
        color:'#17133B',
        textDecorationLine: 'underline'
        
    }
})
