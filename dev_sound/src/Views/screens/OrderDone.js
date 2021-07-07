import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


import ProductOrder from '../components/ProductOrder/ProductOrder'
import Title from '../components/Title'
import Button from '../components/Button'

const initialState = {

}
export default class classname extends Component {

    state = {...initialState}

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.containerRow}>
                    <Icon name='check' color='green' size={60}/>
                    <View style={styles.containerCol}>
                        <Text style={styles.textN}>SEU PEDIDO FOI CONFIRMADO!</Text>
                        <Text style={styles.textSub}>Obrigado por comprar na DevSound.</Text>
                    </View>
                </View>
                <View style={styles.containerGrey}>
                    <View style={styles.containerRow}>
                        <Text style={styles.text}>Número do pedido: </Text>
                        <Text style={styles.textN}>2196976</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.text}>Entrega prevista para: </Text>
                        <Text style={styles.textN}>20/07</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.textSub}>Veja mais em </Text>
                        <Button smallButton label='MEU PERFIL'/>
                    </View>    
                </View>
                <View style={styles.containerGrey}>
                    <Title title='Resumo do pedido'/>
                </View>
                <ProductOrder/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 60
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5
    },
    containerCol: {
        flexDirection: 'column',
        padding: 5,
        marginTop: 5,
    },
    containerGrey: {
        marginVertical: 15,
        padding: 5,
        backgroundColor: '#E2DDDD'
    },
    textN: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },
    textSub: {
        fontSize: 16,
        textAlign: 'center',
        marginRight: 5
    },
    text: {
        fontSize: 20,
        textAlign: 'center'
    }
})