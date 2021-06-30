import React from 'react'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native'

export default (props) => {

    const stylesButton = [styles.mainButton]
    // botão 'COMPRAR' tela produto
    if (props.buyButton) {
        stylesButton.push(styles.buyButton)
    }
    // botão de 'finalizar compra' tela checkout
    if (props.finishButton) {
        stylesButton.push(styles.finishButton)
    }
    // botão de 'finalizar compra' tela checkout desativado
    if (props.finishButtonDisabled) {
        stylesButton.push([styles.finishButton, styles.disabled])
    }

    // para todos botões pequenos
    if (props.smallButton) {
        stylesButton.push(styles.smallButton)
    }

    return(
    <View>
        <TouchableOpacity style={styles.container}>
            <Text style={stylesButton}>{props.label}</Text>
        </TouchableOpacity>
    </View>
)}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    mainButton: {
        backgroundColor: '#FACC22',
        borderRadius: 14,
        width: Dimensions.get('window').width / 2,
        height: 50,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 5,
        textAlign: 'center',
        fontSize: 28,
        fontWeight: 'normal',
        padding: 2
    },

    buyButton: {
        width: Dimensions.get('window').width / 3.5,
        fontSize: 20,
        padding: 9
    },

    finishButton: {
        width: Dimensions.get('window').width,
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0,
        shadowRadius: 0,
        elevation: 0,
        borderRadius: 0,
        padding: 5,
    },

    disabled: {
        backgroundColor: "#7D7D7D",
        color: '#fff'
    },

    
    smallButton: {
        width: Dimensions.get('window').width / 5,
        height: 35,
        fontSize: 14,
        padding: 7
    },

})