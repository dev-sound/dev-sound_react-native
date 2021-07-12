import React, { Component } from 'react';
import {StyleSheet, ScrollView, AsyncStorage, View, Text, Image} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Title from '../components/Title';
import Button from '../components/Button';
import axios from 'axios';

const initialState = {
    productName: "",
    productImage: "",
    productPrice: "",
    productDescription: "",
    productSpecs: "",
}

console.log(initialState)

export default class Product extends Component{

    state={...initialState}

    async componentDidMount (){

        await this.getProduct()  
    } 
  
    getProduct = async () => {
  
         let resp = await axios.get(`http://10.0.3.2:3000/produtos/id/60e8e11f3f648551d7c267eb`)
        console.warn(resp.data[0])
    }

    render(){ 

    return(

        <ScrollView style={styles.scrollviewContainer}>
            <Header/>
            <Search/>

        <Text style={styles.productTitle}>{this.state.productName}</Text>
        <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={this.state.productImage}/>
        </View>

        <View style={styles.priceContainer}>
            <View style={styles.collumnContainer}>
                <Title title='Preço' />
                <Text style={styles.price}>R${this.state.productPrice}</Text>
            </View>
            <View style={styles.inlineContainer}>
                <Button label='Comprar'/>
            </View>
        </View>

        <View style={styles.descriptionContainer}>
            <Title title='Descrição e Especificações'/>
            <Text style={styles.descriptionText}>{this.state.productDescription}</Text>
            <Text style={styles.descriptionText}>{this.state.productSpecs}</Text>
        </View>
            
        </ScrollView>
                )
            }
    }
        
const styles =  StyleSheet.create(
    {   
        scrollviewContainer: {
            backgroundColor: '#F1F1F1'
        },

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
