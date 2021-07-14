import { set } from 'mongoose'
import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native'

import Title from '../Title'

export default (props) => {

    const [number, setNumber] = useState(1)

    //props.setValueTotal e props.valueTotal -> comunicação indireta tela ShopCart
    //função para aumentar a quantidade dos itens selecionados
    function increment() {
        if (number < props.database.item.stock) {
            setNumber(number + 1)
            props.setValueTotal(props.valueTotal + props.database.item.priceValue)
        }
    }

    //função para diminuir a quantidade dos itens selecionados
    function decrement() {
        if (number > 1) {
            setNumber(number - 1)
            props.setValueTotal(props.valueTotal - props.database.item.priceValue)
        } 
    }

    return (
        <View style={styles.containerInline}>
           
            <View style={styles.imageContainer}>
           
                <Image source={{uri:props.database.item.productImage}} style={styles.imgProd} />
                <TouchableOpacity onPress={() => props.deleteItem(props.database.item.id)}> 
                    <Text style={styles.Delete}>Excluir</Text>
                </TouchableOpacity>
           
            </View>
           
            <View style={styles.containerItemDesc}>
       
                <View style={styles.desc}> 
                    <Title title={props.database.item.productName} />
                    <Text style={styles.model}>{props.database.item.model}</Text>
                    <Text style={styles.price}>{props.database.item.price}</Text>
                    <Text style={styles.priceValue}>{`R$ ${props.database.item.productPrice}`}</Text>
                </View>
       
                <View style={styles.containerQuant}>
                    <Text style={styles.quantity}>{props.database.item.quantity}</Text>
                    <TouchableOpacity onPress={decrement}>
                        <Text style={styles.plusMinus}>-</Text>
                    </TouchableOpacity>
                    <View style={styles.quantItem}>
                        <Text style={styles.quant}>{number}</Text>
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
        elevation: 4

    },
    imgProd: {
        width: 175,
        height: 175,
        borderRadius: 10,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        margin: 15,
        elevation: 4
    },

    imageContainer: {
        elevation: 4
    },

    Delete: {
        fontSize: 16,
        marginLeft: 15,
        color: "#007185"

    },
    containerItemDesc: {
        flexDirection: "column",
        flexWrap: "wrap",

    },
    desc: {
        paddingTop: 20,
    },
    model: {
        fontSize: 16,
        textDecorationStyle: "solid",
        fontWeight: "500",
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: 16,

    },
    price: {
        fontSize: 16,
        textDecorationStyle: "solid",
        fontWeight: "700",
        fontStyle: "normal",
        textAlign: "center",
        paddingTop: 10

    },
    priceValue: {
        fontSize: 16,
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
        fontSize: 16,
        textDecorationStyle: "solid",
        fontWeight: "700",
        paddingRight: 10,

    },
    plusMinus: {
        fontSize: 20,
        height: 40,
        width: 35,
        backgroundColor: "#DCDCDC",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        textAlign: "center"

    },
    quantItem: {
        fontSize: 22,
        height: 40,
        width: 35,
        backgroundColor: "#DCDCDC",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 2,
        textAlign: "center",
        alignItems: "center"

    },
    quant: {
        fontSize: 20
    }
   

})