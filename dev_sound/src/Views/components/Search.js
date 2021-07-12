import React, { useState } from 'react'
import {StyleSheet, TextInput, Image, View, TouchableOpacity} from 'react-native';
// import { useNavigation } from '@react-navigation/native';

import searchIcon from '../../../assets/icons/search_icon.png'


export default props => {

    const [search, setSearch] = useState('')
    // const navigation = useNavigation()



    return (
        <View style = {styles.container}>
           <View style = {styles.containerInput}>
                <TextInput onChangeText={(search) => setSearch({search})}
                style = {styles.input} 
                placeholder = 'O que você procura hoje?'/>
             
                <View  style = {styles.image}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('SearchResult', {search: search})}
                        style={styles.ImagePosition}>
                        <Image source = {searchIcon}/>
                    </TouchableOpacity>
                </View>
           
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    containerInput : {
        flexDirection:'row',
        padding: 5,
        borderRadius:8,
        width:'98%',
        alignItems:'center',
        justifyContent:'center',
        marginLeft:'2%',
        zIndex: 4,
    },

    container:{
        justifyContent:'space-between',
    },

    image : {
        backgroundColor: '#E6E6E6',
        height:38,
        width:34,
        borderRadius:10,
        position:'relative',
        right:15
    },
    input : {
        backgroundColor: '#E6E6E6',
        width:'92%',
        paddingLeft:20,
        height:38,
        fontSize: 19,
        borderRadius:10
    },

    ImagePosition:{
        position:'relative',
        top:6
    }

})
