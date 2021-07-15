import { set } from 'mongoose'
import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet} from 'react-native'

import Title from '../Title'

export default (props) => {

    const [number, setNumber] = useState(props.quant)

    //props.setValueTotal e props.valueTotal -> comunicação indireta tela ShopCart
    //função para aumentar a quantidade dos itens selecionados

    function increment() {
        if (number >= 1) {
            setNumber(number + 1)
            
        }
    }

    //função para diminuir a quantidade dos itens selecionados
    function decrement() {
        if (number > 1) {
            setNumber(number - 1)
           
         
        } 
    }

    // const multiItens = (param) => {
    //     const valueItems = param
        
    //     let valueMultiItems =  valueItems * number
    
    //     return (
    //         <Text style={styles.priceValue}>{`R$ ${(valueMultiItems).toFixed(2)}`}</Text>
    //     )
    // }

    return (
        <View style={styles.containerInline}>
           {/* props.deleteItem(props.database.item.productImage) */}
            <View style={styles.imageContainer}>
           
                <Image source={{uri:props.database.item.img}} style={styles.imgProd} />
                <TouchableOpacity onPress={() => props.excluir()}> 
                    <Text style={styles.Delete}>Excluir</Text>
                </TouchableOpacity>
           
            </View>
           
            <View style={styles.containerItemDesc}>
       
                <View style={styles.desc}> 

                    <View style={styles.titleCartProduct}>
                  
                     <Title title={props.database.item.nome} />
                   
                    </View>

                    <View style={styles.areaPrice}>
                        <Text style={styles.price}>Preço</Text>
                        <Text style={styles.priceValue}>{`R$ ${props.database.item.valor_unitario}`}</Text>
                    </View>

                </View>
       
                {/* <View style={styles.containerQuant}>
                   
                    <Text style={styles.quantity}>{props.database.item.quantity}</Text>
                  
                    <TouchableOpacity onPress={() => decrement()}>
                        <Text style={styles.plusMinus}> - </Text>
                    </TouchableOpacity>
                  
                    <View style={styles.quantItem}>
                        <Text style={styles.quant}>{number}</Text>
                    </View>
                  
                    <TouchableOpacity onPress={() => increment()}>
                        <Text style={styles.plusMinus}> + </Text>
                    </TouchableOpacity>
       
                </View> */}
       
            </View>
        
        </View>


    )
}

const styles = StyleSheet.create({
    containerInline: {
        flexDirection: "row",
        marginVertical:10,
        borderWidth:1,
        borderColor:'#D4D4D4',
        overflow:'hidden',
        width:'98%',
        marginLeft:2,
        borderRadius:10

    },

    containerItemDesc: {
        flexDirection: "column",
        alignItems:'center',
        

    },

    areaPrice:{
        position:'relative',
        top:30
    },  

    titleCartProduct:{
        marginTop:10,
        borderColor:"blue",
        width:195,
        height:125,
        overflow:'hidden',
        borderWidth:1,
        borderColor:'#f1f1f1',
    },

    imgProd: {
        width: 175,
        height: 220,
        borderRadius: 10,
        margin: 15,
        borderWidth:1,
        borderColor:'#D4D4D4'

    },

    imageContainer: {
        elevation: 4
    },

    Delete: {
        fontSize: 20,
        marginLeft: 18,
        color: "#007185"

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
        fontSize: 20,
        textDecorationStyle: "solid",
        fontWeight: "500",
        fontStyle: "normal",
        textAlign: "center",

    },
    containerQuant: {
        flexDirection: "row",
        paddingVertical:5,
        paddingTop:15
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