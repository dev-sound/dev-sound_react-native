import Icon from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import Header from '../components/Header'
import Title from '../components/Title'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { Component } from 'react'
import {
    Text, ScrollView, View, TouchableOpacity, StyleSheet, FlatList
}
    from 'react-native'

const initialState = {
    clientName: '',
    clientLastName: '',
    clientCity: '',
    clientUF: '',
    clientStreet: '',
    clientNumber: '',
    clientCEP: '',
    clientDistrict: '',
    clientCreditCard: '',
    clientOrders: '',
    modalVisible: false,
    products: ''
}
export default class Profile extends Component {
    state = {
        ...initialState
    }
    willFocus = this.props.navigation.addListener('willFocus',
        () => { this.customDidMount() }
    )
    async componentDidMount() {
        this.customDidMount()
    }
    customDidMount = async () => {
        const userData = await AsyncStorage.getItem('userData')
        const parseUserData = JSON.parse(userData)

        let resp = await axios.get(`http://10.0.3.2:3000/usuario/email/${parseUserData.email.login}`)
        this.setState({
            clientName: resp.data[0].nome,
            clientLastName: resp.data[0].sobrenome
        })

        if (resp.data[0].Endereco.cep) {
            this.setState({
                clientCEP: resp.data[0].Endereco.cep,
                clientStreet: resp.data[0].Endereco.rua,
                clientNumber: resp.data[0].Endereco.numero,
                clientDistrict: resp.data[0].Endereco.bairro,
                clientCity: resp.data[0].Endereco.cidade,
                clientUF: resp.data[0].Endereco.UF,
                clientOrders: resp.data[0].Pedidos
            })

        }

        if (resp.data[0].cartaoCredito) {
            this.setState({
                clientCreditCard: resp.data[0].cartaoCredito,
            })

        }
    }


    logOut = async () => {
        delete axios.defaults.headers.common['Authorization']
        await AsyncStorage.removeItem('userData')
        this.setState({ ...initialState })
        this.props.navigation.navigate('Auth')
    }


