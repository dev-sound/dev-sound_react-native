import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import Header from '../components/Header/index'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import InputAreaContact from '../components/Contact/InputAreaContact'
import axios from 'axios'

const initialState = {
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
    focus: false,
    validNome: '',
    validEmail: '',
    validAssunto: '',
    validMensagem: ''
}


export default class Contact extends Component {

    state = { ...initialState }


    //Função focus textarea
    inputFocus = () => {
        this.setState({ focus: true })
    }

    //funções para capturar caracteres dos inputs
    captureName = (caractere) => {
        this.setState({ nome: caractere })
    }
    captureEmail = (caractere) => {
        this.setState({ email: caractere })
    }
    captureTopic = (caractere) => {
        this.setState({ assunto: caractere })
    }
    captureMessage = (caractere) => {
        this.setState({ mensagem: caractere })
    }


    //validações do Input
    validName = () => {
        const regexname = /[A-Z][a-z]* [A-Z][a-z]*/
        if(regexname.test(this.state.nome)){
            this.setState({validNome: 'valid'})
        }else{
            this.setState({validNome: 'noValid'})
        }
    }

    validEmail = () => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ 
        if(regexEmail.test(this.state.email)){
            this.setState({validEmail: 'valid'})
        }else{
            this.setState({validEmail: 'noValid'})
        }
    }

    validTopic = () => {
        if(this.state.assunto != ''){
            this.setState({validAssunto: 'valid'})
        }else{
            this.setState({validAssunto: 'noValid'})
        }
    }

    validMessage = () => {
        if(this.state.mensagem != ''){
            this.setState({validMensagem: 'valid'})
        }else{
            this.setState({validMensagem: 'noValid'})
        }
    }

    
    contact = async () => {
        try {
            await axios.post("http://10.0.3.2:3000/contato", {
                nome: this.state.nome,
                email: this.state.email,
                assunto: this.state.assunto,
                mensagem: this.state.mensagem,

            })
            Alert.alert('Mensagem enviada!') 
            this.setState({...initialState})
        } catch (err) {
            this.validName()
            this.validEmail()
            this.validTopic()
            this.validMessage()
            console.warn(err)
            Alert.alert('Verifique se todos os campos foram preenchidos.')
            
        }
    }



    render() {

        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.titleContainer}>
                    <Title title='Contato' />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        fieldLabel='Nome completo'
                        placeholder='Insira seu nome completo'
                        style={styles.label}
                        setSize={420}
                        onChangeText={(caractere) => this.captureName(caractere)}
                        value={this.state.nome}
                        validInput = {this.state.validNome}
                        onBlur={() => this.validName()}
                        
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        fieldLabel='Email'
                        placeholder='Insira seu e-mail'
                        style={styles.label}
                        setSize={420}
                        onChangeText={(caractere) => this.captureEmail(caractere)}
                        value={this.state.email}
                        validInput = {this.state.validEmail}
                        onBlur={() => this.validEmail()}
                    />
                </View>
                <View style={styles.inputContainer}>
                <Input
                        fieldLabel='Assunto'
                        placeholder='Insira o assunto do seu contato'
                        setSize={420}
                        onChangeText={(caractere) => this.captureTopic(caractere)}
                        value={this.state.assunto}
                        validInput = {this.state.validAssunto}
                        onBlur={() => this.validTopic()}
                    />
                    <Input
                        fieldLabel='Assunto'
                        placeholder='Insira o assunto do seu contato'
                        style={styles.label}
                        setSize={420}
                        onChangeText={(caractere) => this.captureTopic(caractere)}
                        value={this.state.assunto}
                        validInput = {this.state.validAssunto}
                        onBlur={() => this.validTopic()}
                    />
                </View>
                <View style={styles.textareaContainer}>
                    <Text style={styles.label}>Mensagem</Text>
                    <InputAreaContact
                        multiline={true}
                        numberOfLines={10}
                        focus={this.state.focus}
                        onFocus={() => this.inputFocus()}
                        onBlur={() => this.setState({ focus: false })}
                        selectionColor={'#311b92'}
                        onChangeText={(caractere) => this.captureMessage(caractere)}
                        value={this.state.mensagem}
                        validInput = {this.state.validMensagem}
                        onBlur={() => this.validMessage()}
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <Button
                        label='ENVIAR'
                        onPress={() => this.contact()}
                    />
                </View>
            </View>
        )
    }

}



const styles = StyleSheet.create({
    titleContainer: {
        paddingTop: 25,
        paddingBottom: 15
    },
    label: {
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '300',
        padding: 5,
    },
    inputContainer: {
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop: 25,
        marginHorizontal: 120
    },
    textareaContainer: {
        alignItems: 'center',
        padding: 5
    },


})
