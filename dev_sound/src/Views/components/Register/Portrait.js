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
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    
  }
    
})