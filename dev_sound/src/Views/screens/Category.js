import React, { Component } from 'react'
import { View, Text, StyleSheet, Image, 
    ImageBackground, TouchableOpacity, 
    Alert, FlatList ,Dimensions} from 'react-native'

import Title from '../components/Title'
import ProductOnly from '../components/ProductOnly'



    export default class Category extends Component {

        state = {}


        renderProductCategory = ({item}) =>  {
            return (
                <ProductOnly
                  imgProduct={item.img}
                  nameProduct={item.name}
                  price={item.price}
                />
            )
        }
        

        render() {
            return (
                <>
                <Title>
                    Violões
                </Title>

                <View style={styles.container}>
                <FlatList
                    data={violoes}
                    keyExtractor={item => `${item.id}`}
                    renderItem={renderProductCategory}
                />
                </View>

                </>
            )
        }
    }


    const style =  StyleSheet.create({
        container: {
            width: Dimensions.get('window').width / 2,
            margin: 10
        }
    })