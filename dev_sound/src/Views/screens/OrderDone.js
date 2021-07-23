import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Header from '../components/Header/'
import ProductOrder from '../components/ProductOrder/ProductOrder'
import Title from '../components/Title'
import Button from '../components/Button'



export default class OrderDone extends Component {

    

    customDidMount = async () => {
        AsyncStorage.removeItem('product')
        const userData  = await AsyncStorage.getItem('userData')
        const parseUserData = JSON.parse(userData)
        
        const resp =  await axios.get(`http://10.0.3.2:3000/usuario/email/${parseUserData.email.login}`)
        const order = resp.data[0].Pedidos
        const lastOrder = order[order.length-1]
        this.setState({productId: lastOrder.idPedido})
        this.setState({date: lastOrder.dataPedido})
    }

    componentDidMount() {
        this.customDidMount()
    }

    willFocus = this.props.navigation.addListener('willFocus',
    () => {this.customDidMount()}
    )

    state = {
        productId : '',
        date : '',
    }

    // getOrder = async () => {
    //     await axios.get(`http://10.0.3.2:3000/Pagamento/${this.state.clientOrderId}`)
    //     .then(infos => {
    //       this.setState({respPedido:infos.data})

    //    })
    //    .catch(erro => console.warn(erro))
    // }




    render() {
        return (
            <ScrollView style={styles.container}>
                <Header
                    drawer={() => this.props.navigation.openDrawer()} 
                    cart={() => this.props.navigation.navigate('ShopCart')}
                    comeBackHome={() => this.props.navigation.navigate('Home')} />
                <View style={styles.messageContainer}>
                    {/* mensagem de confirmação */}
                    <View style={styles.containerRow}>
                        <Icon name='check' color='green' size={60}/>
                        <View style={styles.containerCol}>
                            <Text style={styles.textN}>SEU PEDIDO FOI CONFIRMADO!</Text>
                            <Text style={styles.textSub}>Obrigado por comprar na DevSound.</Text>
                        </View>
                    </View>
                    {/* info pedido e botão para o perfil */}
                    <View style={styles.containerGrey}>
                        <View style={styles.containerRow}>
                            <Text style={styles.text}>Número do pedido: </Text>
                            <Text style={styles.textN}>{this.state.productId.substring(2,14)}</Text>
                        </View>
                        <View style={styles.containerRow}>
                            <Text style={styles.text}>Data do pedido: </Text>
                            <Text style={styles.textN}>{this.state.date}</Text>
                        </View>
                        <View style={styles.containerRow}>
                            <Text style={styles.textSub}>Veja mais em </Text>
                            <Button onPress={() => {this.props.navigation.navigate('Profile')}}
                                smallButton label='Meu Perfil'/>
                        </View>    
                    </View>
                    {/* resumo pedido */}
                    {/* <View style={styles.containerGrey}>
                        <Title title='Resumo do pedido'/>
                    </View>
                    <ProductOrder/> */}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F1F1F1'
    },
    messageContainer:{
        marginTop: 20
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