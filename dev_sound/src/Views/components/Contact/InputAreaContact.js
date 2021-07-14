import React from 'react'
import {TextInput, StyleSheet } from 'react-native'
import { enableScreens } from 'react-native-screens'


export default props => {

    const styleInput = [styles.textinputArea]

    if(props.focus == true){
        styleInput.push(styles.borderBottom)
    }

    if(props.focus == false){
        styleInput.push(styles.borderBottom2)
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
        height: 220,
        width: '95%',
        fontSize: 16,
        borderRadius: 5,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
        padding: 10,
    },
    borderBottom: {
        borderBottomWidth: 3,
        borderBottomColor: '#673ab7'
    },
    valid:{
        borderColor:'#C4D5B3',
        backgroundColor:'#C4D5B3'
    },
    noValid:{
        borderColor:'#D5B9B3',
        backgroundColor:'#D5B9B3'
    },
    borderBottom2: {
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    }
})