import React from 'react'
import { View, TextInput, StyleSheet,Text,Dimensions} from 'react-native'

export default props => {

    const stylesInput = [style.input]

    if(props.medium) stylesInput.push(style.medium)
    if(props.setSize) stylesInput.push({width:props.setSize})

    return(

        <View style={style.container}>
          
            <Text>{props.label}</Text>
            <TextInput   
             {...props}
             style={[stylesInput]}
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
         width:200
         
        }
    }
)