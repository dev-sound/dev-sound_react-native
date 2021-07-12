import React, { Component } from 'react'
import { 
    Text, ScrollView, View, TouchableOpacity, StyleSheet 
} 
from 'react-native'
import  Icon  from 'react-native-vector-icons/FontAwesome5'
import axios from 'axios'
import Header from '../components/Header'
import Button from '../components/Button'
import ProductOrder from '../components/ProductOrder/ProductOrder'
import AsyncStorage from '@react-native-async-storage/async-storage'
const initialState = {
    userLogOn: '',
    clientName: '',
    clientLastName: '',
    clientAdress: '',
    clientNumber: '',
    clientCEP:'',

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
            clientLastName: resp.data[0].sobrenome
        })
        console.warn(resp)
       
        console.warn(this.state.clientName)
        console.warn(parseUserData.email.login)
    }
    logOut = async () => {
        delete axios.defaults.headers.common['Authorization']
        await AsyncStorage.removeItem('userData')
        this.setState({...initialState}) 
        this.props.navigation.navigate('Auth')
        
    }
    
    render(){
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
                Lorem ipsum dolor sit, Butantã, São Paulo, SP
                </Text> 
                <View style = {styles.fields}>
                    <Text style = {styles.adress}>
                        Número: 
                    </Text>
                    <Text>
                         88
                    </Text>
                </View>
                <View style = {styles.fields}>
                    <Text style = {styles.adress}>
                        CEP: 
                    </Text>
                    <Text>
                        05314-011
                    </Text>
                </View>
            </View>
            <View style = {styles.btnAdress}>
                <View style = {styles.oneBtn}>
                    <Button smallButton label= "EXCLUIR"/>
                </View>
                <View>
                    <Button smallButton label= "ALTERAR"/>
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
                            *** **** **** XXXX
                    </Text>
                    <Button smallButton label= "EXCLUIR"/>
                </View>
            </View>
            <View style = {styles.title}>
                <Text style = {styles.name}>Meus pedidos</Text>
            </View>
            <ProductOrder/>
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
        fontSize: 13,
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
    
})
