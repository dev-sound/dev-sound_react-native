import Header from '../components/Header';
import PaymentDetails from '../components/PaymentDetails';
import Title from '../components/Title';

import React, { Component } from 'react'
import { Text, FlatList, StyleSheet, View } from 'react-native'
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';


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
                <View >
                    <Text style={style.text}>Boleto: </Text>
                    <View style={style.paymentArea}>
                        <Text style={style.paymentNumber}>{this.state.numeroBoleto}</Text>
                    </View>
                </View>
            )
        }
        return (
            <>
                <Text style={style.text}>Cartão de Crédito</Text>
            </>
        )
    }
    renderProduct = ({ item }) => {
        return (
            <PaymentDetails
                datails
                nameProduct={item.nome}
                modelProduct={item.modelo}
                priceUnit={item.valor_unitario} />
        )
    }
    render() {
        return (
            <ScrollView>
                <Header drawer={() => this.props.navigation.openDrawer()}
                    comeBackHome={() => this.props.navigation.navigate('Home')}
                    cart={() => this.props.navigation.navigate('ShopCart')}
                />
                <Text style={style.title}>Detalhes do pedido</Text>
                <Text style={style.subTitle}>Forma de pagamento:</Text>
                {this.payment()}
                <Text style={style.date}> Data da compra:  {`\n ${this.state.dataCompra.substring(0, 10)}`}</Text>
                <Text style={style.subTitle}>Itens comprados: </Text>
                <FlatList
                    data={this.state.products}
                    keyExtractor={item => item.id}
                    renderItem={this.renderProduct} />
                <Text>{this.state.totalValue}</Text>
            </ScrollView>
        )
    }
}
const style = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 10,
        fontWeight: 'bold'
    },
    subTitle: {
        textAlign: 'center',
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 10,
        fontWeight: 'bold'
    },
    text: {
        textAlign: 'center',
        fontSize: 18,
        marginLeft: 10,
        fontWeight: "500",
        marginLeft: 10,
        fontWeight: 'bold'
    },
    paymentNumber:{
        textAlign: 'center',
        fontSize: 20,
        fontWeight: "500",
        marginLeft: 10,
        fontWeight: 'bold'
    },
    paymentArea: {
        textAlign: 'center',
        margin: 10
    },
    date: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: "500",
        marginLeft: 10,
        fontWeight: 'bold'
    }
})