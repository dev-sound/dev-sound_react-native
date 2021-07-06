import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
        <View style={styles.container}>
            <View>
                {/* <Image/> */}
                <View style={styles.containerRow}>
                    <Text style={styles.textBold}>Quantidade:</Text>
                    <Text>1</Text>
                </View>
            </View>
            <View>
                <Text>VIOLAO TAKAMINE TELECASTER BLACK</Text>
                <Text>MODELO GD51CE</Text>
                <Text style={styles.textBold}>Preço unitário:</Text>
                <Text>R$ 3800,00</Text>
            </View>
            <View>
                <Text style={styles.textBold}>Entrega</Text>
                <Text>Comum - 7 dias úteis</Text>
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
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECE7E7',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    containerRow: {
        flexDirection: 'row'
    },
    textBold: {
        fontWeight: 'bold'
    }
})