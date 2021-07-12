import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default props => {
    return (
        <View>
            <Text style={styles.title}>{props.title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 25,
        fontWeight: "500",
        marginLeft: 10
    },
  
})