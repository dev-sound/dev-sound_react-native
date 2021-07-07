import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProductPayment from '../ProductPayment'

export default props => {
    return (
        <View style={styles.container}>
            <View>
                <ProductPayment nameProduct='VIOLAO TAKAMINE TELECASTER BLACK'
                modelProduct='054534' qtdProduct='1' priceUnit='3800,00'/>
            </View>
            <View style={styles.container2}>
                <View style={styles.container3}>
                    <Text style={styles.textBold}>Entrega</Text>
                    <Text>Comum - 7 dias</Text>
                </View>
                <View style={styles.container3}>
                    <View style={styles.containerRow}>
                        <Text style={styles.textBold}>Subtotal: </Text>
                        <Text>3800,00</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.textBold}>Frete: </Text>
                        <Text>100,00</Text>
                    </View>
                    <View style={styles.containerRow}>
                        <Text style={styles.textBold}>TOTAL: </Text>
                        <Text>3900,00</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECE7E7',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container2: {
        justifyContent: 'space-between'
    },
    container3: {
        alignItems: 'flex-end',
        marginRight: 20,
        marginBottom: 5,
        marginTop: 10
    },
    containerRow: {
        flexDirection: 'row'
    },
    textBold: {
        fontWeight: 'bold'
    }
})