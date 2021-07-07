import React, { Component } from 'react'

import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import axios from 'axios'

import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'
import ProductsCategory from '../components/Common/ProductsCategory'



    export default class Category extends Component {


        async componentDidMount (){

            await this.getProduct()  
        } 

        getProduct = async () => {
            // const subCategoria = guitarra

            await axios.get(`http://10.0.3.2:3000/produtos/subCategoria/guitarra`)
             .then(infos => {
           
               this.setState({respProdutos:infos.data})
            })
            .catch(erro => console.warn(erro))
        }





        state = {
            respProdutos: []
        }


        renderProductCategory = ({item}) =>  {
            return (
                 <View style={styles.productCard}>
                <ProductOnly style={styles.productCard}
                    productId ={item._id}
                    imgProduct={item.img}
                    nameProduct={item.nome}
                    price={item.preco}
                />
                 </View>
            )
        }
        

        render() {
            return (
                <>
                    <Header/>
                    <View style={styles.container}>
                        <Title style={styles.text} title='Guitarras'/>
                    </View>
                    <ScrollView > 
                                <FlatList
                                    data={this.state.respProdutos}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={this.renderProductCategory}
                                    numColumns={2}
                                />
                    </ScrollView>
                </>
            )
        }
    }


    const styles =  StyleSheet.create({

        container: {
            padding: 10,
            marginBottom: 10,
        },

        productCard: {
            width: Dimensions.get('window').width / 2.7,
            marginBottom: 5,
            paddingBottom: 5,
            marginLeft: 40,
            marginTop: 10
        }
    })