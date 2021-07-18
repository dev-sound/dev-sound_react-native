import Header from '../components/Header'
import Portrait from '../components/Register/Portrait'
import Input from '../components/Input'
import Button from '../components/Button'



import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, View, Alert } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState = {
    user: '',
    newPass: '',
    confirmPass: '',
    validNewPass: '',
    validConfirmPass: '',
}
export default class ChangePassLogin extends Component {
    state={
        ...initialState,
    }
    async componentDidMount () {
        await this.captureUserInfos()
    }
    captureUserInfos = async () => {
        const userAuth = await AsyncStorage.getItem('userData')
        const userParse =  JSON.parse(userAuth)
        this.setState({user:userParse}) 
    }

    goToProfile = () => {
        this.props.navigation.navigate('Profile')
        this.setState({...initialState})
    }
    change = async () => {
        if(this.state.validNewPass && this.state.validNewPass == 'valid' && this.state.validConfirmPass && this.state.validConfirmPass == 'valid'){
            try {

                const resp = await axios.post("http://10.0.3.2:3000/changePassword", {
                 confirmaSenha: this.state.confirmPass
                }, 
                {
                    headers:{
                     'Authorization':this.state.user.token 
                     }
                })
                Alert.alert('Alterar Senha','Senha Alterada com sucesso' , [ {
                    text:'Ir Para o Perfil',
                    onPress: () => {this.props.navigation.navigate('Profile')}
                  },])
            }
            catch(err){
             console.warn(err)
            }
        }else{
           Alert.alert('Erro ao Alterar senha', 'Por favor, preencha corretamente todos os campos')
        }
    }
    regexPassword =(value) =>{
        const passwordValidator = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
        if(passwordValidator.test(value)){
            this.setState({validNewPass: 'valid'})
        }else{
            this.setState({validNewPass: 'noValid'})
        }
    }

    readyToSignup = (value) => {
        if(value==this.state.newPass&& value != ''){
            this.setState({validConfirmPass: 'valid'})
        }else{
            this.setState({validConfirmPass: 'noValid'})
        }
    }

    render(){
        return(
            <ScrollView style={styles.container}>
                <Header drawer={() => this.props.navigation.openDrawer()}/>
                <Portrait>
                    <Text style={styles.title}>Alterar Senha</Text>
                    <Input fieldLabel='Nova Senha'
                     placeholder= 'Crie uma senha'
                     secureTextEntry
                     validInput={this.state.validNewPass}
                     value={this.state.newPass}
                     onChangeText={newPass=> this.setState({newPass})}
                     onBlur={()=>this.regexPassword(this.state.newPass)}/>
                    <Text style={styles.textInput}>A senha deve conter no mínimo 8 caracteres, um digito numérico</Text>

                    <Input fieldLabel= 'Confirmar Senha'
                     placeholder= 'Confirme a senha'
                     secureTextEntry
                     validInput={this.state.validConfirmPass}
                     value={this.state.confirmPass}
                     onChangeText={confirmPass=> this.setState({confirmPass})}
                     onBlur={()=>this.readyToSignup(this.state.newPass)}/>
                    <Text style={styles.textInput}>As senhas devem ser iguais</Text>
                </Portrait>
                <View style={styles.btnArea}>
                    <Button label='Alterar' onPress={()=> this.change()}/>
                </View>
            </ScrollView>
         )
     }
}  
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    textInput: {
        marginBottom: 20
    },
    title: {
        fontSize: 28,
        textAlign: 'center'
    },
    btnArea: {
        margin: 10
    }
})