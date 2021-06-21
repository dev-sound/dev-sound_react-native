import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Sax_Strauss_Img from '../../../../assets/img/sax_.png'

export default function cardProduct () {
    return (
        <View style={styles.cardProductContainer}>
            <TouchableOpacity>
                <View style={styles.cardImageContainer}>
                <Image style={styles.cardProductImage} source={Sax_Strauss_Img}></Image>
                </View>
                <Text style={styles.cardProductTitle}>SAXOFONE STRAUSS</Text>
                <Text style={styles.cardProductPrice}>R$4.500,00</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    cardProductContainer: {
        width: 200,
        height: 200,
    },

    cardImageContainer: {
        shadowColor: "#000",
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6,
        marginBottom: 10,
        borderRadius: 11,
    },

    cardProductImage: {
        width: 200,
        height: 200,
        borderRadius: 11,
    },

    cardProductTitle: {
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 17,
    },

    cardProductPrice: {
        fontWeight: 'normal',
        alignSelf: 'center',
        fontSize: 18,
    }
  })
