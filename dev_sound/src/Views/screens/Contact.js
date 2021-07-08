import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'

import Header from '../components/Header/Header'
import Input from '../components/Input'

const initialState = {

}

export default class Contact extends Component {

    state = { ...initialState }

    render() {
        return (
            <View style={styles.container}>
                <Header />
                <View>
                    <Input  
                        validInput={this.state.validStyleName}        
                        fieldLabel = 'Nome completo'
                        placeholder='Digite seu nome'
                                  
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})