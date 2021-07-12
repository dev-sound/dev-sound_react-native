import React from 'react'
import {Text, StyleSheet, TouchableOpacity, Image, View, Dimensions} from 'react-native'

export default props =>{
    return (
        <TouchableOpacity style={styles.container}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: `${props.imgProduct}`}}></Image>
            </View>
            <View>
                <Text style={styles.title} numberOfLines={3}>{props.nameProduct}</Text>
            </View>
            <View>
                <Text style={styles.price}>R${props.price}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create(
    {
        container: {
            width: Dimensions.get('window').width/2.5,
            height: Dimensions.get('window').height/3.3,
            margin: 10,
            justifyContent: 'space-between',
            backgroundColor: '#FFF',
            borderRadius: 11,
            padding: 10,
            elevation: 4,
        },

        imageContainer: {
            width: '100%',
            height: 170,
            borderRadius: 17,
        },

        image: {
            width: 170,
            height: 170,
            borderRadius: 17,
        },

        title: {
            fontSize: 17,
            fontWeight: 'bold',
            textAlign: 'left',
            opacity: 1,
            marginTop: 10,
            marginLeft: 3,
            marginBottom: 6
        },

        price: {
            fontSize: 22,
            textAlign: 'center',
            fontWeight: 'normal',
        }
    }
)