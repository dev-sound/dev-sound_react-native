import Header from '../components/Header';
import PaymentDetails from '../components/PaymentDetails';
import Title from '../components/Title';

import React, { Component } from 'react'
import { Text, FlatList, StyleSheet, View, Dimensions } from 'react-native'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';
const format = require('../components/Common/moneyFormat')

const initialState = {
    products: [],
    totalValue: '',
    clientEmail: '',
    ehboleto: '',
    numeroBoleto: '',
    dataCompra: '',
    previsao: ''
}
export default class Details extends Component {
    state = {
        ...initialState
    }
    async componentDidMount() {
        this.importDetails()
    }


    importDetails = async () => {
        let orderDetails = this.props.navigation.getParam('orderId')
        let resp = await axios.get(`http://10.0.3.2:3000/Pagamento/${orderDetails}`)
        this.setState(
            {
                ehboleto: resp.data.Forma_pagamento.ehBoleto,
                numeroBoleto: resp.data.Forma_pagamento.numeroBoleto,
                totalValue: resp.data.Total_Valor,
                dataCompra: resp.data.data_compra,
                products: resp.data.Produtos,
                previsao: resp.data.previsao_entrega

            })

    }
    willFocus = this.props.navigation.addListener('willFocus', () => { this.importDetails() })

    payment = () => {
        if (this.state.ehboleto) {
            return (
                <View style={style.orderData}>
                    <Text style={style.text}>Boleto</Text>
                    <View style={style.orderData}>
                        <Text style={style.subTitle}>Número do boleto: </Text>
                    </View>
                            <View style={style.numberBox}>
                                <Text style={style.textNumber}>{this.state.numeroBoleto}</Text>
                            </View>
                    </View>
            )
        }
        return (
            <View style={style.cardTitleContainer}>
                <Text style={style.text}>Cartão de Crédito</Text>
            </View>
        )
    }
    renderProduct = ({ item }) => {
        return (
            <ScrollView>
            <PaymentDetails
                datails
                nameProduct={item.nome}
                modelProduct={item.modelo}
                priceUnit={item.valor_unitario} />
                </ScrollView>
        )
    }
    render() {
        console.warn(this.state.dataCompra)
        
        return (
            <ScrollView style={style.scrollContainer}>
                <Header drawer={() => this.props.navigation.openDrawer()}
                    comeBackHome={() => this.props.navigation.navigate('Home')}
                    cart={() => this.props.navigation.navigate('ShopCart')}
                />
                <View style={style.pageTitle}>
                <Title title='Detalhes do pedido'/>
                </View>
                <View style={style.dataContainer}>
                <View style={style.orderData}>
                <Text style={style.subTitle}>Forma de pagamento: </Text>
                <Text style={style.text}>{this.payment()}</Text>
                </View>
                <View style={style.orderData}>
                <Text style={style.subTitle}>Data da compra: </Text>
                <Text style={style.text}>{this.state.dataCompra.substring(0, 10)}</Text>
                </View>
                <View style={style.orderData}>
                <Text style={style.subTitle}>Total da compra: </Text>
                <Text style={style.text}>{format.moneyFormat(this.state.totalValue)}</Text>
                </View>
                <Text style={style.subTitleItems}>Itens comprados: </Text>
                </View>
                <View style={style.flatlistContainer}>
                <FlatList
                    data={this.state.products}
                    keyExtractor={item => item.id}
                    renderItem={this.renderProduct} />
                </View>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    scrollContainer:{
        backgroundColor: '#F1F1F1',
    },
    flatlistContainer: {
        marginBottom: 40,
    },
    orderData:{
        marginBottom: 4,
    },
    
    title: {
        textAlign: 'center',
        fontSize: 25,
        marginLeft: 10,
        fontWeight: 'bold'
    },
    subTitle: {
        fontSize: 20,
        fontWeight: "bold",
        
    },

    subTitleItems: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center'
    },

    text: {
        fontSize: 18,
        marginTop: 1,
    },

    textNumber: {
        width: '80%',
        fontSize: 18,
        marginBottom: 15,
    },

    pageTitle: {
        marginBottom: 5,
    },

    orderDataContainer: {
        flexWrap: 'wrap'
    },

    dataContainer: {
        margin: 10,
    },

    numberBox: {
        width: '100%'
    }

})