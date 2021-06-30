import React from 'react'
import { View, TextInput, StyleSheet,Text,Dimensions} from 'react-native'

export default props => {

    const stylesInput = [style.input]

    if(props.medium) {
        stylesInput.push(style.medium)
    }


    return(

        <View style={[style.container]}>
          
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
        container:{
            marginBottom:8
        },

        input:{
            borderWidth:1,
            padding:7,
            borderRadius:5,
            borderWidth:1,
          
        },

        medium:{
          
         
        }
    }
)