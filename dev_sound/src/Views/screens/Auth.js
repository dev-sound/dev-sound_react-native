import React, { Component } from 'react'
import {
     Text, StyleSheet, View, ScrollView, 
     TouchableOpacity, Alert, 
} from 'react-native'
import { TextInput } from 'react-native-paper';
import axios from 'axios'
import AsyncStorage from "@react-native-async-storage/async-storage"


import Portrait from '../components/Register/Portrait'
import Logo from '../components/Header/logo'
import Input from '../components/Input'
import Btn from '../components/Button'



let initialState = {
    name: '',
    lastName: '',
    password: '',
    number:'',
    email:'',
    logEmail: '',
    logSenha: '',
    confirmPassword: '',
    register: false,
    login: true,
    disBtn: true,
    Validname: '',
    ValidlastName: '',
    Validemail: '',
    Validpassword: '',
    Validnumber: '',
    ValidconfirmPassword: '',
    validPhone: '',
    editableLastName: false,
    editableEmail: false,
    editablePassword: false,
    editableConfirmPassword: false,
    editablePhone: false
    
}

export default class Auth extends Component {

    state = {
        ...initialState,
        
    }

    signin = async () => {
        try {
           const resp = await axios.post ("http://10.0.3.2:3000/loginUsuarios", {
                email: this.state.logEmail,
                senha: this.state.logSenha
            }) 
            
            const infosUser = {
                email: resp.data,
                token: resp.headers.authorization
            }

            axios.defaults.headers.common['Authorization'] = `${infosUser.token}`
            await AsyncStorage.setItem('userData', JSON.stringify(infosUser))
            
            // descomenta aqui em baixo pra poder navegar pra home
 
            this.props.navigation.navigate('Home', {infos:infosUser})
         
            
        }
        
        catch(err){
            console.warn(err)
        }
    }
    signup = async () => {
        try {
            await axios.post("http://10.0.3.2:3000/cadastrarUsuarios",{
                nome: this.state.name,
                sobrenome: this.state.lastName,
                email: this.state.email,
                telefone: this.state.number,
                senhaValida: this.state.confirmPassword,
                
            })
            Alert.alert('Usuario cadastrado!')
            this.setState({...initialState})
        }catch (err){
            console.warn(err)
        }
        
    }

    regexName = (value)=>{
        //regex nome /[A-Z][a-z]/
        const nameValidator = /[A-Z, À-Ú][a-z, à-ú]/;
        if(nameValidator.test(value)){
            this.setState({Validname:'valid',
                            editableLastName:true})
        }else{
            this.setState({Validname:'noValid',
                            editableLastName:false})
        }
        
    }
    regexLastName= (value) =>{
        const lastNameValidator = /[A-Z, À-Ú][a-z, à-ú]/;
        if(lastNameValidator.test(value)){
            this.setState({ValidlastName: 'valid',
                            editableEmail: true})
        }else{
            this.setState({ValidlastName:'noValid',
                            editableEmail: false})
        }

    }
    regexEmail = (value)=>{
        const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(emailValidator.test(value)){
            this.setState({Validemail: 'valid',
                            editablePhone: true})
        }else{
            this.setState({Validemail: 'noValid',
                            editablePhone: false})
        }
    }

    regexPhone = (value)=>{
        const celphoneValidator = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
        if(celphoneValidator.test(value)){
            this.setState({validPhone: 'valid',
                            editablePassword: true})
        }else{
            this.setState({validPhone: 'noValid',
                            editablePassword: false})
        }
    }
    regexPassword =(value) =>{
        const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(passwordValidator.test(value)){
            this.setState({Validpassword: 'valid',
                            editableConfirmPassword:true})
        }else{
            this.setState({Validpassword: 'noValid',
                            editableConfirmPassword:false})
        }
    }

    readyToSignup = (value) => {
        if(value==this.state.password){
            this.setState({ValidconfirmPassword: 'valid',
                            disBtn: false})
        }else{
            this.setState({ValidconfirmPassword: 'noValid',
                             disBtn: true})
    }
    }
     
