import Header from '../components/Header'
import Input from '../components/Input'
import Portrait from '../components/Register/Portrait'
import Button from '../components/Button'
import Title from '../components/Title'
import { TextInput } from 'react-native-paper';
import Logo from '../components/Header/logo'
import React, { Component } from 'react'
import { Text, View, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native'
import axios from 'axios'
import { ActivityIndicator, Colors } from 'react-native-paper';

const initialState = {
    finally: false,
    email: '',
    spin: false
}

export default class ChangePassMail extends Component {
    state = {
        ...initialState
    }
    change = async () => {
        this.setState({ spin: true })
        if (this.state.email) {
            try {
                const resp = await axios.post("http://10.0.3.2:3000/tempPassword", {
                    email: this.state.email
                })
                this.setState(
                    {
                        finally: true,
                        spin: false
                    })
            }
            catch (err) {
                if (`${err}` == 'Error: Request failed with status code 404') {
                    Alert.alert('Erro ao localizar E-mail', 'E-mail informado não cadastrado', [{
                        text: 'Ok',
                        onPress: () => { this.setState({ ...initialState }) }
                    },])

                } else {
                    Alert.alert('Erro ao localizar E-mail', `Erro de conexão \n\n${err}`, [{
                        text: 'Ok',
                        onPress: () => { this.setState({ ...initialState }) }
                    },])

                }

            }
        } else {
            Alert.alert('Erro ao enviar E-mail', 'Por favor, preencha o campo corretamente.', [{
                text: 'Ok',
                onPress: () => { this.setState({ ...initialState }) }
            },])
        }


    }
    render() {
        return (
            <ScrollView style={styles.scrollContainer}>
                <View style={styles.logoArea}>
                    <Logo comeBackHome={() => this.props.navigation.navigate('Home')} />
                </View>
                {!this.state.finally &&
                    <View style={styles.pageTitle}>
                        <Title title='Recuperação de senha' />
                    </View>
                }
                <Portrait>
                    {!this.state.finally &&
                        <View>
                            <Text style={styles.formTitle}>Informe o e-mail cadastrado</Text>
                        </View>}
                    {!this.state.finally &&
                        <Input
                            left={<TextInput.Icon name="account" />}
                            placeholder='Insira seu e-mail'
                            fieldLabel='E-mail'
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={email => this.setState({ email })} />
                    }
                    {this.state.finally &&
                        <Text style={styles.passText}>Uma senha temporária foi enviada para a sua caixa de E-mail.</Text>
                    }
                    {this.state.finally &&
                        <Text style={styles.passText}>(Verifique o Spam)</Text>
                    }
                </Portrait>

                <View style={styles.btnArea}>
                    {!this.state.finally &&
                        <Button
                            label='Enviar'
                            onPress={() => this.change()} />
                    }
                </View>
                {!this.state.finally &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                        <Text style={styles.goback}>Voltar para o login</Text>
                    </TouchableOpacity>
                }
                {this.state.finally &&
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Auth')}>
                        <Text style={styles.goback}>Voltar para o login</Text>
                    </TouchableOpacity>
                }
                <ActivityIndicator size={200} animating={this.state.spin} color={'#FACC30'} />
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#F1F1F1'
    },
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
    passText: {
        fontSize: 20,
        marginTop: 20,
    },
    goback: {
        textAlign: 'center',
        color: '#17133B',
        textDecorationLine: 'underline',
        fontSize: 18,
        marginTop: 20
    },
    input: {
        fontSize: 25,
        marginBottom: 5,
    },
    pageTitle: {
        marginBottom: 10,
        alignSelf: 'center',
        marginLeft: -10
    },
    logoArea: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 35,
    },
    formTitle: {
        fontSize: 23,
        textAlign: 'center',
        marginTop: 5,
        marginBottom: 15,
        marginRight: 10
    },
})