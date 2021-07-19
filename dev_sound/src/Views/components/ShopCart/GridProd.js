import { set } from 'mongoose'
import React, { useState } from 'react'
import { View, Image, Text, TouchableOpacity, StyleSheet, Dimensions} from 'react-native'

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

        <View style={styles.container}>
           {/* props.deleteItem(props.database.item.productImage) */}
                <View style={styles.imageAndDelete}>
                <View style={styles.imageContainer}>
                <Image source={{uri:props.database.item.img}} style={styles.image} />
                </View>
                <TouchableOpacity onPress={() => props.excluir()}> 
                    <Text style={styles.deleteText}>Excluir</Text>
                </TouchableOpacity>
                </View>
           
                <View style={styles.productInfoContainer}>
                    <Text style={styles.productTitle}>{props.database.item.nome}</Text>

                    <View style={styles.priceContainer}>
                    <Text style={styles.priceTitle}>Preço unitário</Text>
                    <Text style={styles.priceValue}>{`R$${props.database.item.valor_unitario}`}</Text>
                    </View>
                </View>
        </View>
       
                //     <View style={styles.containerQuant}>
                   
                //     <Text style={styles.quantity}>{props.database.item.quantity}</Text>
                  
                //     <TouchableOpacity onPress={() => decrement()}>
                //         <Text style={styles.plusMinus}> - </Text>
                //     </TouchableOpacity>
                  
                //     <View style={styles.quantItem}>
                //         <Text style={styles.quant}>{number}</Text>
                //     </View>
                  
                //     <TouchableOpacity onPress={() => increment()}>
                //         <Text style={styles.plusMinus}> + </Text>
                //     </TouchableOpacity>
       
                // </View>


    )
}

const styles = StyleSheet.create({
    
    container: {
        width: '100%',
        marginBottom: 20,
        marginTop: 5,
        flexDirection: 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#D0D0D0'
    },

    imageContainer: {
        width: Dimensions.get('window').width/2.5,
        height: Dimensions.get('window').width/2.5,
        padding: 5,
        backgroundColor: '#FFF',
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 4
    },

    image: {
        width: '100%',
        height: '100%',
    },

    deleteText: {
        textAlign: 'left',
        fontSize: 17,
        marginTop: 10,
        marginLeft: 3
    },

    productInfoContainer: {
        width: '55%',
        height: Dimensions.get('window').width/2.5,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginLeft: 15,
    },

    productTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    priceContainer: {
        alignItems: 'center'
    },

    priceTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center'
    },

    priceValue: {
        fontSize: 20
    }

})