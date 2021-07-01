import React from 'react'
import { View, StyleSheet,Text,} from 'react-native'
import { TextInput } from 'react-native-paper';
export default props => {

    const stylesInput = [style.input]

    if(props.medium) stylesInput.push(style.medium)
    if(props.setSize) stylesInput.push({width:props.setSize})

    return(

        <View style={style.container}>
          
            <Text style={props.style}>{props.fieldLabel}</Text>
            <View>
                <TextInput   
                {...props}
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
         
        }
    }
)