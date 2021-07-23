import React from 'react'
import { Text, StyleSheet, View, Dimensions } from 'react-native'
const format = require('../components/Common/moneyFormat')
export default props => {
    return (
        <View style={styles.container}>
            <View style={styles.areaInfoProduct}>
                <View style={styles.infos}>
                    <View>
                        <Text style={styles.productName}>{props.nameProduct}</Text>
                        <Text style={styles.productModel}>Modelo:{props.modelProduct}</Text>
                    </View>

                    <View style={styles.price}>
                        <Text style={styles.priceTitle}>Preço unitário</Text>
                        <Text style={styles.value}>{format.moneyFormat(props.priceUnit)}</Text>
                        <Text style={styles.priceTitle}>Quantidade: 1</Text>
                    </View>
                </View>
            </View>
        </View>
    )

}


const styles = StyleSheet.create(

    {

        container: {
            backgroundColor: '#c1c1c1',
            width: '100%',
            padding: 10,
            alignSelf: 'center',
            marginBottom: 10
        },

        price: {
            width: '100%'
        },

        qtdProduct: {
            marginTop: 7,
            fontWeight: 'bold',
        },

        productName: {
            fontWeight: 'bold',
            fontSize: 15,
            textAlign: 'center'
        },

        productModel: {
            marginTop: 10,
            fontWeight: 'bold',
            textAlign: 'center'
        },

        priceTitle: {
            fontWeight: 'bold',
            fontSize: 16,
            textAlign: 'center'
        },

        value: {
            fontSize: 20,
            textAlign: 'center',
        },
        days: {
            marginTop: 10,
            marginLeft: 20
        },

        payment: {
            backgroundColor: '#fff',
            marginVertical: 7
        }

    }
)