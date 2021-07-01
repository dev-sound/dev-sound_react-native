import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native'

import Title from '../Title'

export default (props) => {

    const [number, setNumber] = useState(props.database.item.initial)

    function increment(){
        return setNumber(number + 1)
        
    }

    function decrement(){
        return setNumber(number - 1)
    }



    return (
        <View style={styles.containerInline}>
            <View>

                <Image source={props.database.item.img} style={styles.imgProd} />
                <TouchableOpacity>
                    <Text style={styles.Delete}>Excluir</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.containerItemDesc}>
                <View>
                    <Title title={props.database.item.title} />
                    <Text style={styles.model}>{props.database.item.model}</Text>
                    <Text style={styles.price}>{props.database.item.price}</Text>
                    <Text style={styles.priceValue}>{props.database.item.priceValue}</Text>
                </View>
                <View style={styles.containerQuant}>
                    <Text style={styles.quantity}>{props.database.item.quantity}</Text>
                    <TouchableOpacity onPress={decrement}>
                        <Text style={styles.plusMinus}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.quantItem}>
                    <Text>{number}</Text>
                    </View>
                    <TouchableOpacity onPress={increment}>
                        <Text style={styles.plusMinus}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    containerInline: {
        flexDirection: "row",

    },
    imgProd: {
        width: 175,
        height: 175,
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        margin: 15,

    },
    Delete: {
        marginLeft: 15,
        color: "#007185"

    },
    containerItemDesc: {
        flexDirection: "column",
        flexWrap: "wrap",

    },
    model: {
        fontSize: 14,
        textDecorationStyle: "solid",
        fontWeight: "500",
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: 15,

    },
    price: {
        fontSize: 14,
        textDecorationStyle: "solid",
        fontWeight: "700",
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: 10

    },
    priceValue: {
        fontSize: 14,
        textDecorationStyle: "solid",
        fontWeight: "500",
        fontStyle: "normal",
        textAlign: "center",

    },
    containerQuant: {
        flexDirection: "row",
        alignContent: "center",
        alignItems: "center",
        paddingTop: 15

    },
    quantity: {
        fontSize: 14,
        textDecorationStyle: "solid",
        fontWeight: "700",
        paddingRight: 10,

    },
    plusMinus: {
        fontSize: 16,
        height: 30,
        width: 27,
        backgroundColor: "#DCDCDC",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        textAlign: "center"

    },
    quantItem: {
        fontSize: 16,
        height: 30,
        width: 27,
        backgroundColor: "#DCDCDC",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 2,
        textAlign: "center",
        alignItems: "center"

    }

})