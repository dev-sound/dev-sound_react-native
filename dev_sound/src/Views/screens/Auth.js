import React, { Component } from 'react'
import {
     Text, StyleSheet, View, ScrollView, 
     TouchableOpacity, Alert, Dimensions
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
    validPhone: ''
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
            if(`${err}` == 'Error: Request failed with status code 401'){
                Alert.alert('Erro ao realizar login', `Usuario ou senha inválido  \n\n ${err}`)
            }else{
                Alert.alert('Error ao realizar login', `Erro de conexão \n\n${err}`) 
            }
            
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
            this.regexName(this.state.name)
            this.regexLastName(this.state.lastName)
            this.regexEmail(this.state.email)
            this.regexPhone(this.state.number)
            this.regexPassword(this.state.password)
            this.readyToSignup(this.state.confirmPassword)
            Alert.alert('Erro ao cadastrar', 'Verifique se todos os campos foram cadastrados corretamentes' )
        }
        
    }

    regexName = (value)=>{
        //regex nome /[A-Z][a-z]/
        const nameValidator = /[A-Z, À-Ú][a-z, à-ú]/;
        if(nameValidator.test(value)){
            this.setState({Validname:'valid'})
        }else{
            this.setState({Validname:'noValid'})
        }
        
    }
    regexLastName= (value) =>{
        const lastNameValidator = /[A-Z, À-Ú][a-z, à-ú]/;
        if(lastNameValidator.test(value)){
            this.setState({ValidlastName: 'valid'})
        }else{
            this.setState({ValidlastName:'noValid'})
        }

    }
    regexEmail = (value)=>{
        const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if(emailValidator.test(value)){
            this.setState({Validemail: 'valid'})
        }else{
            this.setState({Validemail: 'noValid'})
        }
    }

    regexPhone = (value)=>{
        const celphoneValidator = /^\(?(?:[14689][1-9]|2[12478]|3[1234578]|5[1345]|7[134579])\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
        if(celphoneValidator.test(value)){
            this.setState({validPhone: 'valid'})
        }else{
            this.setState({validPhone: 'noValid'})
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
        if(value==this.state.password&& value != ''){
            this.setState({ValidconfirmPassword: 'valid'})
        }else{
            this.setState({ValidconfirmPassword: 'noValid'})
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
                        placeholder= 'Ex: Jorge' 
                        style={styles.input} 
                        onChangeText={name =>this.setState({name})}
                        onBlur={()=>this.regexName(this.state.name)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Sobrenome'
                        validInput = {this.state.ValidlastName}
                        placeholder= 'Ex: Silva' 
                        style={styles.input}
                        onChangeText={lastName =>this.setState({lastName})}
                        onBlur={()=>this.regexLastName(this.state.lastName)}/>}
                    {this.state.register &&
                    <Input fieldLabel= 'E-mail'
                        validInput = {this.state.Validemail}
                        placeholder= 'Insira seu e-mail'   
                        style={styles.input} 
                        onChangeText={email =>this.setState({email})} 
                        onBlur={()=>this.regexEmail(this.state.email)}/>}
                    {this.state.register && 
                    <Input fieldLabel= 'Celular' 
                        validInput = {this.state.validPhone}
                        placeholder= 'Ex: 11933332222' 
                        style={styles.input}
                        onChangeText={number =>this.setState({number})}
                        onBlur={()=>this.regexPhone(this.state.number)}/>} 
                    {this.state.register &&                  
                    <Input fieldLabel= 'Senha'
                        validInput = {this.state.Validpassword}
                        placeholder= 'Crie uma senha'
                        style={styles.input}  
                        secureTextEntry
                        onChangeText={password =>this.setState({password})}
                        onBlur={()=> this.regexPassword(this.state.password)}/>}
                    {this.state.register &&
                    <Text>A senha deve conter no mínimo 8 caracteres, um digito numérico</Text>
                    }
                    {this.state.register && 
                    <Input fieldLabel= 'Confirme sua senha' 
                        placeholder= 'Confirme a senha'
                        validInput = {this.state.ValidconfirmPassword}
                        
                        style={styles.input} 
                        secureTextEntry
                        onChangeText={confirmPassword =>this.setState({confirmPassword})}
                        onBlur={()=>this.readyToSignup(this.state.confirmPassword)} />}
                    {this.state.register &&
                    <Text>As senhas precisam ser iguais</Text>
                    }
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
                </TouchableOpacity>
                }
                {this.state.login && 
                <TouchableOpacity style={styles.create}
                onPress={()=>this.props.navigation.navigate('ChangePassMail')}>
                    <Text style={styles.textCreate}>Esqueci minha senha</Text>
                </TouchableOpacity>
                }
                    
                    {/* btn login/signup start here */}
                {this.state.login &&
                <View style={styles.btnArea}>
                    <Btn label='ENTRAR'  onPress={()=>this.signin()}/>
                </View>
                }
                {this.state.register && 
                <View  style={styles.btnArea}>
                    <Btn label='CADASTRAR' onPress={()=>this.signup()}/>
                </View>
                }
            </ScrollView>
        )
     }
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#F1F1F1'
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
        padding:10,
        
    },
    textCreate: {
        color:'#17133B',
        textDecorationLine: 'underline'
        
    },btnArea: {
        marginBottom: 50,
        marginTop: 30
    }
    
})
