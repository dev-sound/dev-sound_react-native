import React from 'react'
import { View, TextInput, StyleSheet,Text,Dimensions} from 'react-native'

export default props => {

    const stylesInput = [style.input]

    if(props.medium) stylesInput.push(style.medium)
    if(props.setSize) stylesInput.push({width:props.setSize})
    
    if(props.validInput == 'valid'){

            stylesInput.push(style.correct)
    }
    
    else if(props.validInput == 'noValid') {

        stylesInput.push(style.incorrect)
    }


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
         
        },

        correct:{
            borderColor:'#C8F0A4',
            backgroundColor:'#C8F0A4'
        },

        incorrect:{
            borderColor:'#F0ACA4',
            backgroundColor:'#F0ACA4'
        }
    }
)