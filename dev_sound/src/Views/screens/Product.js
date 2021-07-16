import React, { Component } from 'react';
import {StyleSheet, ScrollView, View, Text, Image, Dimensions} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Title from '../components/Title';
import Button from '../components/Button';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {

    productName: "",
    productImage: "",
    productPrice: "",
    productDescription: "",
    productSpecs: "",
}

export default class Product extends Component{

    state={...initialState}

    async componentDidMount (){
   
    await this.ProductDBImports()
    await this.ProductBanner()

    }

    componentWillReceiveProps(){
     this.ProductBanner()
    }


    saveStorage = async () => {

        const dataProduct = {
            id_Produto:this.state.productID,
            nome:this.state.productName,
            img:this.state.productImage,
            modelo:this.state.productModel,
            categoria:this.state.productCategory,
            valor_unitario:this.state.productPrice,
            qtd_Produto:1,
            excludeID:(Math.random()*1000),
        }

        let arrProduct = []
        
        let responseAsync = await  AsyncStorage.getItem('product')
        let parse =  JSON.parse(responseAsync)

        if(parse){
            arrProduct = [...parse] 
        }

        arrProduct.push(dataProduct)

        await AsyncStorage.setItem('product',JSON.stringify(arrProduct))

        
    }



    envProduct  = async () => {
        await this.saveStorage()
        this.props.navigation.navigate('ShopCart')
    }


    ProductDBImports = async () => {
        let productId = this.props.navigation.getParam('id')
        await axios.get(`http://10.0.3.2:3000/produtos/id/${productId}`)
        .then((infos) => {


        this.setState({
            productID: infos.data[0]._id,
            productName: infos.data[0].nome,
            productImage: infos.data[0].img,
            productPrice: infos.data[0].preco,
            productDescription: infos.data[0].descricao,
            productSpecs: infos.data[0].especificacao,
            productModel:infos.data[0].modelo,
            productCategory:infos.data[0].categoria
            })
        })
    }

    willFocus = this.props.navigation.addListener('willFocus', () => {this.ProductDBImports()})


    ProductBanner = async () => {
        let productName = this.props.navigation.getParam('nome')
        await axios.get(`http://10.0.3.2:3000/produtos/${productName}`)
        .then((infos) => {
        this.setState({
            productID: infos.data[0]._id,
            productName: infos.data[0].nome,
            productImage: infos.data[0].img,
            productPrice: infos.data[0].preco,
            productDescription: infos.data[0].descricao,
            productSpecs: infos.data[0].especificacao
            })
        })
    }

    willFocus = this.props.navigation.addListener('willFocus', () => {this.ProductBanner()})

    tratarPreco = (preco) => {
        let precoConvertido = parseFloat(preco).toFixed(2)
        return `R$${precoConvertido.replace('.', ',')}`
    }

    render(){ 
        
        return(

            <ScrollView style={styles.scrollviewContainer}>
                
                <Header
                    drawer={() => this.props.navigation.openDrawer()} 
                    cart={() => this.props.navigation.navigate('ShopCart')} 
                />   

            <Text style={styles.productTitle}>{this.state.productName}</Text>
            <View style={styles.imageContainer}>
                    <Image style={styles.productImage} source={{uri: `${this.state.productImage}`}}/>
            </View>

            <View style={styles.priceContainer}>
                <View style={styles.collumnContainer}>
                    <Text style={styles.priceTitle}>Preço</Text>
                    <Text style={styles.price}>{this.state.productPrice}</Text>
                </View>
                <View style={styles.inlineContainer}>
                    <Button 
                    onPress={() => this.envProduct()}
                    label='Comprar'/>
                </View>
            </View>

            <View style={styles.descriptionContainer}>
                <Title title='Descrição do produto'/>
                <Text style={styles.descriptionText}>{this.state.productDescription}</Text>
                <Text style={styles.specsTitle}>Especificações</Text>
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
            fontSize: 22,
            
        },

        imageContainer:{
            width: Dimensions.get('window').width/1.1,
            height: Dimensions.get('window').width/1.1,
            alignSelf: 'center',
            marginTop: 25,
            elevation: 7,
            borderColor: '#000'
        },

        productImage: {
            width: '100%',
            height: '100%',
            borderRadius: 11,
        },

        descriptionContainer: {
            width: '89%',
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
            justifyContent: 'flex-end',
            marginTop: 50,
        },

        priceTitle: {
            fontSize: 25,
            fontWeight: "500",
            fontWeight: 'bold'
        },

        specsTitle: {
            fontSize: 25,
            fontWeight: "500",
            fontWeight: 'bold',
            marginTop: 10,
            marginLeft: 10
        },

        priceContainer:{
            flexDirection: 'row',
            width: '88%',
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
