import React from 'react';
import {TouchableOpacity,View,SafeAreaView,Image,StyleSheet} from 'react-native';
import Header from '../componentes/Header'
import Search  from '../componentes/Search';


export default () => {
  return (

     <SafeAreaView style={style.container}>
        <View>
          <Header/>
          <Search/>
        </View>
    </SafeAreaView>
    )

  }

const style =  StyleSheet.create(
  {
    bannerImgs:{
      overflow:'hidden',
     resizeMode:'contain'
    },

    container:{
      backgroundColor: "#F1F1F1",
    }
  }
)
