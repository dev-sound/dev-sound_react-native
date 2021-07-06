import React,{useState} from 'react'
import { View, StyleSheet,Text,} from 'react-native'
import { TextInput } from 'react-native-paper';


export default props => {

    const stylesInput = [style.input]

    let icon = '' 
    

    if(props.medium) stylesInput.push(style.medium)
    if(props.setSize) stylesInput.push({width:props.setSize})
    
    if(props.validInput == 'valid'){

        stylesInput.push(style.correct)
        icon = <TextInput.Icon name="check-circle" color="green"/>

    }
    
    else if(props.validInput == 'noValid') {

        stylesInput.push(style.incorrect)
        icon = <TextInput.Icon name="close-circle" color="red"/>
        

    }


    return(

        <View style={style.container}>
          
            <Text style={props.style}>{props.fieldLabel}</Text>
            <View>
                <TextInput   
                {...props}
                right={icon}
                style={[stylesInput]}

            />
            </View>
            

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
            borderRadius:5,
            borderWidth:1,
            height:40,
            lineHeight:60,
            alignContent:'center'
          
        },

        medium:{
         width:200
         
        },

        correct:{
            borderColor:'#C4D5B3',
            backgroundColor:'#C4D5B3'
        },

        incorrect:{
            borderColor:'#D5B9B3',
            backgroundColor:'#D5B9B3'
        }
    }
)