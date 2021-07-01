import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default props => {
    return (
    
            <View style={styles.container}>
            <View style={styles.teste}>
                {props.children}
            </View>
        </View>
        
    ) 
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        marginLeft: 20,
        height: 'auto',
    },
  teste:{
    paddingVertical:30,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#B8B8B8', 

  }
})