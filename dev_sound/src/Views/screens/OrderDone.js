import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import ProductOrder from '../components/ProductOrder/ProductOrder'

const initialState = {

}
export default class classname extends Component {

    state = {...initialState}

    render() {
        return (
            <View style={styles.container}>
                <ProductOrder/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})