import React, { Component } from 'react';
import {StyleSheet, ScrollView, AsyncStorage, View, Text, Image, Alert, Dimensions} from 'react-native';
import Search  from '../components/Search';
import Header from '../components/Header';
import Title from '../components/Title';
import Button from '../components/Button';
import ImagesProject from '../components/Common/ImagesProject';
import axios from 'axios';

export default class Product extends Component{

    state = {}

    respProdutos = []

    async componentDidMount (){

        await this.getProductSpecs()
        await this.getProductDescription()
        await this.getProductPrice()
        await this.getProductImage()
        await this.getProductTitle()
    }

    getProductTitle = async () => {
        await axios.get(`http://10.0.3.2:3000/produtos/id/60da008b6f464a551422fbb0`)
        .then(infos => {
            this.setState({productTitle:infos.data.nome})
        })
            .catch(erro => Alert.alert('Erro ao puxar título'))
    }

      getProductImage = async () => {
          await axios.get(`http://10.0.3.2:3000/produtos/id/60da008b6f464a551422fbb0`)
          .then(infos => {
              this.setState({produtos:infos.data})
          })
          .catch(erro => Alert.alert('Erro ao puxar imagem'))
      }

      getProductPrice = async () => {
          await axios.get(`http://10.0.3.2:3000/produtos/id/60da008b6f464a551422fbb0`)
          .then(infos => {
              this.setState({produtos:infos.data})
          })
          .catch(erro => Alert.alert('Erro ao puxar preço'))
      }

      getProductDescription = async () => {
        await axios.get(`http://10.0.3.2:3000/produtos/id/60da008b6f464a551422fbb0`)
        .then(infos => {
            this.setState({produtos:infos.data})
        })
        .catch(erro => Alert.alert('Erro ao puxar descrição'))
    }

    getProductSpecs = async () => {
        await axios.get(`http://10.0.3.2:3000/produtos/id/60da008b6f464a551422fbb0`)
        .then(infos => {
            this.setState({produtos:infos.data})
        })
        .catch(erro => Alert.alert('Erro ao puxar especificações'))
    }

    
    render(){ 

        return(

        <ScrollView >
            <Header/>
            <Search/>

        <Text style={styles.productTitle}>{this.getProductTitle}</Text>

        <View style={styles.imageContainer}>
                <Image style={styles.productImage} source={this.getProductByID}/>
        </View>

        <View style={styles.priceContainer}>
            <View style={styles.collumnContainer}>
                <Title title='Preço' />
                <Text style={styles.price}>R${this.getProductPrice}</Text>
            </View>
            <View style={styles.inlineContainer}>
                <Button label='Comprar' onPress={() => this.sentToCart} />
            </View>
        </View>

        <View style={styles.descriptionContainer}>
            <Title title='Descrição e Especificações'/>
            <Text style={styles.descriptionText}>{this.getProductDescription}</Text>
            <Text style={styles.descriptionText}>{this.getProductSpecs}</Text>
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
