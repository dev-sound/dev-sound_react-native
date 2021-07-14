import React from 'react'
import {TextInput, StyleSheet } from 'react-native'


export default props => {

    const styleInput = [styles.textinputArea]

    if(props.focus){
        styleInput.push(styles.borderBottom)
    }

    if(props.validInput == 'valid'){
        styleInput.push(styles.valid)
    }

    if(props.validInput == 'noValid'){
        styleInput.push(styles.noValid)
    }
    
    return (
     <TextInput
        {...props}
        style={styleInput}
     />
    )
}

const styles = StyleSheet.create({
    textinputArea: {
        marginHorizontal: 10,
        height: 220,
        width: 390,
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent:'center',
        padding: 15,
    },
    borderBottom: {
        borderBottomWidth: 3,
        borderBottomColor: '#311b92'
    },
    valid:{
        borderColor:'#C4D5B3',
        backgroundColor:'#C4D5B3'
    },
    noValid:{
        borderColor:'#D5B9B3',
        backgroundColor:'#D5B9B3'
    }
})