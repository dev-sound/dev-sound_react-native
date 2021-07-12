import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import axios from 'axios'
import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'
import ProductsCategory from '../components/Common/ProductsCategory'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Category extends Component {


        async componentDidMount (){          

            await this.setState({page:this.props.navigation.getParam('page')})
            await this.getProduct()  

        } 

        getProduct = async () => {
            // const subCategoria = guitarra
            await axios.get(`http://10.0.3.2:3000/produtos/subCategoria/${this.state.page}`)
             .then(infos => {
           
               this.setState({respProdutos:infos.data})
            })
            .catch(erro => console.warn(erro))
        }




        state = {
            page:'',
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
                <ScrollView> 
                    <Header drawer={() => this.props.navigation.openDrawer()}/>
                    <View style={styles.container}>
                        <Title style={styles.text} title={this.state.page}/>
                    </View>
                                <FlatList
                                    data={this.state.respProdutos}
                                    keyExtractor={item => `${item._id}`}
                                    renderItem={this.renderProductCategory}
                                    numColumns={2}
                                />
            
                </ScrollView>
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
            paddingBottom: 5,
            marginLeft: 26,
        },
    })