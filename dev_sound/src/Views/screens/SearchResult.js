import React, { Component } from 'react'

import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'
import axios from 'axios'
import { CommonActions } from '@react-navigation/native';


import Header from '../components/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'






export default class SearchResult extends Component {


        async componentDidMount (){          

            await this.setState({search: this.props.navigation.getParam('search')})

            await this.getProduct() 

            // await console.warn(this.state.search.search)

   
        } 

        getProduct = async () => {
            await axios.get(`http://10.0.3.2:3000/produtos/${this.state.search.search}`)
             .then(infos => {
           
                this.setState({respProdutos:infos.data})
            })
            .catch(erro => console.warn(erro))
        }

 

        state = {
            search:'',
            respProdutos: []
        }


        renderProductSearch = ({item}) =>  {
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
                    <Header drawer={() => this.props.navigation.openDrawer()}/>
                    <View style={styles.container}>
                    <Title title={this.state.search.search}/>
                    </View>
                    <ScrollView> 
                        <FlatList
                            data={this.state.respProdutos}
                            keyExtractor={item => `${item._id}`}
                            renderItem={this.renderProductSearch}
                            numColumns={2}
                        />
                        {this.props.navigation.reset()}
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
        },
    })