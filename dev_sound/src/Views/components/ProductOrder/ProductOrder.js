import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


import Button from '../Button'
import ProductDetails from './ProductDetails'
import ProductPayment from '../ProductPayment'





export default props => {

    const [details, setDetails] = useState(false)



    function btnDetails() {
        if (details) {
            return (
                <Button onPress={() => showDetails()}
                    label='- detalhes' smallButton/>
            )
        } 
        else {
            return (
                <Button onPress={() => showDetails()}
                    label='+ detalhes' smallButton/>
            )
        }
    }
    
    function showDetails() {
        setDetails(!details)
    }

    renderProductSpotlight = ({item}) =>  {
        return (
          <View>
            <ProductPayment
              imgProduct={item.img}
              nameProduct={item.nome}
              price={item.preco}
            />
          </View>
        )
      }






    return (
        <View style={styles.container}>
            <View style={styles.containerRow}>

                    <Text style={styles.text}>
                    {/* props do banco */}
                        2196976
                    </Text>

                    <Text style={styles.text}>
                        {/* props do banco */}
                        18/06/21 
                    </Text>

                    <Text style={styles.text}>
                    {/* props do banco */}
                        Boleto
                    </Text>

                    {btnDetails()}                    
            </View>
            {details &&
                <FlatList 
                data={this.state.respProdutosNewer}
                keyExtractor={item => `${item._id}`}
                renderItem={this.renderProductNewer} 
            />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ECE7E7'
    },
    containerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 5
    },
    text: {
        fontSize: 16
    }
})