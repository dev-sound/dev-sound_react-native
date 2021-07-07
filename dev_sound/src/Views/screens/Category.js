import React, { Component } from 'react'
import { View, StyleSheet, FlatList, Dimensions, ScrollView } from 'react-native'

import Header from '../components/Header/Header'
import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'
import ProductsCategory from '../components/Common/ProductsCategory'





    export default class Category extends Component {

        state = {}


        renderProductCategory = ({item}) =>  {
            return (
                 <View style={styles.productCard}>
                <ProductOnly style={styles.productCard}
                  imgProduct={item.img}
                  nameProduct={item.name}
                  price={item.price}
                />
                 </View>
            )
        }
        

        render() {
            return (
                <>
                    <Header/>
                    <View style={styles.container}>
                        <Title style={styles.text} title='Categorias'/>
                    </View>
                    <ScrollView > 
                                <FlatList
                                    data={ProductsCategory}
                                    keyExtractor={item => `${item.id}`}
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