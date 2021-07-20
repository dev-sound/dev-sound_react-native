import React from 'react'
import { Text, StyleSheet, TouchableOpacity, Image, View, Dimensions } from 'react-native'

export default props => {

    const stylesContainer = [styles.container]

    if (props.paymentArea) {
        stylesContainer.push(styles.payment)
    }
    if (props.details) {
        return (
            <View style={styles.container}>
                <View style={styles.containerImgQtd}>
                    <Text style={styles.qtdProduct}> Quantidade: 1 </Text>
                </View>
                <View style={styles.areaInfoProduct}>

                    <View style={styles.infos}>
                        <View>
                            <Text style={styles.productName}>{props.nameProduct}</Text>
                            <Text style={styles.productModel}>Modelo:{props.modelProduct}</Text>
                        </View>

                        <View style={styles.price}>
                            <Text style={styles.priceTitle}>Preço unitário</Text>
                            <Text style={styles.value}>R${props.priceUnit}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )

    }

    return (
        <View style={styles.container}>
            <View style={styles.containerImgQtd}>

                <View style={styles.containerImgProduct}>
                    <Image
                        style={styles.img}
                        source={{ uri: props.imgProduct }} />
                </View>
                <Text style={styles.qtdProduct}> Quantidade: 1 </Text>
            </View>
            <View style={styles.areaInfoProduct}>

                <View style={styles.infos}>
                    <View>
                        <Text style={styles.productName}>{props.nameProduct}</Text>
                        <Text style={styles.productModel}>Modelo:{props.modelProduct}</Text>
                    </View>

                    <View style={styles.price}>
                        <Text style={styles.priceTitle}>Preço unitário</Text>
                        <Text style={styles.value}>R${props.priceUnit}</Text>
                    </View>
                </View>
            </View>

            {props.infos &&
                <View style={styles.pricesInfos}>

                    <View style={styles.days}>
                        <Text style={{ fontWeight: 'bold', marginLeft: 20 }}>Entrega:</Text>
                        <Text>7 Dias úteis</Text>

                    </View>


                    <View style={{ fontWeight: 'bold', alignItems: 'flex-end' }}>
                        <Text>Subtotal : 3.800</Text>
                        <Text>Frete    : 100</Text>
                        <Text>Total    : 3.900</Text>
                    </View>
                </View>
            }
        </View>
    )

}


const styles = StyleSheet.create(

    {

        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#D0D0D0'
        },

        containerImgProduct: {
            width: Dimensions.get('window').width / 2.5,
            height: Dimensions.get('window').width / 2.5,
            backgroundColor: '#fff',
            borderRadius: 11,
            padding: 5,
            elevation: 4
        },

        img: {
            width: '100%',
            height: '100%',
            borderRadius: 11
        },

        qtdProduct: {
            marginTop: 7,
            alignSelf: 'flex-start',
            fontWeight: 'bold'
        },

        productName: {
            fontWeight: 'bold',
            fontSize: 15
        },

        productModel: {
            marginTop: 10,
            fontWeight: 'bold'
        },

        priceTitle: {
            fontWeight: 'bold',
            fontSize: 16
        },

        value: {
            fontSize: 18,
        },

        areaInfoProduct: {
            width: '55%',
            height: '88%',
            marginLeft: 10,
            flexDirection: 'row',
        },

        infos: {
            justifyContent: 'space-between'
        },


        pricesInfos: {
            justifyContent: 'space-between',
            position: 'relative',
            right: 19
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