import React, { Component } from 'react'
import { 
    Text, ScrollView, View, TouchableOpacity, StyleSheet, FlatList
} 
from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import Header from '../components/Header'
import Button from '../components/Button'
import ProductOrder from '../components/ProductOrder/ProductOrder'
import AsyncStorage from '@react-native-async-storage/async-storage'


const initialState = {
    clientName: '',
    clientLastName: '',
    clientCity: '',
    clientUF: '',
    clientStreet: '',
    clientNumber: '',
    clientCEP:'',
    clientDistrict: '',
    clientCreditCard: '',
    clientOrders: '',
    switch: false
}
export default class Profile extends Component {
    state = {
        ...initialState
    }
    async componentDidMount(){
        const userData  = await AsyncStorage.getItem('userData')
        const parseUserData = JSON.parse(userData)
       let resp =  await axios.get(`http://10.0.3.2:3000/usuario/email/${parseUserData.email.login}`)
        this.setState({clientName: resp.data[0].nome, 
            clientLastName: resp.data[0].sobrenome})
        if(resp.data[0].Endereco.cep){
            this.setState({clientCEP: resp.data[0].Endereco.cep,
                clientStreet: resp.data[0].Endereco.rua,
                clientNumber: resp.data[0].Endereco.numero,
                clientDistrict: resp.data[0].Endereco.bairro,
                clientCity: resp.data[0].Endereco.cidade,
                clientUF: resp.data[0].Endereco.UF,
                clientCreditCard: resp.data[0].cartaoCredito,
                clientOrders: resp.data[0].Pedidos})
        }
    }
    logOut = async () => {
        delete axios.defaults.headers.common['Authorization']
        await AsyncStorage.removeItem('userData')
        this.setState({...initialState}) 
        this.props.navigation.navigate('Auth')
    }
    orderDetails = async (id) => {
        let resp = await axios.get(`http://10.0.3.2:3000/Pagamento/${id}`)
        console.warn(resp.data)
        

       
    }
    
    

    render(){
        // console.log(this.state.clientOrders[0].dataPedido)
        return(
            
            <ScrollView>
                <Header drawer={() => this.props.navigation.openDrawer()}/>
                <View style= {styles.clientArea}>
                    <Icon name='user-circle'  size={50} color={'#c1c1c1'}/>
                    <View style = {styles.iconArea}>
                        <Text style = {styles.name}>{this.state.clientName} {this.state.clientLastName}</Text>
                        <TouchableOpacity  onPress={()=> this.logOut()} style ={styles.logOutContainer}>
                            <Icon name= 'door-open' size= {13} />
                            <Text style={styles.exit}>SAIR</Text>
                        </TouchableOpacity> 
                    </View>
                </View>
            <View style = {styles.title}>
                <Text style = {styles.name}>Meu endereço de entrega</Text>
            </View>
            <View  style = {styles.adressField}>
                
                
                <Text style = {styles.adress}>
                {this.state.clientStreet}, {this.state.clientCity}, {this.state.clientUF}
                </Text> 
                
                <View style = {styles.fields}>
                    <Text style = {styles.adress}>
                        Número: 
                    </Text>
                    <Text>
                         {this.state.clientNumber}
                    </Text>
                </View>
                <View style = {styles.fields}>
                    <Text style = {styles.adress}>
                        CEP: 
                    </Text>
                    <Text>
                       {this.state.clientCEP}
                    </Text>
                </View>
            </View>
            <View style = {styles.btnAdress}>
                <View style = {styles.oneBtn}>
                    {/* <Button smallButton label= "EXCLUIR"/> */}
                </View>
                <View>
                    {/* <Button smallButton label= "ALTERAR"/> */}
                </View>
            </View>
            <View style = {styles.title}>
                <Text style = {styles.name}>Meu Cartão</Text>
            </View>
                <View  style = {styles.adressField}>
                    <Text style = {styles.adress}>
                        cartão de crédito 
                    </Text>
                <View style = {styles.cardArea}> 
                    <Text style = {styles.card}>
                        XXXX XXXX XXXX {this.state.clientCreditCard.substring(this.state.clientCreditCard.length -4,)}
                    </Text>
                    {/* <Button smallButton label= "EXCLUIR"/> */}
                </View>
            </View>
            <View style = {styles.title}>
                <Text style = {styles.name}>Meus pedidos</Text>
            </View>
            <View style={styles.orders}>
                <Text>
                    Número do Pedido
                </Text>
                <Text>
                    Data
                </Text>
                <Text>
                    Pagamento
                </Text>
            </View>
            <View>
                <FlatList
                data = {this.state.clientOrders}
                keyExtractor = {(item)=> `${item.idPedido}`}
                renderItem= {({item})=>{
                    return(
                            <View style={styles.flatlist}>
                                <Text style={{color:'black'}}>{item.idPedido.substring(2,14)}</Text>
                                <Text style={{color:'black'}}>{item.dataPedido.substring(0,10)}</Text>
                                {item.formaPagamento.ehBoleto&& 
                                <Text style={{color:'black'}}>Boleto</Text>}
                                {!item.formaPagamento.ehBoleto&& 
                                <Text style={{color:'black'}}>Cartão</Text>}
                            </View>
                        )
                    }}/>
            </View>

            </ScrollView>
         )
    }
    
}
const styles = StyleSheet.create({
    clientArea: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 12,
        marginBottom: 20
    },
    iconArea:{
        paddingLeft:30,
        
    },
    name:{
        fontSize: 20,
        fontWeight: '300'
    },
    logOutContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop:10,
        width: 60
    },
    exit:{
        fontSize: 17,
        paddingLeft: 10
    },
    title:{
        backgroundColor: '#eeeeee',
        paddingLeft: 12,
        paddingVertical: 10
    },
    fields:{
        flexDirection: 'row'
    },
    adress:{
        paddingRight: 10,
        fontWeight: 'bold'
    },
    adressField: {
        padding: 15
    },
    btnAdress : {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 20
        
    },
    oneBtn: {
        marginRight: 30
    },
    cardArea: {
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
        marginRight: 20
    },
    orders: {
        justifyContent: 'space-around',
        flexDirection: 'row'
    },
    flatlist:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: '1%',
        paddingHorizontal: '10%',
        height: 50,
        backgroundColor: '#c1c1c1'
    }
})
