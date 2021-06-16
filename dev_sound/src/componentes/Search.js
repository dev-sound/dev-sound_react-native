import React from 'react'
import {StyleSheet, TextInput, Image, View} from 'react-native'
import searchIcon from '../../assets/icons/search_icon.png'

export default props => {
    return (
        <View style = {styles.container}>
            <TextInput style = {styles.input} placeholder = 'O que você procura hoje?'/>
            <Image style = {styles.image} source = {searchIcon}/>
        </View>
    )
}
const styles = StyleSheet.create({
    container : {
        flexDirection: 'row',
        backgroundColor: '#c1c1c1',
        padding: 10,
        borderRadius:8
    },
    image : {
        backgroundColor: '#c1c1c1',
        marginLeft: 20
    },
    input : {
        width: 'auto'
    }
})
