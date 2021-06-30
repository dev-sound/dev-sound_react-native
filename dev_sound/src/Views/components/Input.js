import React from 'react'
import { View, TextInput, StyleSheet,Text } from 'react-native'

export default props => {

    return(

        <View style={style.container}>
          
            <Text>{props.label}</Text>
            <TextInput
                placeholder ={props.placeholder}        
                value={props.value}
                onChangeText={props.func}
                errorMessage={props.msgError}
                secureTextEntry = {props.isPassword}
                keyboardType={props.typeKeyboard}
                style={style.input}
            />

        </View>
    )

}


const style = StyleSheet.create(
    {

        input:{
            borderWidth:1,
            padding:7,
            borderRadius:5
        }
    }
)