    goToChangePass = () => {
        this.props.navigation.navigate('ChangePassLogin')
    }
    adressData = () => {
        if (this.state.clientStreet && this.state.clientCity && this.state.clientUF) {
            return (
                <>
                    <Text style={styles.adress}>
                        {this.state.clientStreet}, {this.state.clientCity}, {this.state.clientUF}
                    </Text>
                    <View style={styles.fields}>
                        <Text style={styles.adress}>
                            Número:
                        </Text>
                        <Text style={styles.adressText}>
                            {this.state.clientNumber}
                        </Text>
                    </View>
                    <View style={styles.fields}>
                        <Text style={styles.adress}>
                            CEP:
                        </Text>
                        <Text style={styles.adressText}>
                            {this.state.clientCEP}
                        </Text>
                    </View>
                </>
            )
        }
        return (
            <>
                <Text style={styles.noOrder}>Sem endereço cadastrado</Text>
            </>
        )
    }
    creditCardData = () => {
        if (this.state.clientCreditCard) {
            return (
                <>
                    <Text style={styles.adress}>
                        Cartão de crédito
                    </Text>
                    <View style={styles.cardArea}>
                        <Text style={styles.adressText}>
                            XXXX XXXX XXXX {this.state.clientCreditCard.substring(this.state.clientCreditCard.length - 4,)}
                        </Text>
                        {/* <Button smallButton label= "EXCLUIR"/> */}
                    </View>
                </>
            )
        }
        return (
            <>
                <Text style={styles.noOrder}>Sem cartão cadastrado</Text>
            </>
        )
    }
    orderData = () => {
        if (this.state.clientOrders) {
            return (
                <>
                    <View style={styles.orders}>
                        <Text style={styles.orderTitle}>
                            Número do Pedido
                        </Text>
                        <Text style={styles.orderTitle}>
                            Data
                        </Text>
                        <Text style={styles.orderTitle}>
                            Pagamento
                        </Text>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.clientOrders}
                            keyExtractor={(item) => `${item.idPedido}`}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={()=> this.goToDetails(item.idPedido)}>
                                        <View style={styles.flatlist}>
                                            <Text style={styles.orderItemsTitle}>{item.idPedido.substring(2, 14)}</Text>
                                            <Text style={styles.orderItemsTitle}>{item.dataPedido.substring(0, 10)}</Text>
                                            {item.formaPagamento.ehBoleto &&
                                                <Text style={styles.orderItemsTitle}>Boleto</Text>}
                                            {!item.formaPagamento.ehBoleto &&
                                                <Text style={styles.orderItemsTitle}>Cartão</Text>}
                                        </View>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                </>
            )
        }
        return (
            <View style={styles.adressField}>
                <Text style={styles.noOrder}>Ainda sem pedidos</Text>
            </View>
        )
    }
    goToDetails = (orderId) => {
        // console.warn(orderId)
        this.props.navigation.navigate('Details', {orderId: orderId})

    }


    render() {

        return (

            <ScrollView style={styles.scrollContainer}>
                <Header drawer={() => this.props.navigation.openDrawer()}
                    comeBackHome={() => this.props.navigation.navigate('Home')}
                    cart={() => this.props.navigation.navigate('ShopCart')}
                />
                <Title title='Minha conta' />
                <View style={styles.clientArea}>
                    <Icon name='user-circle' size={50} color={'#c1c1c1'} />
                    <View style={styles.iconArea}>
                        <Text style={styles.name}>{this.state.clientName} {this.state.clientLastName}</Text>
                        <View style={styles.btns}>
                            <TouchableOpacity onPress={() => this.logOut()} style={styles.logOutContainer}>
                                <Icon name='door-open' size={13} />
                                <Text style={styles.exit}>SAIR</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.goToChangePass()} style={styles.changePass}>
                                <Icon name='key' size={13} />
                                <Text style={styles.exit}>{'TROCAR SENHA'}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={styles.title}>
                    <Text style={styles.name}>Meu endereço de entrega</Text>
                </View>
                <View style={styles.adressField}>
                    {this.adressData()}
                </View>
                {/* <View style = {styles.btnAdress}> */}
                {/* <View style = {styles.oneBtn}>
                    {/* <Button smallButton label= "EXCLUIR"/> */}
                {/* </View> */}
                {/* <View> */}
                {/* <Button smallButton label= "ALTERAR"/> */}
                {/* </View> */}
                {/* </View> */}
                <View style={styles.title}>
                    <Text style={styles.name}>Meu Cartão</Text>
                </View>
                <View style={styles.adressField}>
                    {this.creditCardData()}
                </View>
                <View style={styles.title}>
                    <Text style={styles.name}>Meus pedidos</Text>
                </View>
                {this.orderData()}
            </ScrollView>
        )
    }

}
const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#F1F1F1'
    },
    clientArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 20,
        flex: 1,
        marginTop: 15
    },
    iconArea: {
        paddingLeft: 30,

    },
    btns: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    logOutContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%',
        marginRight: 10
    },
    changePass: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '55%',
    },
    exit: {
        fontSize: 17,
        paddingLeft: 10
    },
    title: {
        backgroundColor: '#E2DDDD',
        height: 40,
        justifyContent: 'center',
        padding: 10
    },
    fields: {
        flexDirection: 'row'
    },
    adress: {
        paddingRight: 10,
        fontWeight: 'bold',
        fontSize: 18
    },
    adressText: {
        paddingRight: 10,
        fontSize: 18
    },
    adressField: {
        padding: 15,
    },
    btnAdress: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20

    },
    oneBtn: {
        marginRight: 30
    },
    cardArea: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: 20
    },
    orderTitle: {
        margin: 5,
        fontWeight: 'bold',
        fontSize: 15
    },
    orders: {
        justifyContent: 'space-around',
        flexDirection: 'row',
    },
    orderItemsTitle: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 15
    },
    flatlist: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 15,
        alignItems: 'center',
        backgroundColor: '#FACC22',
        marginBottom: 10
    },
    noOrder: {
        fontSize: 30,
        textAlign: 'center'
    }
})
