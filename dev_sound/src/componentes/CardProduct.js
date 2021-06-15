import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import SaxImg from '../../assets/sax_.png'

export default function cardProduct () {
    return (
        <View style={styles.container}>
            <TouchableOpacity>
                <View style={styles.image}>
                <Image style={styles.productimage} source={SaxImg}></Image>
                </View>
                <Text style={styles.text}>SAXOFONE STRAUSS</Text>
                <Text style={styles.text}>R$4.500,00</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        width: 200,
        height: 200,
        alignItems: 'center',
    },

    image: {
        borderRadius: 11,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        
        elevation: 6,
        marginBottom: 10,
    },

    productimage: {
        borderRadius: 11,
        width: 200,
        height: 200,
    },

    text: {
        color: '#000',
        fontWeight: 'bold',
        alignSelf: 'center',
    }
  })
