import React, {useState} from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


import Button from '../Button'
import ProductDetails from './ProductDetails'





export default props => {

    const [details, setDetails] = useState(true)



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

    // function showDetails() {
    //     if (details) {
    //         setDetails(false)
    //     }
    //     else {
    //         setDetails(true)
    //     }
            
    // }






    return (
        <View style={styles.container}>
            <View style={styles.containerRow}>

                    <Text style={styles.text}>
                        2196976
                    </Text>

                    <Text style={styles.text}>
                        18/06/21
                    </Text>

                    <Text style={styles.text}>
                        Boleto
                    </Text>

                    {btnDetails()}                    
            </View>
            {details &&
                <ProductDetails/>
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
        justifyContent: 'space-around',
        marginLeft: 10,
        alignItems: 'center',
        padding: 5
    },
    text: {
        fontSize: 16
    }
})