import React, { Component } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'

import Header from '../components/Header/index'
import Title from '../components/Title'
import Input from '../components/Input'
import Button from '../components/Button'
import axios from 'axios'
import Icon from 'react-native-vector-icons/FontAwesome'

import InputAreaContact from '../components/Contact/InputAreaContact'

const initialState = {
    nome: '',
    email: '',
    assunto: '',
    mensagem: '',
    focus: false,
    validNome: '',
    validEmail: '',
    validAssunto: '',
    validMensagem: '',
    validInput: ''
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
        if (regexname.test(this.state.nome)) {
            this.setState({ validNome: 'valid' })
        } else {
            this.setState({ validNome: 'noValid' })
        }
    }

    validEmail = () => {
        const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (regexEmail.test(this.state.email)) {
            this.setState({ validEmail: 'valid' })
        } else {
            this.setState({ validEmail: 'noValid' })
        }
    }

    validTopic = () => {
        if (this.state.assunto != '') {
            this.setState({ validAssunto: 'valid' })
        } else {
            this.setState({ validAssunto: 'noValid' })
        }
    }

    validMessage = () => {
        if (this.state.mensagem != '') {
            this.setState({ validMensagem: 'valid' })
        } else {
            this.setState({ validMensagem: 'noValid' })
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
            this.setState({ ...initialState })
        } catch (err) {
            this.validName()
            this.validEmail()
            this.validTopic()
            this.validMessage()
            Alert.alert('Verifique se todos os campos foram preenchidos.')

        }
    }



    render() {

        return (
            <View style={styles.container}>
                <Header drawer={() => this.props.navigation.openDrawer()} />
                <View style={styles.titleContainer}>
                    <Title title='Contato' />
                </View>

<<<<<<< HEAD
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        fieldLabel='Email'
                        placeholder='Insira seu e-mail'
                        style={styles.label}
                        setSize={390}
                        onChangeText={(caractere) => this.captureEmail(caractere)}
                        value={this.state.email}
                        validInput={this.state.validEmail}
                        onBlur={() => this.validEmail()}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Input
                        fieldLabel='Assunto'
                        placeholder='Insira o assunto do seu contato'
                        style={styles.label}
                        setSize={390}
                        onChangeText={(caractere) => this.captureTopic(caractere)}
                        value={this.state.assunto}
                        validInput={this.state.validAssunto}
                        onBlur={() => this.validTopic()}
                    />
                </View>
=======
                <Input
                    styleInput={styles.styleInput}
                    inputContainer={styles.inputContainer}
                    fieldLabel='Nome completo'
                    placeholder='Insira seu nome completo'
                    style={styles.label}
                    setSize='90%'
                    onChangeText={(caractere) => this.captureName(caractere)}
                    value={this.state.nome}
                    validInput={this.state.validNome}
                    onBlur={() => this.validName()}

                />
                <Input
                    styleInput={styles.styleInput}
                    inputContainer={styles.inputContainer}
                    fieldLabel='Email'
                    placeholder='Insira seu e-mail'
                    style={styles.label}
                    setSize='90%'
                    onChangeText={(caractere) => this.captureEmail(caractere)}
                    value={this.state.email}
                    validInput={this.state.validEmail}
                    onBlur={() => this.validEmail()}
                />
                <Input
                    styleInput={styles.styleInput}
                    inputContainer={styles.inputContainer}
                    fieldLabel='Assunto'
                    placeholder='Insira o assunto do seu contato'
                    setSize='90%'
                    style={styles.label}
                    onChangeText={(caractere) => this.captureTopic(caractere)}
                    value={this.state.assunto}
                    validInput={this.state.validAssunto}
                    onBlur={() => this.validTopic()}
                />

>>>>>>> 639932278420b00e7e809d2989558853422d4476
                <View style={styles.textareaContainer}>
                    <Text style={styles.mensagem}>Mensagem</Text>

                    <InputAreaContact
                        multiline={true}
                        numberOfLines={10}
                        focus={this.state.focus}
                        onFocus={() => this.inputFocus()}
                        onBlur={() => this.setState({ focus: false })}
                        selectionColor={'#311b92'}
                        onChangeText={(caractere) => this.captureMessage(caractere)}
                        value={this.state.mensagem}
                        validInput={this.state.validMensagem}
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
    container: {
<<<<<<< HEAD
        backgroundColor: '#F1F1F1'
    },

=======
        width: '100%'
    },
>>>>>>> 639932278420b00e7e809d2989558853422d4476
    titleContainer: {
        paddingTop: 25,
        paddingBottom: 15
    },
    label: {
        fontSize: 22,
        fontStyle: 'normal',
        marginLeft: '5%',
        fontWeight: '300',
        padding: 5,
    },
    inputContainer: {
        justifyContent: 'center',

    },
    styleInput: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        paddingTop: 25,
        marginHorizontal: 120
    },
    textareaContainer: {
        justifyContent: 'center',
<<<<<<< HEAD
        alignSelf: 'center'
=======
        alignContent: 'center',
        marginLeft: '5%'

>>>>>>> 639932278420b00e7e809d2989558853422d4476
    },
    icon: {
        position: 'absolute',
        left: 420,
        top: 60
    },
    mensagem: {
        fontSize: 22,
        fontStyle: 'normal',
        fontWeight: '300',
<<<<<<< HEAD
        marginLeft:15,
        paddingBottom: 10,
=======
        padding: 5

>>>>>>> 639932278420b00e7e809d2989558853422d4476
    }


})