    render(){
        
        return(
            <ScrollView style={styles.container}>
                <View style={styles.logoArea}>
                    <Logo comeBackHome={() => this.props.navigation.navigate('Home')}/>
                </View>
                <Portrait>
                    <Text style={styles.text}>
                        {this.state.register ? 'Crie a sua conta': ''}
                    </Text>              
                        {/* Signup Start here */}
                    {this.state.register && 
                    <Input fieldLabel= 'Nome' 
                        validInput = {this.state.Validname}
                        placeholder= 'Insira seu nome' 
                        style={styles.input} 
                        onChangeText={name =>this.setState({name})}
                        onBlur={()=>this.regexName(this.state.name)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Sobrenome'
                        validInput = {this.state.ValidlastName}
                        placeholder= 'Insira seu sobrenome' 
                        style={styles.input}
                        editable={this.state.editableLastName}
                        onChangeText={lastName =>this.setState({lastName})}
                        onBlur={()=>this.regexLastName(this.state.lastName)}/>}
                    {this.state.register &&
                    <Input fieldLabel= 'E-mail'
                        validInput = {this.state.Validemail}
                        placeholder= 'Insira seu e-mail'   
                        editable={this.state.editableEmail}                   
                        style={styles.input} 
                        onChangeText={email =>this.setState({email})} 
                        onBlur={()=>this.regexEmail(this.state.email)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Telefone' 
                        validInput = {this.state.validPhone}
                        placeholder= '(00)XXXXX-XXXX' 
                        editable={this.state.editablePhone}
                        style={styles.input}
                        onChangeText={number =>this.setState({number})}
                        onBlur={()=>this.regexPhone(this.state.number)}/>} 
                    {this.state.register &&                  
                    <Input fieldLabel= 'Senha'
                        validInput = {this.state.Validpassword}
                        placeholder= 'Crie uma senha' 
                        editable={this.state.editablePassword}
                        style={styles.input}  
                        secureTextEntry
                        onChangeText={password =>this.setState({password})}
                        onBlur={()=> this.regexPassword(this.state.password)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Confirme sua senha' 
                        placeholder= 'Confirme a senha'
                        validInput = {this.state.ValidconfirmPassword}
                        editable={this.state.editableConfirmPassword} 
                        style={styles.input} 
                        secureTextEntry
                        onChangeText={confirmPassword =>this.setState({confirmPassword})}
                        onBlur={()=>this.readyToSignup(this.state.confirmPassword)} />}
                        {/* Signup end here */}

                        {/* Login start here */}
                    {this.state.login &&
                    <Input  left={<TextInput.Icon name="account" />}
                        fieldLabel= 'Login' 
                        placeholder= 'Digite seu e-mail' 
                        value={this.state.logEmail}
                        onChangeText={logEmail => this.setState({logEmail})}
                        style={styles.input} />}
                    {this.state.login &&                  
                    <Input fieldLabel= 'Senha' 
                        left={<TextInput.Icon name="lock" />} 
                        left={<TextInput.Icon name="lock" />} 
                        value={this.state.logSenha}
                        placeholder= 'Crie uma senha' style={styles.input} 
                        onChangeText={logSenha => this.setState({logSenha})} 
                        secureTextEntry/>}
                </Portrait>

                        {/* Login end here */}
                {this.state.register && 
                <TouchableOpacity style={styles.create} 
                    onPress={()=>this.setState({...initialState})}>
                        <Text style={styles.textCreate}>Voltar para o login</Text>
                </TouchableOpacity>}
                {this.state.login && 
                <TouchableOpacity style={styles.create} 
                    onPress={()=>this.setState({login: false,
                                                register: true})}>
                        <Text style={styles.textCreate}>Criar minha conta</Text>
                </TouchableOpacity>}
                    
                    {/* btn login/signup start here */}
                {this.state.login && 
                <Btn label='ENTRAR'  onPress={()=>this.signin()}/>}
                {this.state.register && 
                <Btn label='CADASTRAR' onPress={()=>this.signup()} disabled={this.state.disBtn}/>}
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
