import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header/Header'

const initialState = {

}

export default class Contact extends Component {

    state = { ...initialState }

    render() {
        return (
            <View style={styles.container}>
                <Header />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {

    }
})