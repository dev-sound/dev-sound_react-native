import Header from '../components/Header'
import Input from '../components/Input'
import Portrait from '../components/Register/Portrait'
import Button from '../components/Button'



import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity } from 'react-native'
import axios from 'axios'

const initialState = {
    finally : false,
    email: ''
}

export default class ChangePassMail extends Component {
    state = {
        ...initialState
    }
    change = async () => {
        if(this.state.email){
            try{
                const resp = await axios.post("http://10.0.3.2:3000/tempPassword",{
                    email: this.state.email
                })
                this.setState({finally:true})
            }
            catch(err){
                if(`${err}` == 'Error: Request failed with status code 404'){
                    Alert.alert('Erro ao localizar email', `Email informado não cadastrado  \n\n ${err}`)
                }else{
                    Alert.alert('Erro ao localizar email', `Erro de conexão \n\n${err}`) 
                }
                
            }
        }else{
            Alert.alert('Erro ao enviar email', 'Por favor preencha o campo email')
        }
        
        
    }
    render(){
        return(
            <View>
                <Header drawer={() => this.props.navigation.openDrawer()}/>
                {!this.state.finally &&
                 <Text style={styles.mainTitle}>Recuperação de senha</Text>
                }
                <Portrait>
                    {!this.state.finally && 
                    <Text style={styles.title}>Informe o Email cadastrado</Text>
                    }
                    {!this.state.finally && 
                    <Input 
                    placeholder= 'Insira seu email'
                    fieldLabel='Email'
                    value = {this.state.email}
                    onChangeText={email=>this.setState({email})}/>
                    }
                    {this.state.finally && 
                    <Text style={styles.passText}>Um e-mail contendo uma senha temporaria foi enviado para a sua caixa de e-mail.</Text>
                    }
                    {this.state.finally && 
                    <Text style={styles.passText}>(Verifique o Spam)</Text>
                    }
                </Portrait>
                {this.state.finally &&
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('Auth')}>
                    <Text style={styles.goback}>Voltar para o login</Text>
                </TouchableOpacity>
                }
                <View style ={styles.btnArea}>
                    {!this.state.finally && 
                    <Button 
                    label= 'Enviar'
                    onPress={()=>this.change()}/>
                    }
                </View>
            </View>
         )
     }
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 20
    },
    btnArea: {
        margin: 10
    },
    mainTitle: {
        fontSize: 30,
        textAlign: 'center',
        marginBottom: 20
    },
    passText:{
        fontSize: 30
    },
    goback:{
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        textDecorationLine: 'underline'
    }
})