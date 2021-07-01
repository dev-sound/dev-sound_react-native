import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, 
    ImageBackground, TouchableOpacity, 
    Alert, FlatList, Dimensions, ScrollView } from 'react-native'

import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'
import violoes from '../screens/violoes'





    export default class Category extends Component {

        state = {}


        renderProductCategory = ({item}) =>  {
            return (
                // <View >
                <ProductOnly
                  imgProduct={item.img}
                  nameProduct={item.name}
                  price={item.price}
                />
                // </View>
            )
        }
        

        render() {
            return (
                <View>
                    <Title style={styles.title} title='Violoes'/>
            

                    <ScrollView>
                        <View style={styles.productCard}>
                            <FlatList
                                data={violoes}
                                keyExtractor={item => `${item.id}`}
                                renderItem={this.renderProductCategory}
                                numColumns={2}
                            />
                    </View>
                </ScrollView>

                </View>
            )
        }
    }


    const styles =  StyleSheet.create({
        container: {

        },

        title: {
            marginLeft: 10,
            marginBottom: 10
        },

        productCard: {
            borderWidth: 1
            // justifyContent: 'space-between',
            // marginBottom: 5,
            // paddingBottom: 5,
            // marginLeft: 30,
            // marginTop: 10
        }
    })