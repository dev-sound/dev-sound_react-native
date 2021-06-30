
import React, { Component } from 'react'
import {View,Text,ScrollView,StyleSheet,Dimensions} from 'react-native'
import Input from '../components/Input'
import Logo from '../components/Header/logo'



export default class Payment extends Component {
    
    state = { }

    render(){

        return (
            <ScrollView style={styles.container} > 

                <View style={styles.logoArea}>
                    <Logo/>
                </View>

                <View style={styles.textTitles}>
                    <Text style={styles.titleForm}>Forma de Pagamento</Text>
                </View>

                <View style={styles.areaForms}>
                    <Input 
                        label = 'Numero Cartão'
                        placeholder='Cartão de Credito'
                    
                    />

                    <Input 
                     
                        label = 'Nome do Cartão'
                        placeholder='Digite seu nome'
                    
                    />

    

                    <View style={styles.areaInputsMins}>

                        <Input 
                        medium
                        label = 'Mês de expiração'
                        placeholder='Digite seu nome'
                    
                        />

                        <Input 
                           medium
                        label = 'Ano de expiração'
                        placeholder='Digite seu nome'
                    
                        />

                        <Input 
                         medium
                        label = 'CVV'
                        placeholder='Digite seu nome'
                    
                        />
                            
                    </View>

                </View>
            </ScrollView>
        )
    }
}


const styles = StyleSheet.create(
    {
  
        areaForms:{
        
            padding:16
        },

        logoArea:{
            justifyContent:'center',
            alignItems:'center',
            padding:35,
          
        },

        textTitles:{
            backgroundColor:'#E2DDDD',
            height:40,
            justifyContent:'center',
            padding:5
        },

        titleForm:{
            fontSize:20,
            letterSpacing:0.3,
            fontWeight:'bold',
            color:'rgba(0,0,0,0.8)'
        },

        areaInputsMins:{
            flexDirection:'row'
        }
    }
)