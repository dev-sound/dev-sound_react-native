import React, { Component } from 'react';
import {StyleSheet, ScrollView, AsyncStorage, View, Text, Image, Alert, Dimensions} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Title from '../components/Title';
import Button from '../components/Button';
import ImagesProject from '../components/Common/ImagesProject';
import axios from 'axios';

export default class Product extends Component{

    async componentDidMount (){

        await this.getProduct()
    }

    getProduct = async () => {

        await axios.get(`http://10.0.3.2:3000/produtos/id/60e746c462927f8fa179ceba`)
         .then(infos => {
           this.setState({resposta:infos.data})
         })
           .catch(erro => console.warn(erro))
   }

   state={
        
    respProdutos:[]

  }

    
    render(){ 

        return(

        <ScrollView >
            <Header/>
            <Search/>

        <Text style={styles.productTitle}></Text>
        <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={this.getProduct()}/>
        </View>

        <View style={styles.priceContainer}>
            <View style={styles.collumnContainer}>
                <Title title='Preço' />
                <Text style={styles.price}>R$</Text>
            </View>
            <View style={styles.inlineContainer}>
                <Button label='Comprar' onPress={() => this.sentToCart} />
            </View>
        </View>

        <View style={styles.descriptionContainer}>
            <Title title='Descrição e Especificações'/>
            <Text style={styles.descriptionText}></Text>
            <Text style={styles.descriptionText}></Text>
        </View>
            
        </ScrollView>
                )
            }
        }
        
const styles =  StyleSheet.create(
    {   
        productTitle: {
            alignSelf: 'center',
            width: '86%',
            marginTop: 15,
            fontSize: 25,
            fontWeight: 'bold',
            marginLeft: 10,
        },

        price: {
            fontSize: 28,
            marginLeft: 10,
        },

        imageContainer:{
            width: '87%',
            height: 412,
            alignSelf: 'center',
            marginTop: 25,
            elevation: 7,
            borderColor: '#000'
        },

        productImage: {
            width: '100%',
            height: 412,
            borderRadius: 11,
        },

        descriptionContainer: {
            width: '87%',
            backgroundColor: '#BABABA',
            alignItems: 'flex-start',
            padding: 15,
            alignSelf: 'center',
            borderRadius: 11,
            elevation: 6,
            marginBottom: 50,
        },

        collumnContainer:{
            marginTop: 40,
        },

        inlineContainer: {
            justifyContent: 'space-between',
            marginTop: 50,
        },

        priceContainer:{
            flexDirection: 'row',
            width: '86%',
            alignSelf: 'center',
            justifyContent: 'space-between',
            marginBottom: 35,
        },

        descriptionText:{
            width: '87%',
            marginTop: 10,
            marginLeft: 10,
            alignSelf: 'flex-start',
            fontSize: 21,
        }
    }
)
